"use client";

import { useRef } from "react";
import Image from "next/image";

import styles from "../styles/featured-showcase.module.scss";
import { gsap, useGSAP } from "../utils/gsap";
import type { ProjectType } from "../utils/project-data";

type FeaturedShowcaseProps = {
  projects: ProjectType[];
};

export default function FeaturedShowcase({ projects }: FeaturedShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || projects.length < 2) return;

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

          const stage = section.querySelector<HTMLElement>("[data-fs-stage]");
          const cards = gsap.utils.toArray<HTMLElement>("[data-fs-card]", section);
          if (!stage || cards.length < 2) return;

          if (!isDesktop) {
            cards.forEach((card) => {
              gsap.from(card, {
                y: 44,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%" },
              });
            });
            return;
          }

          stage.classList.add(styles.stageIsPinned);

          const steps = cards.length - 1;

          // Stacked deck: every card fills the pinned stage. The first one is
          // in place, the rest wait just below the clip edge and slide up over
          // the card before them as the section scrubs.
          gsap.set(cards, { force3D: true, willChange: "transform, opacity" });
          gsap.set(cards[0], { yPercent: 0, scale: 1, opacity: 1 });
          gsap.set(cards.slice(1), { yPercent: 105, scale: 1, opacity: 1 });

          const setActive = (progress: number) => {
            const active = Math.round(progress * steps);
            cards.forEach((card, i) => {
              card.toggleAttribute("inert", i !== active);
              card.style.zIndex = String(i);
            });
          };
          setActive(0);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${steps * 100}%`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              snap: {
                snapTo: 1 / steps,
                duration: 0.4,
                ease: "power2.inOut",
              },
              invalidateOnRefresh: true,
            },
            onUpdate() {
              setActive(this.progress());
            },
          });

          cards.forEach((card, i) => {
            if (i === 0) return;
            const label = i - 1;
            // Outgoing card settles back a touch so the incoming one reads as
            // sliding over the top of it rather than replacing it.
            tl.to(
              cards[i - 1],
              { yPercent: -6, scale: 0.94, opacity: 0.45, duration: 1 },
              label
            ).to(card, { yPercent: 0, duration: 1 }, label);
          });

          return () => {
            stage.classList.remove(styles.stageIsPinned);
            cards.forEach((card) => {
              card.removeAttribute("inert");
              card.style.removeProperty("z-index");
            });
          };
        }
      );
    },
    { scope: sectionRef }
  );

  if (projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="featured"
      className={styles.showcase}
      aria-label="Featured projects"
    >
      <div className={styles.heading}>
        <p className={styles.kicker}>Selected Work</p>
        <h2>Featured Projects</h2>
        <p className={styles.sub}>Flagship builds — scroll to stack through the deck.</p>
      </div>
      <div className={styles.stage} data-fs-stage>
        <div className={styles.deck}>
          {projects.map((project) => (
            <article key={project.slug} className={styles.card} data-fs-card>
              <div className={styles.cardMedia}>
                <Image
                  src={project.image}
                  alt={project.name}
                  className={styles.cardImage}
                  sizes="(max-width: 900px) 100vw, 48vw"
                  {...(typeof project.image === "string"
                    ? {}
                    : { placeholder: "blur" as const })}
                />
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.cardType}>{project.type}</p>
                <h3>{project.name}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardLinks}>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Open site of ${project.name}`}
                    >
                      Open Site
                    </a>
                  )}
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`View code for ${project.name}`}
                    >
                      View Code
                    </a>
                  )}
                  <a
                    href={`#${project.slug}`}
                    className={styles.cardMore}
                    title={`Jump to full details for ${project.name}`}
                  >
                    Full Details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
