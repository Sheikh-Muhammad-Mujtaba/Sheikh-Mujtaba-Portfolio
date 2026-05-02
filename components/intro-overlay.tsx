"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import styles from "../styles/intro-overlay.module.scss";

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(true);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;

    if (!overlay || !logo) return;

    const setTargetPosition = () => {
      const headerLogo = document.querySelector<HTMLElement>('[data-header-logo="true"]');
      const logoRect = logo.getBoundingClientRect();
      const headerRect = headerLogo?.getBoundingClientRect();

      if (!headerRect || logoRect.width === 0 || logoRect.height === 0) return;

      const logoCenterX = window.innerWidth / 2;
      const logoCenterY = window.innerHeight / 2;
      const headerCenterX = headerRect.left + headerRect.width / 2;
      const headerCenterY = headerRect.top + headerRect.height / 2;

      overlay.style.setProperty("--intro-logo-x", `${headerCenterX - logoCenterX}px`);
      overlay.style.setProperty("--intro-logo-y", `${headerCenterY - logoCenterY}px`);
      overlay.style.setProperty("--intro-logo-scale", `${headerRect.width / logoRect.width}`);
    };

    setTargetPosition();
    window.addEventListener("resize", setTargetPosition);

    const removeTimer = window.setTimeout(() => setIsMounted(false), 4600);

    return () => {
      window.removeEventListener("resize", setTargetPosition);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div ref={overlayRef} className={styles.introOverlay} aria-hidden="true">
      <div className={styles.overlayBackground} />
      <div ref={logoRef} className={styles.premiumLogoWrapper}>
        <Image
          src="/Logo.avif"
          alt=""
          fill
          className={styles.premiumLogo}
          priority
          quality={100}
          sizes="(max-width: 768px) 100px, 150px"
        />
      </div>
    </div>
  );
}
