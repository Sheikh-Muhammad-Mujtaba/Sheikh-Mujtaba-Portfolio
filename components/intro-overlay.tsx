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
        y: 0,
        x: 0,
      });

      // Smooth Morph Reveal
      tl.to(ballRef.current, {
        duration: 1.2,
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        ease: "power3.out",
      })
      // Ball bounce animation - drops down then bounces
      .to(ballRef.current, {
        duration: 0.6,
        y: 80,
        ease: "power2.in",
      }, "-=0.2")
      .to(ballRef.current, {
        duration: 0.4,
        y: 0,
        ease: "elastic.out(1.2, 0.8)",
      })
      // Second smaller bounce
      .to(ballRef.current, {
        duration: 0.3,
        y: 40,
        ease: "power2.in",
      }, "+=0.1")
      .to(ballRef.current, {
        duration: 0.3,
        y: 0,
        ease: "elastic.out(1, 0.6)",
      })
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
          duration: 1.2,
          opacity: 0,
          ease: "power2.inOut",
        });

        gsap.to(ballRef.current, {
          duration: 1.5,
          x: x,
          y: y,
          scale: scale,
          opacity: 0,
          ease: "power2.inOut",
        });

        gsap.to(".overlayContainer", {
          duration: 0.8,
          opacity: 0,
          delay: 1,
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
          src="/Logo.png"
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
