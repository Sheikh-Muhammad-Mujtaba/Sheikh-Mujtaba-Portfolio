"use client";

import { RefObject, useEffect } from "react";

type UseScrollAnimationProps = {
  pageRef: RefObject<HTMLElement | null>;
  footerTitleRef: RefObject<HTMLElement | null>;
  footerLinksRef: RefObject<HTMLElement | null>;
};

export const useScrollAnimation = ({
  pageRef,
  footerTitleRef,
  footerLinksRef,
}: UseScrollAnimationProps) => {
  useEffect(() => {
    if (
      !pageRef.current ||
      !footerTitleRef.current ||
      !footerLinksRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const targets = [
      ...Array.from(pageRef.current.querySelectorAll<HTMLElement>('[data-project-card="true"]')),
      footerTitleRef.current,
      footerLinksRef.current,
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-inview", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pageRef, footerTitleRef, footerLinksRef]);
};
