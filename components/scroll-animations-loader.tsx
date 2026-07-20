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
    window.addEventListener("smj-intro-done", arm, { once: true });
    // Fallback in case the intro overlay finished before this listener attached
    const timeout = window.setTimeout(arm, 6000);
    return () => {
      window.removeEventListener("smj-intro-done", arm);
      window.clearTimeout(timeout);
    };
  }, []);

  return ready ? <ScrollAnimations /> : null;
}
