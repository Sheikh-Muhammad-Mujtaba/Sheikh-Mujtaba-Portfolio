"use client";

import { useId, useState } from "react";

import styles from "../styles/project-grid.module.scss";
import type { ProjectType } from "../utils/project-data";
import ProjectCard from "./project-card";

type FilterKey = "all" | "ai" | "web" | "security";

const FILTERS: { key: FilterKey; label: string; types: string[] }[] = [
  { key: "all", label: "All", types: [] },
  { key: "ai", label: "AI & agents", types: ["AI Platform", "AI Agent", "AI + Documentation"] },
  { key: "web", label: "Full-stack & web", types: ["Full-Stack", "Frontend", "Backend"] },
  { key: "security", label: "Security", types: ["Cybersecurity", "AI Red Team"] },
];

/** Cards shown before "Show all" — two rows on desktop, a short scroll on phones. */
const INITIAL_VISIBLE = 6;
const EAGER_IMAGES = 3;

type ProjectGridProps = {
  projects: ProjectType[];
};

function matches(project: ProjectType, filter: FilterKey): boolean {
  if (filter === "all") return true;
  return FILTERS.find((item) => item.key === filter)?.types.includes(project.type) ?? false;
}

/**
 * Filterable project grid. Every card stays in the HTML — collapsed ones use
 * the `hidden` attribute — so crawlers still see a link to every project page.
 */
export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();

  const matching = projects.filter((project) => matches(project, filter));
  const visibleCount = expanded ? matching.length : Math.min(INITIAL_VISIBLE, matching.length);
  const visibleSlugs = new Set(matching.slice(0, visibleCount).map((project) => project.slug));

  const handleFilter = (key: FilterKey) => {
    setFilter(key);
    setExpanded(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {FILTERS.map((item) => {
          const count = projects.filter((project) => matches(project, item.key)).length;
          const active = filter === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={active ? `${styles.filter} ${styles.filterActive}` : styles.filter}
              aria-pressed={active}
              aria-controls={gridId}
              onClick={() => handleFilter(item.key)}
            >
              {item.label}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className={styles.status} aria-live="polite">
        Showing {visibleCount} of {matching.length} projects
      </p>

      <div id={gridId} className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index < EAGER_IMAGES}
            hidden={!visibleSlugs.has(project.slug)}
          />
        ))}
      </div>

      {matching.length > INITIAL_VISIBLE ? (
        <div className={styles.moreRow}>
          <button
            type="button"
            className="btn-secondary"
            aria-expanded={expanded}
            aria-controls={gridId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Show fewer projects" : `Show all ${matching.length} projects`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
