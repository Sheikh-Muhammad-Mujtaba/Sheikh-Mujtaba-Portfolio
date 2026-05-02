"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LenisWrapper = dynamic(
  () => import("./lenis-wrapper"),
  { ssr: false, loading: () => <>{}</> }
);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load Lenis after initial render
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <LenisWrapper>{children}</LenisWrapper>;
}
