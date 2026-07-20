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
                y: 28,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%" },
              });
            });
            return;
          }

          stage.classList.add(styles.stageIsPinned);

          const count = cards.length;
          const steps = count - 1;
          const stepAngle = 360 / count;

          // Carousel ring: every card shares a transform origin pushed back on
          // the z-axis, so rotating them in place orbits them around a common
          // 3D circle. Radius derives from card width so cards never overlap.
          const ringRadius = () =>
            ((cards[0].offsetWidth / 2) / Math.tan(Math.PI / count)) * 1.08;

          gsap.set(cards, {
            transformOrigin: () => `50% 50% ${-ringRadius()}px`,
            rotationY: (i: number) => i * stepAngle,
            force3D: true,
          });

          const applyDepth = (progress: number) => {
            const position = progress * steps;
            const active = Math.round(position);
            cards.forEach((card, i) => {
              const distance = Math.abs(i - position);
              gsap.set(card, {
                opacity: gsap.utils.clamp(0.2, 1, 1 - distance * 0.55),
              });
              card.toggleAttribute("inert", i !== active);
            });
          };
          applyDepth(0);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${steps * 120}%`,
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
              applyDepth(this.progress());
            },
          });

          tl.to(cards, {
            rotationY: `-=${steps * stepAngle}`,
            ease: "none",
            duration: steps,
          });

          return () => {
            stage.classList.remove(styles.stageIsPinned);
            cards.forEach((card) => card.removeAttribute("inert"));
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
        <p className={styles.sub}>Flagship builds — scroll to flip through the deck.</p>
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
