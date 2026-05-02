"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredChat() {
  const [shouldLoadChat, setShouldLoadChat] = useState(false);

  useEffect(() => {
    void import("./chat");
  }, []);

  if (shouldLoadChat) {
    return <Chat initialOpen />;
  }

  return (
    <button
      type="button"
      onPointerDown={() => setShouldLoadChat(true)}
      onFocus={() => void import("./chat")}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-1100 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-900/80 shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:h-12 sm:w-12"
      aria-label="Open chat dialog to ask questions"
      title="Open chat"
    >
      <Image
        src="/Logo.avif"
        alt="Logo"
        width={50}
        height={50}
        className="h-10 w-10 rounded-full object-fill"
      />
    </button>
  );
}
