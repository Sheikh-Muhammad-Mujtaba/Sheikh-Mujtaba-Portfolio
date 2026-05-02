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
    // Only run animation once, when enabled becomes true for the first time
    if (!enabled || !ballRef.current || animationStartedRef.current) return;

    animationStartedRef.current = true;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Setup initial state
      gsap.set(ballRef.current, {
        filter: "blur(20px)",
        scale: 1.2,
        opacity: 0,
        y: typeof window !== "undefined" ? -window.innerHeight : -800,
        x: 0,
      });

      // Drop down and bounce
      tl.to(ballRef.current, {
        duration: 1,
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "bounce.out",
      })
      // Slight pause for anticipation before moving to header
      .to({}, { duration: 0.1 })
      // Move to header and dissolve
      .add(() => {
        // Show content while ball is moving to header
        onContentAppear?.();
        
        const headerLogo = document.querySelector('[data-header-logo="true"]');
        let x = 0, y = 0, scale = 0.5;
        if (headerLogo && ballRef.current) {
          const headerRect = headerLogo.getBoundingClientRect();
          const ballRect = ballRef.current.getBoundingClientRect();
          x = headerRect.left - ballRect.left + (headerRect.width - ballRect.width) / 2;
          y = headerRect.top - ballRect.top + (headerRect.height - ballRect.height) / 2;
          scale = headerRect.width / ballRect.width;
        }

        gsap.to(".overlayBackground", {
          duration: 0.7,
          opacity: 0,
          ease: "power2.inOut",
        });

        gsap.to(ballRef.current, {
          duration: 0.85,
          x: x,
          y: y,
          scale: scale,
          opacity: 0,
          ease: "power2.inOut",
        });

        gsap.to(".overlayContainer", {
          duration: 0.45,
          opacity: 0,
          delay: 0.55,
          onComplete: () => {
            // Hide the overlay completely and reduce z-index
            const overlayElement = document.querySelector('.overlayContainer');
            if (overlayElement) {
              overlayElement.classList.add('complete');
              (overlayElement as HTMLElement).style.visibility = "hidden";
              (overlayElement as HTMLElement).style.pointerEvents = "none";
              (overlayElement as HTMLElement).style.zIndex = "-10";
            }
            onComplete();
          }
        });
      }, "+=0.3");
    });

    return () => {
      // ctx.revert(); // Don't revert, as we want the animation to finish even if parent re-renders
    };
  }, [enabled]);

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
