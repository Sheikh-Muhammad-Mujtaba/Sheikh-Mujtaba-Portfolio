"use client";


import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "../styles/intro-overlay.module.scss";

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  /**
   * `phase`:
   *  "visible"  — overlay is in the DOM + animating
   *  "done"     — animation finished → remove from DOM entirely
   */
  const [phase, setPhase] = useState<"visible" | "done">("visible");


  /* ── Once visible: compute logo travel target & set removal timer ───── */
  useEffect(() => {
    if (phase !== "visible") return;

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    /* Calculate translation so the animated logo lands exactly on the
       real header logo after the travel phase. */
    const computeTarget = () => {
      const headerLogo = document.querySelector<HTMLElement>('[data-header-logo="true"]');
      const logoRect = logo.getBoundingClientRect();
      const headerRect = headerLogo?.getBoundingClientRect();

      if (!headerRect || logoRect.width === 0 || logoRect.height === 0) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const targetX = headerRect.left + headerRect.width / 2;
      const targetY = headerRect.top + headerRect.height / 2;

      overlay.style.setProperty("--intro-logo-x", `${targetX - centerX}px`);
      overlay.style.setProperty("--intro-logo-y", `${targetY - centerY}px`);
      overlay.style.setProperty(
        "--intro-logo-scale",
        `${headerRect.width / logoRect.width}`
      );
    };

    computeTarget();
    window.addEventListener("resize", computeTarget);

    /*
     * Total overlay CSS animation = 4 s hold + 1.2 s fade = 5.2 s.
     * We unmount at 5.4 s (200 ms buffer) so the DOM element is
     * fully gone before the chat widget ever needs to be interacted with.
     */
    const removeTimer = window.setTimeout(() => setPhase("done"), 5400);

    return () => {
      window.removeEventListener("resize", computeTarget);
      window.clearTimeout(removeTimer);
    };
  }, [phase]);

  /* ── Nothing to render after animation done ──── */
  if (phase === "done") {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={styles.introOverlay}
      aria-hidden="true"
      aria-live="off"
    >
      <div className={styles.overlayBackground} />
      <div ref={logoRef} className={styles.premiumLogoWrapper}>
        <Image
          src="/Logo.avif"
          alt=""
          fill
          className={styles.premiumLogo}
          priority
          quality={100}
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 130px, 160px"
        />
      </div>
    </div>
  );
}
