import Image from "next/image";

import styles from "../styles/project-listing.module.scss";
import commonStyles from "../styles/common.module.scss";

import type { ProjectType } from "../utils/project-data";
import YouTubeHoverPlayer from "./youtube-hover-player";

type ProjectListingProps = {
  project: ProjectType;
};



export default function ProjectListing({ project }: ProjectListingProps) {
  const {
    slug,
    image,
    mobileImage,
    name,
    description,
    link,
    code,
    type,
    videoEmbedUrl,
  } = project;
  const isYouTubeLink = !!link && /youtube\.com|youtu\.be/i.test(link);
  const primaryCtaLabel = isYouTubeLink ? "Watch Demo" : "Open Site";

  return (
    <div
      className={`project ${styles.projectListing}`}
      id={slug}
      data-project-card="true"
    >
      <div className={styles.projectItemContainer}>
        {videoEmbedUrl ? (
          <div className={styles.projectVideoWrapper} data-project-image="true">
            <YouTubeHoverPlayer
              embedUrl={videoEmbedUrl}
              title={`${name} video demo`}
              className={styles.projectVideo}
              id={`player-${slug}`}
            />
          </div>
        ) : (
          <a
            href={link ?? code ?? "#"}
            title={link ? `Open site of ${name}` : `View Code for ${name}`}
            data-project-image="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={image}
              alt={name}
              className={styles.projectImage}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
            />
          </a>
        )}
        <div
          id="projectInfo"
          className={styles.projectInfo}
          data-project-info="true"
        >
          <a
            href={link ?? code ?? "#"}
            title={link ? `Open site of ${name}` : `View Code for ${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={commonStyles.playfulHover}>{name}</h2>
          </a>
          {description.split("\n").map((str, index) => (
            <p key={index}>{str}</p>
          ))}
          <p>{type}</p>
          <div className={styles.projectBtns}>
            {link && (
              <a
                href={link}
                title={
                  isYouTubeLink
                    ? `Watch video demo for ${name}`
                    : `Open site of ${name}`
                }
                className={styles.projectBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                {primaryCtaLabel}
              </a>
            )}
            {code && (
              <a
                href={code}
                title={`View Code for ${name}`}
                className={styles.projectBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
