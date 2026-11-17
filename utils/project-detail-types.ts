import type { PostBlock, PostFaq } from "./blog-types";

/**
 * Long-form content for a project detail page (/projects/<slug>). The card
 * data (name, image, links, type) stays in `utils/project-data.ts`; this adds
 * the write-up.
 *
 * Facts come from the project's public README, its live site or the existing
 * portfolio description. Where no public source exists, the page explains the
 * technique involved instead of inventing results.
 */
export type ProjectDetail = {
  /** Must match a `slug` in `utils/project-data.ts`. */
  slug: string;
  /** Two or three sentences that open the page, with the main keyword first. */
  summary: string;
  /** Primary search phrase for the page. */
  focusKeyword: string;
  stack: string[];
  blocks: PostBlock[];
  /** Role page slug (e.g. `ai-engineer`) this project evidences. */
  role: string;
  /** Related blog guide slugs. */
  guides: string[];
  faqs: PostFaq[];
};
