"use client";

import { gsap, ScrollTrigger, useGSAP } from "../utils/gsap";

export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 900px)",
        // Not read below — it guarantees that a phone matches a condition.
        // gsap.matchMedia only runs the callback when one is true, so with
        // `isDesktop` + `reduce` alone every reveal on this page silently
        // never ran on mobile.
        isMobile: "(max-width: 899px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { isDesktop, reduce } = ctx.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduce: boolean;
        };
        if (reduce) return;

        /* ---- Section reveals (about / blog / quick links) ---- */
        const revealSections = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(revealSections, { y: 40, opacity: 0 });
        revealSections.forEach((section) => {
          gsap.to(section, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal-item]");
        gsap.set(revealItems, { y: 24, opacity: 0 });
        ScrollTrigger.batch(revealItems, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });

        /* ---- 3D Hero Portrait Move to About Section on Scroll ---- */
        const hero = document.querySelector<HTMLElement>("[data-hero]");
        const copy = document.querySelector<HTMLElement>("[data-hero-copy]");
        const visual = document.querySelector<HTMLElement>("[data-hero-visual]");
        const heroPortrait = document.querySelector<HTMLElement>("[data-hero-portrait]");
        const aboutTarget = document.querySelector<HTMLElement>("[data-about-portrait-target]");
        const aboutSection = document.querySelector<HTMLElement>("#about");
        const badge = document.querySelector<HTMLElement>("[data-hero-badge]");

        if (hero && heroPortrait && aboutTarget && isDesktop) {
          // Stays in normal flow — transforms only. `position: fixed` cannot be
          // used here: [data-hero-visual] receives a transform from the pointer
          // tilt below, and a transformed ancestor becomes the containing block
          // for fixed descendants, which breaks the anchoring entirely.
          gsap.set(heroPortrait, {
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
            transformOrigin: "top left",
            willChange: "transform",
          });

          // Document-space position: viewport rects shift while scrolling, so a
          // delta built from them goes stale mid-scrub. Adding the scroll offset
          // makes the measurement scroll-invariant.
          const docPos = (el: HTMLElement) => {
            const r = el.getBoundingClientRect();
            return {
              left: r.left + window.scrollX,
              top: r.top + window.scrollY,
              width: r.width,
            };
          };

          // Back the live transform out of the measurement to recover the
          // portrait's untransformed box, then measure to the target from there.
          // `transformOrigin: top left` keeps scale from shifting that corner,
          // so the subtraction is exact.
          const getDeltas = () => {
            const curX = (gsap.getProperty(heroPortrait, "x") as number) || 0;
            const curY = (gsap.getProperty(heroPortrait, "y") as number) || 0;
            const curScale = (gsap.getProperty(heroPortrait, "scale") as number) || 1;

            const h = docPos(heroPortrait);
            const t = docPos(aboutTarget);

            const baseLeft = h.left - curX;
            const baseTop = h.top - curY;
            const baseWidth = h.width / curScale;

            return {
              dx: t.left - baseLeft,
              dy: t.top - baseTop,
              scale: baseWidth > 0 ? t.width / baseWidth : 1,
            };
          };

          const portraitTL = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              endTrigger: aboutSection || aboutTarget,
              start: "top top",
              end: "top 40%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          portraitTL
            .to(heroPortrait, {
              x: () => getDeltas().dx * 0.5,
              y: () => getDeltas().dy * 0.5,
              scale: () => 1 + (getDeltas().scale - 1) * 0.5,
              rotationY: -16,
              rotationX: 6,
              z: 120,
              boxShadow: "0 50px 140px rgba(34, 211, 238, 0.45), 0 0 80px rgba(34, 211, 238, 0.28)",
              ease: "power2.out",
              duration: 0.55,
            })
            .to(heroPortrait, {
              x: () => getDeltas().dx,
              y: () => getDeltas().dy,
              scale: () => getDeltas().scale,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              boxShadow: "0 35px 100px rgba(0, 0, 0, 0.45), 0 0 60px rgba(34, 211, 238, 0.1)",
              ease: "power3.inOut",
              duration: 0.45,
            });
        }

        /* ---- Hero Copy Parallax & Floating Badge ---- */
        if (hero && copy && visual) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            })
            .to(copy, { yPercent: -14, opacity: 0.15, ease: "none" }, 0);
        }

        if (badge) {
          gsap.to(badge, {
            y: -8,
            duration: 3.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        /* ---- Hero Pointer 3D Tilt ---- */
        if (hero && visual && isDesktop) {
          const rx = gsap.quickTo(visual, "rotationX", {
            duration: 0.7,
            ease: "power3.out",
          });
          const ry = gsap.quickTo(visual, "rotationY", {
            duration: 0.7,
            ease: "power3.out",
          });
          const onMove = (e: PointerEvent) => {
            const r = hero.getBoundingClientRect();
            ry(gsap.utils.mapRange(0, r.width, -10, 10, e.clientX - r.left));
            rx(gsap.utils.mapRange(0, r.height, 7, -7, e.clientY - r.top));
          };
          const onLeave = () => {
            rx(0);
            ry(0);
          };
          hero.addEventListener("pointermove", onMove);
          hero.addEventListener("pointerleave", onLeave);
        }

        /* ---- 3D Experience Cards Slide-In on Scroll ---- */
        const expItems = gsap.utils.toArray<HTMLElement>("[data-experience-item]");
        const expListeners: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

        expItems.forEach((item, index) => {
          const dir = item.getAttribute("data-direction") || (index % 2 === 0 ? "left" : "right");
          const isLeft = dir === "left";

          gsap.set(item, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            x: isLeft ? -90 : 90,
            rotationY: isLeft ? -25 : 25,
            z: -120,
            opacity: 0,
          });

          gsap.to(item, {
            x: 0,
            rotationY: 0,
            z: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.8,
            },
          });

          // Interactive 3D hover tilt for experience cards on desktop
          if (isDesktop) {
            const onMove = (e: MouseEvent) => {
              const rect = item.getBoundingClientRect();
              const xPct = (e.clientX - rect.left) / rect.width - 0.5;
              const yPct = (e.clientY - rect.top) / rect.height - 0.5;
              gsap.to(item, {
                rotationY: xPct * 10,
                rotationX: -yPct * 10,
                z: 15,
                duration: 0.3,
                ease: "power2.out",
              });
            };
            const onLeave = () => {
              gsap.to(item, {
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            };
            item.addEventListener("mousemove", onMove);
            item.addEventListener("mouseleave", onLeave);
            expListeners.push({ el: item, move: onMove, leave: onLeave });
          }
        });

        /* ---- Project cards: scrubbed 3D reveal, direction matches layout ---- */
        const cards = gsap.utils.toArray<HTMLElement>('[data-project-card="true"]');
        cards.forEach((card, i) => {
          const img = card.querySelector<HTMLElement>('[data-project-image="true"]');
          const info = card.querySelector<HTMLElement>('[data-project-info="true"]');
          if (!img || !info) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          });

          if (isDesktop) {
            const fromLeft = i % 2 === 0;

            tl.from(
              img,
              {
                x: fromLeft ? -90 : 90,
                rotationY: fromLeft ? 18 : -18,
                z: -180,
                opacity: 0,
                ease: "none",
              },
              0
            );

            // Cascade the copy (title → description → type → buttons) instead of
            // sliding .projectInfo in as one slab. Animating the children keeps
            // .projectInfo itself transform-free for the parallax drift below.
            const infoLines = gsap.utils.toArray<HTMLElement>(info.children);
            tl.from(
              infoLines,
              {
                y: 44,
                opacity: 0,
                stagger: 0.07,
                ease: "none",
              },
              0.15
            );

            // Gentle counter-drift so the copy and the artwork don't travel in
            // lockstep. Kept small — .projectItemContainer has no overflow
            // clipping, so a large offset would push the text past the card.
            gsap.fromTo(
              info,
              { yPercent: 3.5 },
              {
                yPercent: -3.5,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          } else {
            // Animate the inner shell, not the card itself — the outer
            // .projectListing has to stay free for the exit fade below.
            // firstElementChild is .projectItemContainer (its only direct
            // child); that element's CSS :hover transform is moot on touch.
            const shell = (card.firstElementChild as HTMLElement) || card;
            tl.from(shell, { y: 36, opacity: 0, ease: "none" }, 0);
          }

          // Float + fade away as the card clears the top of the viewport, so
          // cards recede on exit instead of holding full opacity until they
          // pop off screen. Applied to the outer .projectListing: it is the
          // only element in this card with no CSS :hover transform for GSAP's
          // inline styles to override.
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "bottom 50%",
              end: "bottom 5%",
              scrub: true,
            },
          });
        });

        return () => {
          expListeners.forEach(({ el, move, leave }) => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        };
      }
    );

    // Recompute trigger positions once every image/font has settled
    if (document.readyState === "complete") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh(), {
        once: true,
      });
    }
  });

  return null;
}

