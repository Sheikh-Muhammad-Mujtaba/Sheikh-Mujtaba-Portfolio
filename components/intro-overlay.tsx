"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "../styles/intro-overlay.module.scss";

/** Must match the end of the `curtainLift` animation in intro-overlay.module.scss. */
const INTRO_DURATION_MS = 1900;

/**
 * Brand reveal shown on every full page load, never on in-site navigation.
 *
 * Whether it plays is decided before first paint by the inline script in
 * `app/layout.tsx`, which sets `<html data-intro="play" | "skip">`. The overlay
 * is server-rendered and CSS-driven, so it is visible from the very first frame
 * and still clears itself if JavaScript never runs. This component only removes
 * it from the DOM afterwards.
 */
export default function IntroOverlay() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // When skipped, `html[data-intro="skip"]` already hides it with CSS.
    if (document.documentElement.dataset.intro !== "play") return;

    const timer = window.setTimeout(() => {
      setMounted(false);
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("smj-intro-done"));
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.stage}>
        <div className={styles.mark}>
          <svg className={styles.ring} viewBox="0 0 120 120" focusable="false">
            <defs>
              <linearGradient id="intro-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d6b56d" />
                <stop offset="55%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#d6b56d" />
              </linearGradient>
            </defs>
            <circle className={styles.ringTrack} cx="60" cy="60" r="56" />
            <circle className={styles.ringStroke} cx="60" cy="60" r="56" />
          </svg>
          <Image
            src="/Logo.avif"
            alt=""
            width={112}
            height={112}
            className={styles.logo}
            priority
          />
        </div>

        <p className={styles.name}>Sheikh Mujtaba</p>
        <p className={styles.title}>AI Security Engineer &amp; AI Developer</p>
        <span className={styles.progress} />
      </div>
    </div>
  );
}
