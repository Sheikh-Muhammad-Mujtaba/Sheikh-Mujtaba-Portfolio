"use client";

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
}: UsePageRevealProps) => {
  useEffect(() => {
    if (!animationComplete) return;
    afterAnimationRef.current?.removeAttribute("aria-hidden");
  }, [animationComplete, afterAnimationRef]);
};
