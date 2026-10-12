"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { FPS } from "../../remotion/theme";

type CyberPlayerProps = {
  component: ComponentType<Record<string, unknown>>;
  durationInFrames: number;
  className?: string;
  style?: CSSProperties;
  loop?: boolean;
  /** Frame to start on (e.g. to sync with a CSS animation already running). */
  initialFrame?: number;
  /** Frame shown, paused, when the visitor prefers reduced motion. Omit to render nothing. */
  stillFrame?: number;
};

/**
 * Embeds a Remotion composition as a live, chromeless layer. The composition is
 * rendered at the container's exact CSS size, so compositions lay themselves
 * out from useVideoConfig() and never letterbox. Looping players pause while
 * off-screen to keep the main thread free.
 */
export default function CyberPlayer({
  component,
  durationInFrames,
  className,
  style,
  loop = true,
  initialFrame = 0,
  stillFrame,
}: CyberPlayerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<PlayerRef | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Data Saver and low-memory devices get the same still frame as reduced motion,
    // so phones that would stutter never run the per-frame React renders.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const lite = nav.connection?.saveData === true || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(lite || mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      if (w > 0 && h > 0) setSize((prev) => (prev?.w === w && prev?.h === h ? prev : { w, h }));
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !loop || reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      const player = playerRef.current;
      if (!player) return;
      if (entry.isIntersecting) player.play();
      else player.pause();
    });
    io.observe(host);
    return () => io.disconnect();
  }, [loop, reduced, size]);

  const showStill = reduced && stillFrame !== undefined;

  return (
    <div ref={hostRef} className={className} style={{ pointerEvents: "none", ...style }} aria-hidden="true">
      {size && (!reduced || showStill) ? (
        <Player
          ref={playerRef}
          component={component}
          durationInFrames={durationInFrames}
          compositionWidth={size.w}
          compositionHeight={size.h}
          fps={FPS}
          loop={loop}
          autoPlay={!reduced}
          initialFrame={showStill ? stillFrame : Math.min(initialFrame, durationInFrames - 1)}
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      ) : null}
    </div>
  );
}
