"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Remotion runs client-only and stays out of the initial bundle.
const HeroBackdropLayer = dynamic(() => import("./cyber-layers").then((m) => m.HeroBackdropLayer), {
  ssr: false,
  loading: () => null,
});

const PortraitHudLayer = dynamic(() => import("./cyber-layers").then((m) => m.PortraitHudLayer), {
  ssr: false,
  loading: () => null,
});

export const BreachIntro = dynamic(() => import("./cyber-layers").then((m) => m.BreachIntroLayer), {
  ssr: false,
  loading: () => null,
});

/**
 * True once the page has loaded and the main thread is idle. The decorative
 * layers sit behind the intro overlay until then, so rendering them earlier
 * only competes with hydration.
 */
function useIdleReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    const arm = () => {
      const go = () => setReady(true);
      idleId =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(go, { timeout: 1500 })
          : window.setTimeout(go, 300);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      if (idleId === undefined) return;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return ready;
}

type LayerProps = { className?: string };

export function HeroBackdrop(props: LayerProps) {
  return useIdleReady() ? <HeroBackdropLayer {...props} /> : null;
}

export function PortraitHud(props: LayerProps) {
  return useIdleReady() ? <PortraitHudLayer {...props} /> : null;
}
