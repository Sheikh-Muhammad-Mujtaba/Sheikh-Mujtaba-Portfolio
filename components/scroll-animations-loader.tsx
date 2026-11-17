"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollAnimations = dynamic(() => import("./scroll-animations"), {
  ssr: false,
});

const DESKTOP_MOTION = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

/**
 * Loads GSAP only where it is used: wide screens with motion allowed. Phones
 * and reduced-motion visitors never download it — that alone removed most of
 * the homepage's main-thread blocking time on mobile.
 */
export default function ScrollAnimationsLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_MOTION);
    let idle: number | undefined;

    const arm = () => {
      if (!query.matches || idle !== undefined) return;
      const go = () => setReady(true);
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(go, { timeout: 1200 })
          : window.setTimeout(go, 200);
    };

    arm();
    // A window widened past the breakpoint later still gets the effects.
    query.addEventListener("change", arm);

    return () => {
      query.removeEventListener("change", arm);
      if (idle === undefined) return;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return ready ? <ScrollAnimations /> : null;
}
