import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

import styles from "../styles/project-grid.module.scss";
import type { ProjectType } from "../utils/project-data";
import { youTubeThumbnail } from "../utils/youtube";
import { GitHubIcon } from "./social-icons";

type ProjectCardProps = {
  project: ProjectType;
  /** Above-the-fold cards load eagerly. */
  priority?: boolean;
};

/**
 * Compact project card. The title link is stretched over the whole card, so
 * the card is one large target that opens the project page, while the live
 * site and source links stay separately focusable above it.
 */
export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { slug, name, description, type, image, link, code, videoEmbedUrl } = project;
  const thumbnail = videoEmbedUrl ? youTubeThumbnail(videoEmbedUrl) : undefined;
  const titleId = `project-${slug}-title`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        <Image
          src={thumbnail ?? image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className={styles.image}
          priority={priority}
        />
        <span className={styles.badge}>{type}</span>
        {thumbnail ? (
          <span className={styles.play} aria-hidden="true">
            <Play size={16} fill="currentColor" />
            Demo video
          </span>
        ) : null}
      </div>

      <div className={styles.body}>
        <h3 id={titleId} className={styles.title}>
          <Link href={`/projects/${slug}`} className={styles.stretched}>
            {name}
          </Link>
        </h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.more} aria-hidden="true">
            View project
            <ArrowUpRight size={16} />
          </span>
          <div className={styles.external}>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={`Open the live ${name} site (opens in a new tab)`}
                title="Live site"
              >
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : null}
            {code ? (
              <a
                href={code}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={`View the ${name} source code on GitHub (opens in a new tab)`}
                title="Source code"
              >
                <GitHubIcon width={18} height={18} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
