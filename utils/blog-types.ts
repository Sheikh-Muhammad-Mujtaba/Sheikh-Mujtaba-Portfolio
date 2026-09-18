/**
 * Block-level content model for long-form posts.
 *
 * Text fields accept a tiny inline syntax rendered by `components/blog-content`:
 * `[label](/href)` for links, `**bold**`, and backtick-wrapped `code`. Keeping
 * posts as data rather than MDX means one source feeds the page, the table of
 * contents and the Article/FAQ JSON-LD without duplicating content.
 */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type PostFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  /** SEO title, used for <title> and OpenGraph. */
  title: string;
  /** Shorter on-page H1. Falls back to `title`. */
  heading?: string;
  description: string;
  /** Primary keyword this post targets, shown as the eyebrow label. */
  focusKeyword: string;
  keywords: string[];
  published: string;
  updated: string;
  readingMinutes: number;
  /** One-line hook for the index card. */
  excerpt: string;
  blocks: PostBlock[];
  faqs: PostFaq[];
  /** Slugs of related posts, rendered as an internal-link cluster. */
  related: string[];
};
