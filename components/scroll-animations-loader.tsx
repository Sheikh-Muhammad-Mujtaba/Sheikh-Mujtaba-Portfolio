"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ScrollAnimations = dynamic(() => import("./scroll-animations"), {
  ssr: false,
});

export default function ScrollAnimationsLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const arm = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };

    // Arm as soon as the browser goes idle rather than waiting on the intro
    // overlay's "smj-intro-done" event, which does not fire until 5.4s. Gating
    // on that left ScrollTrigger unmounted for the whole intro: scrolling early
    // did nothing, and the [data-reveal] sections stayed visible until GSAP
    // finally loaded and snapped them to opacity 0.
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(arm, { timeout: 1200 })
        : window.setTimeout(arm, 200);

    // Safety net: if idle never fires, the intro event still arms us.
    window.addEventListener("smj-intro-done", arm, { once: true });

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }
      window.removeEventListener("smj-intro-done", arm);
    };
  }, []);

  return ready ? <ScrollAnimations /> : null;
}
