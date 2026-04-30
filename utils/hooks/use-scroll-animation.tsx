"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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
    if (typeof window === "undefined") return;

    const pageElement = pageRef.current;
    const footerTitleElement = footerTitleRef.current;
    const footerLinksElement = footerLinksRef.current;

    if (!pageElement || !footerTitleElement || !footerLinksElement) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const breakPoint = 768;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions && !context.conditions.reduceMotion) {
          const { isDesktop } = context.conditions;
          const projects = Array.from(
            pageElement.querySelectorAll<HTMLElement>('[data-project-card="true"]')
          );

          projects.forEach((project) => {
            const projectImage = project.querySelector<HTMLElement>(
              '[data-project-image="true"]'
            );
            const projectInfo = project.querySelector<HTMLElement>(
              '[data-project-info="true"]'
            );

            if (!projectImage || !projectInfo) return;

            const tlProject = gsap.timeline({
              scrollTrigger: {
                trigger: project,
                start: isDesktop ? "top bottom" : "top center",
                end: "center center",
                scrub: 1,
              },
            });

            tlProject
              .fromTo(projectImage, { x: isDesktop ? -300 : 0, y: isDesktop ? 0 : 100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
              .fromTo(projectInfo, { x: isDesktop ? 300 : 0, y: isDesktop ? 0 : 100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
          });

          const tlFooter = gsap.timeline({
            scrollTrigger: {
              trigger: footerTitleElement,
              start: "top 90%",
            },
          });
          
          tlFooter
            .fromTo(footerTitleElement, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
            .fromTo(footerLinksElement, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
        }
      }
    );

    return () => mm.revert();
  }, [pageRef, footerTitleRef, footerLinksRef]);
};
