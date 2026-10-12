"use client";

import { useState } from "react";
import CyberPlayer from "./cyber-player";
import { CyberBackdrop, CYBER_BACKDROP_DURATION } from "../../remotion/cyber-backdrop";
import { PortraitHud, PORTRAIT_HUD_DURATION } from "../../remotion/portrait-hud";
import { BreachIntro, BREACH_INTRO_DURATION } from "../../remotion/breach-intro";
import { FPS } from "../../remotion/theme";

type LayerProps = { className?: string };

export function HeroBackdropLayer({ className }: LayerProps) {
  return (
    <CyberPlayer
      component={CyberBackdrop}
      durationInFrames={CYBER_BACKDROP_DURATION}
      className={className}
      stillFrame={90}
    />
  );
}

export function PortraitHudLayer({ className }: LayerProps) {
  return (
    <CyberPlayer
      component={PortraitHud}
      durationInFrames={PORTRAIT_HUD_DURATION}
      className={className}
      stillFrame={110}
    />
  );
}

export function BreachIntroLayer({ className }: LayerProps) {
  // The overlay's CSS animation starts at first paint, before this chunk loads —
  // start the composition at the frame the CSS timeline has already reached.
  // Read once at mount (lazy initializer) so re-renders never move the start frame.
  const [elapsedFrames] = useState(() => Math.round((performance.now() / 1000) * FPS));
  if (elapsedFrames >= BREACH_INTRO_DURATION - 20) return null;

  return (
    <CyberPlayer
      component={BreachIntro}
      durationInFrames={BREACH_INTRO_DURATION}
      className={className}
      loop={false}
      initialFrame={elapsedFrames}
    />
  );
}
