"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredChat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // The chat (plus framer-motion) is not needed for first paint, and the
    // intro overlay covers the launcher for its first ~4s anyway. Load it once
    // the page has finished loading and the main thread is idle, so it never
    // competes with the hero image, fonts or LCP.
    let idleId: number | undefined;
    const arm = () => {
      const mount = () => setReady(true);
      idleId =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(mount, { timeout: 2500 })
          : window.setTimeout(mount, 1200);
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

  return ready ? <Chat /> : null;
}
