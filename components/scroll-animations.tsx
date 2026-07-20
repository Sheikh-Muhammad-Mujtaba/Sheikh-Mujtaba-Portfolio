"use client";

import { gsap, ScrollTrigger, useGSAP } from "../utils/gsap";

export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { isDesktop, reduce } = ctx.conditions as {
          isDesktop: boolean;
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
          gsap.set(heroPortrait, {
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
            willChange: "transform",
            position: "relative",
            zIndex: 999,
          });

          // Helper to calculate exact spatial deltas between Hero portrait and About target slot
          const getDeltas = () => {
            const curX = (gsap.getProperty(heroPortrait, "x") as number) || 0;
            const curY = (gsap.getProperty(heroPortrait, "y") as number) || 0;
            const curScale = (gsap.getProperty(heroPortrait, "scale") as number) || 1;

            const hRect = heroPortrait.getBoundingClientRect();
            const tRect = aboutTarget.getBoundingClientRect();

            const baseHLeft = hRect.left - curX;
            const baseHTop = hRect.top - curY;
            const baseHWidth = hRect.width / curScale;

            const dx = tRect.left - baseHLeft;
            const dy = tRect.top - baseHTop;
            const scale = baseHWidth > 0 ? tRect.width / baseHWidth : 1;

            return { dx, dy, scale };
          };

          // ScrollTrigger transition moving portrait diagonally from top-right Hero down to bottom-left About target slot
          const portraitTL = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              endTrigger: aboutSection || aboutTarget,
              start: "top top",
              end: "top 35%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          portraitTL
            .to(heroPortrait, {
              x: () => getDeltas().dx * 0.55,
              y: () => getDeltas().dy * 0.55,
              scale: () => 1 + (getDeltas().scale - 1) * 0.55,
              rotationY: -22,
              rotationX: 8,
              z: 140,
              zIndex: 999,
              boxShadow: "0 45px 120px rgba(34, 211, 238, 0.4), 0 0 75px rgba(34, 211, 238, 0.25)",
              ease: "power2.inOut",
              duration: 0.5,
            })
            .to(heroPortrait, {
              x: () => getDeltas().dx,
              y: () => getDeltas().dy,
              scale: () => getDeltas().scale,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              zIndex: 999,
              boxShadow: "0 35px 100px rgba(0, 0, 0, 0.45), 0 0 60px rgba(34, 211, 238, 0.1)",
              ease: "power2.out",
              duration: 0.5,
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
            ).from(info, { y: 48, opacity: 0, ease: "none" }, 0.15);
          } else {
            tl.from(card, { y: 36, opacity: 0, ease: "none" }, 0);
          }
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

