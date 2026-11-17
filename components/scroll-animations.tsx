"use client";

import { gsap, ScrollTrigger, useGSAP } from "../utils/gsap";

/**
 * Desktop-only scroll effects. Loaded by scroll-animations-loader.tsx only on
 * wide screens with motion allowed, so phones never download GSAP. Simple
 * fade-ins live in reveal-observer.tsx (no library needed).
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = [];

      /* ---- 3D Hero Portrait Move to About Section on Scroll ---- */
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const copy = document.querySelector<HTMLElement>("[data-hero-copy]");
      const visual = document.querySelector<HTMLElement>("[data-hero-visual]");
      const heroPortrait = document.querySelector<HTMLElement>("[data-hero-portrait]");
      const aboutTarget = document.querySelector<HTMLElement>("[data-about-portrait-target]");
      const aboutSection = document.querySelector<HTMLElement>("#about");
      const badge = document.querySelector<HTMLElement>("[data-hero-badge]");

      if (hero && heroPortrait && aboutTarget) {
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
      if (hero && visual) {
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
        cleanups.push(() => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
        });
      }

      /* ---- Featured projects: pinned horizontal gallery ---- */
      const showcase = document.querySelector<HTMLElement>("[data-fs]");
      const track = showcase?.querySelector<HTMLElement>("[data-fs-track]");
      const viewport = showcase?.querySelector<HTMLElement>("[data-fs-viewport]");

      if (showcase && track && viewport) {
        const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-fs-card]"));
        const counter = showcase.querySelector<HTMLElement>("[data-fs-current]");
        const bar = showcase.querySelector<HTMLElement>("[data-fs-progress]");

        showcase.setAttribute("data-fs-pinned", "");
        viewport.scrollLeft = 0;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        // Progress (0–1) at which each card is aligned with the first card's start.
        const stops = () => {
          const total = distance() || 1;
          const first = cards[0]?.offsetLeft ?? 0;
          return cards.map((card) => Math.min(1, (card.offsetLeft - first) / total));
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: showcase,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value: number) =>
                stops().reduce((best, stop) =>
                  Math.abs(stop - value) < Math.abs(best - value) ? stop : best,
                ),
              duration: { min: 0.2, max: 0.5 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
              if (counter) {
                const points = stops();
                let active = 0;
                points.forEach((stop, i) => {
                  if (self.progress + 0.02 >= stop) active = i;
                });
                counter.textContent = String(active + 1).padStart(2, "0");
              }
            },
          },
        });

        // Keyboard users: tabbing into an off-screen card scrolls the page to it.
        const onFocus = (event: FocusEvent) => {
          const card = (event.target as HTMLElement).closest<HTMLElement>("[data-fs-card]");
          const st = tween.scrollTrigger;
          if (!card || !st) return;
          const index = cards.indexOf(card);
          const target = st.start + (stops()[index] ?? 0) * (st.end - st.start);
          window.scrollTo({ top: target });
        };
        track.addEventListener("focusin", onFocus);

        cleanups.push(() => {
          track.removeEventListener("focusin", onFocus);
          showcase.removeAttribute("data-fs-pinned");
          if (bar) bar.style.removeProperty("transform");
          if (counter) counter.textContent = "01";
        });
      }

      return () => cleanups.forEach((fn) => fn());
    });

    // Recompute trigger positions once every image/font has settled.
    if (document.readyState === "complete") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  });

  return null;
}
