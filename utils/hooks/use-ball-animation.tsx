"use client";

import { gsap } from "gsap";
import { RefObject, useEffect } from "react";

type UsePageRevealProps = {
  animationComplete: boolean;
  afterAnimationRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
  portraitContainerRef: RefObject<HTMLElement | null>;
  jobTitleRef: RefObject<HTMLElement | null>;
  aboutContainerRef: RefObject<HTMLElement | null>;
  blogPreviewContainerRef: RefObject<HTMLElement | null>;
};

export const useBallAnimation = ({
  animationComplete,
  afterAnimationRef,
  titleRef,
  portraitContainerRef,
  jobTitleRef,
  aboutContainerRef,
  blogPreviewContainerRef,
}: UsePageRevealProps) => {
  useEffect(() => {
    if (typeof window === "undefined" || !animationComplete) {
      return;
    }

    const afterAnimationElement = afterAnimationRef.current;
    const titleElement = titleRef.current;
    const portraitContainerElement = portraitContainerRef.current;
    const jobTitleElement = jobTitleRef.current;
    const aboutContainerElement = aboutContainerRef.current;
    const blogPreviewContainerElement = blogPreviewContainerRef.current;

    if (
      !afterAnimationElement ||
      !titleElement ||
      !portraitContainerElement ||
      !jobTitleElement ||
      !aboutContainerElement ||
      !blogPreviewContainerElement
    ) {
      return;
    }

    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();
      
      const titleLines = gsap.utils.toArray('.titleLine', titleElement);
      const heroButtons = afterAnimationElement.querySelector('.heroButtons');
      
      tl.from(afterAnimationElement, {
        duration: 1.2,
        opacity: 0,
        ease: "power2.out",
      })
      .from(
        titleLines,
        {
          duration: 1,
          y: 80,
          opacity: 0,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        portraitContainerElement,
        {
          duration: 1.2,
          scale: 0.8,
          opacity: 0,
          ease: "back.out(1.2)",
        },
        "-=0.6"
      )
      .to(
        heroButtons,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        [
          jobTitleElement,
          aboutContainerElement,
          blogPreviewContainerElement,
        ],
        {
          duration: 1,
          y: 20,
          opacity: 0,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.6"
      );
    });

    return () => mm.revert();
  }, [
    animationComplete,
    afterAnimationRef,
    titleRef,
    portraitContainerRef,
    jobTitleRef,
    aboutContainerRef,
    blogPreviewContainerRef,
  ]);
};
