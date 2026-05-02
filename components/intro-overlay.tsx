"use client";

import Image from "next/image";
import { RefObject, useEffect, useRef } from "react";
import { gsap } from "gsap";

import styles from "../styles/intro-overlay.module.scss";

type IntroOverlayProps = {
  ballRef: RefObject<HTMLDivElement | null>;
  enabled: boolean;
  onComplete: () => void;
  onContentAppear?: () => void;
  pageRef: RefObject<HTMLDivElement | null>;
  afterAnimationRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  portraitContainerRef: RefObject<HTMLDivElement | null>;
  jobTitleRef: RefObject<HTMLParagraphElement | null>;
  aboutContainerRef: RefObject<HTMLElement | null>;
  blogPreviewContainerRef: RefObject<HTMLElement | null>;
  footerTitleRef: RefObject<HTMLHeadingElement | null>;
  footerLinksRef: RefObject<HTMLUListElement | null>;
  isComplete?: boolean;
};

export default function IntroOverlay({
  ballRef,
  enabled,
  onComplete,
  onContentAppear,
}: IntroOverlayProps) {
  const animationStartedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !ballRef.current || animationStartedRef.current) return;

    animationStartedRef.current = true;

    const ball = ballRef.current;
    const windowHeight = window.innerHeight;

    // 1. Pre‑measure the header position once (won't change during animation)
    const headerLogo = document.querySelector<HTMLElement>(
      '[data-header-logo="true"]'
    );
    const headerPos = headerLogo?.getBoundingClientRect() ?? null;

    // 2. GSAP context – all animations live inside this
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state: above the viewport
      tl.set(ball, {
        filter: "blur(20px)",
        scale: 1.2,
        opacity: 0,
        y: -windowHeight,
        x: 0,
      });

      // Drop down & bounce to resting position (y=0)
      tl.to(ball, {
        duration: 1,
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "bounce.out",
      });

      // Tiny pause for anticipation
      tl.to({}, { duration: 0.1 });

      // Move to header and dissolve
      tl.add(() => {
        onContentAppear?.();

        if (headerPos && ball) {
          // Read ball's current screen position (only one forced read, acceptable)
          const ballRect = ball.getBoundingClientRect();

          // Delta from ball's current position to header's position
          const dx =
            headerPos.left -
            ballRect.left +
            (headerPos.width - ballRect.width) / 2;
          const dy =
            headerPos.top -
            ballRect.top +
            (headerPos.height - ballRect.height) / 2;
          const targetScale = headerPos.width / ballRect.width;

          // Animate ball to header using absolute offsets
          gsap.to(ball, {
            duration: 0.85,
            x: dx,
            y: dy,
            scale: targetScale,
            opacity: 0,
            ease: "power2.inOut",
          });
        } else {
          // Fallback if header not found – just shrink & fade at current spot
          gsap.to(ball, {
            duration: 0.85,
            scale: 0.5,
            opacity: 0,
            ease: "power2.inOut",
          });
        }

        // Fade out the overlay background
        gsap.to(".overlayBackground", {
          duration: 0.7,
          opacity: 0,
          ease: "power2.inOut",
        });

        // Fade out the whole overlay container
        gsap.to(".overlayContainer", {
          duration: 0.45,
          opacity: 0,
          delay: 0.55,
          onComplete: () => {
            const overlayEl = document.querySelector(".overlayContainer") as HTMLElement;
            if (overlayEl) {
              overlayEl.classList.add("complete");
              overlayEl.style.visibility = "hidden";
              overlayEl.style.pointerEvents = "none";
              overlayEl.style.zIndex = "-10";
            }
            onComplete();
          },
        });
      }, "+=0.3");
    });

    // Cleanup (optional – we intentionally don't revert because the animation
    // should finish even if the component re‑renders)
    return () => {
      // ctx.revert(); // keep commented
    };
  }, [enabled, ballRef, onComplete, onContentAppear]);

  return (
    <div className={`overlayContainer ${styles.introOverlay}`}>
      <div className={`overlayBackground ${styles.overlayBackground}`}></div>
      <div ref={ballRef} className={styles.premiumLogoWrapper}>
        <Image
          src="/Logo.avif"
          alt="Logo Image"
          fill
          className={styles.premiumLogo}
          priority
          loading="eager"
          quality={100}
          sizes="(max-width: 768px) 100px, 150px"
        />
      </div>
    </div>
  );
}