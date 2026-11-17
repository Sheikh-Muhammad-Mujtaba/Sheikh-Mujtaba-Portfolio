import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";

import styles from "../styles/featured-showcase.module.scss";
import type { ProjectType } from "../utils/project-data";
import { youTubeThumbnail } from "../utils/youtube";
import { GitHubIcon } from "./social-icons";

export type FeaturedProject = Pick<
  ProjectType,
  "slug" | "name" | "type" | "description" | "image" | "link" | "code" | "videoEmbedUrl"
> & { stack: string[] };

type FeaturedShowcaseProps = {
  projects: FeaturedProject[];
};

const MAX_CHIPS = 4;

/**
 * Featured projects as a horizontal gallery.
 *
 * Server-rendered and usable with no JavaScript: the track is a native
 * scroll-snap carousel (swipe on phones, shift-scroll or keyboard elsewhere).
 * On desktop with motion allowed, components/scroll-animations.tsx pins the
 * section and turns vertical scrolling into horizontal travel — that code is
 * only downloaded on desktop.
 */
export default function FeaturedShowcase({ projects }: FeaturedShowcaseProps) {
  if (projects.length === 0) return null;

  const total = String(projects.length).padStart(2, "0");

  return (
    <section id="featured" className={styles.showcase} aria-labelledby="featured-heading" data-fs>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Selected work</p>
            <h2 id="featured-heading" className={styles.title}>
              Featured Projects
            </h2>
          </div>
          <div className={styles.meta}>
            <p className={styles.counter} aria-hidden="true">
              <span data-fs-current>01</span>
              <span className={styles.counterTotal}>/ {total}</span>
            </p>
            <div className={styles.progress} aria-hidden="true">
              <span data-fs-progress />
            </div>
            <p className={styles.hint}>
              <span className={styles.hintDesktop}>Scroll to explore</span>
              <span className={styles.hintMobile}>Swipe to explore</span>
            </p>
          </div>
        </div>

        {/* Focusable so keyboard users can scroll the carousel with arrow keys. */}
        <div
          className={styles.viewport}
          data-fs-viewport
          role="region"
          aria-label="Featured projects, scroll horizontally"
          tabIndex={0}
        >
          <ol className={styles.track} data-fs-track>
            {projects.map((project, index) => {
              const thumbnail = project.videoEmbedUrl
                ? youTubeThumbnail(project.videoEmbedUrl)
                : undefined;
              const titleId = `featured-${project.slug}`;

              return (
                <li key={project.slug} className={styles.slide} data-fs-card>
                  <article className={styles.card} aria-labelledby={titleId}>
                    <div className={styles.media}>
                      <Image
                        src={thumbnail ?? project.image}
                        alt=""
                        fill
                        sizes="(max-width: 899px) 88vw, 560px"
                        className={styles.image}
                      />
                      {thumbnail ? (
                        <span className={styles.play} aria-hidden="true">
                          <Play size={14} fill="currentColor" />
                          Demo video
                        </span>
                      ) : null}
                    </div>

                    <div className={styles.content}>
                      <p className={styles.index} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className={styles.type}>{project.type}</p>
                      <h3 id={titleId} className={styles.name}>
                        {project.name}
                      </h3>
                      <p className={styles.description}>{project.description}</p>
                      <ul className={styles.chips} aria-label="Technology">
                        {project.stack.slice(0, MAX_CHIPS).map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                      <div className={styles.actions}>
                        <Link href={`/projects/${project.slug}`} className="btn-primary">
                          Case study
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconButton}
                            aria-label={`Open the live ${project.name} site (opens in a new tab)`}
                          >
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </a>
                        ) : null}
                        {project.code ? (
                          <a
                            href={project.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconButton}
                            aria-label={`View the ${project.name} source code on GitHub (opens in a new tab)`}
                          >
                            <GitHubIcon width={18} height={18} aria-hidden="true" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
