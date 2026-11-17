"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-reveal-item], [data-experience-item]";
const VISIBLE = "is-visible";
const STAGGER_MS = 80;
const MAX_STAGGER_MS = 400;

/**
 * Scroll reveals without an animation library.
 *
 * Content is never hidden before this runs (no JS, crawlers, slow devices all
 * see everything). On mount it first marks whatever is already on screen as
 * visible, then sets `html.reveal-ready`, which hides only the rest until it
 * scrolls into view — so nothing above the fold flickers. Re-runs on every
 * client-side navigation. Skipped entirely for reduced motion.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const pending = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.classList.contains(VISIBLE),
    );
    const viewportBottom = window.innerHeight;
    const offscreen = pending.filter((el) => {
      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < viewportBottom && rect.bottom > 0;
      if (onScreen) el.classList.add(VISIBLE);
      return !onScreen;
    });

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Math.min(batchIndex * STAGGER_MS, MAX_STAGGER_MS);
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add(VISIBLE);
          observer.unobserve(el);
          batchIndex += 1;
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    offscreen.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
