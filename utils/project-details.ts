import { aiProjects } from "../data/projects/ai";
import { securityProjects } from "../data/projects/security";
import { webProjects } from "../data/projects/web";
import { projectsList, type ProjectType } from "./project-data";
import type { ProjectDetail } from "./project-detail-types";

export type { ProjectDetail } from "./project-detail-types";

const details: ProjectDetail[] = [...aiProjects, ...webProjects, ...securityProjects];

export type ProjectPage = ProjectType & { detail: ProjectDetail };

/** Every project that has a detail page, in the homepage's order. */
export const projectPages: ProjectPage[] = projectsList.flatMap((project) => {
  const detail = details.find((item) => item.slug === project.slug);
  return detail ? [{ ...project, detail }] : [];
});

export function getProjectPage(slug: string): ProjectPage | undefined {
  return projectPages.find((page) => page.slug === slug);
}

export function hasProjectPage(slug: string): boolean {
  return projectPages.some((page) => page.slug === slug);
}

/** Up to `limit` other projects, same type first. */
export function relatedProjects(page: ProjectPage, limit = 3): ProjectPage[] {
  const others = projectPages.filter((other) => other.slug !== page.slug);
  const sameType = others.filter((other) => other.type === page.type);
  const rest = others.filter((other) => other.type !== page.type);
  return [...sameType, ...rest].slice(0, limit);
}
