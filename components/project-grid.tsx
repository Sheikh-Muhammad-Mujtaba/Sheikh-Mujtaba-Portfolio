import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "../styles/project-grid.module.scss";
import type { ProjectType } from "../utils/project-data";
import ProjectCard from "./project-card";

/** Two rows on desktop; the full catalogue lives on /projects. */
const HOME_LIMIT = 6;
const EAGER_IMAGES = 3;

type ProjectGridProps = {
  projects: ProjectType[];
};

/** Homepage preview of the latest projects, linking through to the full /projects hub. */
export default function ProjectGrid({ projects }: ProjectGridProps) {
  const preview = projects.slice(0, HOME_LIMIT);
  const remaining = projects.length - preview.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {preview.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index < EAGER_IMAGES} />
        ))}
      </div>

      {remaining > 0 ? (
        <div className={styles.moreRow}>
          <Link href="/projects" className="btn-secondary">
            View all {projects.length} projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
