"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
  loading: () => null,
});

const INTERACTIONS = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll"] as const;
const FALLBACK_MS = 8000;

/**
 * The chat widget (and framer-motion with it) is the largest script after the
 * framework. It loads on the visitor's first interaction — or after a few
 * seconds idle — instead of during page load, so it never adds to main-thread
 * blocking while the page is becoming interactive.
 */
export default function DeferredChat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let done = false;

    const mount = () => {
      if (done) return;
      done = true;
      INTERACTIONS.forEach((type) => window.removeEventListener(type, onInteract));
      window.clearTimeout(fallback);
      // Yield to whatever the interaction itself triggered before parsing chat.
      idleId =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
          : window.setTimeout(() => setReady(true), 300);
    };
    const onInteract = () => mount();

    INTERACTIONS.forEach((type) => window.addEventListener(type, onInteract, { passive: true, once: true }));
    const fallback = window.setTimeout(mount, FALLBACK_MS);

    return () => {
      INTERACTIONS.forEach((type) => window.removeEventListener(type, onInteract));
      window.clearTimeout(fallback);
      if (idleId === undefined) return;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return ready ? <Chat /> : null;
}
