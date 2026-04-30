"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
});

export default function DeferredChat() {
  const [canLoadChat, setCanLoadChat] = useState(false);

  useEffect(() => {
    const load = () => setCanLoadChat(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(load, 1600);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return canLoadChat ? <Chat /> : null;
}
