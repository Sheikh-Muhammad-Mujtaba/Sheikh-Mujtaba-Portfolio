"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `data-play` the first time the element is meaningfully on screen.
 * CSS keeps every animation inside paused until then, so the console starts
 * the instant it is seen — no player or animation library to download first.
 */
export default function ConsoleAutoplay({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-play", "");
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
