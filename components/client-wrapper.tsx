// components/client-wrapper.tsx
"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("./smooth-scroll-optimized"),
  { ssr: false }
);

const DeferredChat = dynamic(
  () => import("./deferred-chat"),
  { ssr: false }
);

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll>{children}</SmoothScroll>
      <DeferredChat />
    </>
  );
}