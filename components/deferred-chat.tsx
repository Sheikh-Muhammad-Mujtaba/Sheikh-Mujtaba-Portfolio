"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredChat() {
  useEffect(() => {
    // Warm up bundle as early as possible
    void import("./chat");
  }, []);

  // Mount Chat immediately (no reveal wait) so the full UI is present.
  return <Chat />;
}
    // Reveal when the intro overlay signals it's done. Use a fallback timer
