import type { PostBlock, PostFaq } from "./blog-types";

/**
 * A role landing page: one profession Sheikh Mujtaba is searched for, with the
 * name as the primary keyword and the role as the qualifier
 * ("Sheikh Mujtaba — Ethical Hacker").
 *
 * Each page must stand on its own with distinct, verifiable content. Near-copy
 * pages that only swap the job title are treated by Google as doorway pages
 * and demoted, so every role cites different projects and different work.
 */
export type RolePage = {
  /** Top-level URL segment, e.g. `ethical-hacker`. */
  slug: string;
  /** The profession, used in titles, the OG card and Occupation JSON-LD. */
  role: string;
  /** Full `<title>`; must contain the name and the role. */
  title: string;
  /** On-page H1. */
  heading: string;
  description: string;
  /** Primary search phrase this page targets. */
  focusKeyword: string;
  keywords: string[];
  /** Two or three short labels for the OG card chips. */
  tags: string[];
  /** Skills listed in the Occupation schema and the at-a-glance box. */
  skills: string[];
  /** Two to four sentence summary shown above the body. */
  summary: string;
  blocks: PostBlock[];
  /** Slugs from `utils/project-data.ts` that evidence this role. */
  projects: string[];
  /** Slugs of related blog guides. */
  guides: string[];
  faqs: PostFaq[];
  updated: string;
};
