import type { BlogPost, PostBlock } from "./blog-types";
import { erpnextDevelopment } from "../data/posts/erpnext-development";
import { agenticAiDevelopment } from "../data/posts/agentic-ai-development";
import { aiSecurity } from "../data/posts/ai-security";
import { aiIntegrationInBusinessWorkflows } from "../data/posts/ai-integration-in-business-workflows";

export type { BlogPost, PostBlock, PostFaq } from "./blog-types";

export { siteUrl } from "./site";

const NL = "\n";

/** Newest first — the index and the sitemap both read this order. */
export const blogPosts: BlogPost[] = [
  aiIntegrationInBusinessWorkflows,
  aiSecurity,
  agenticAiDevelopment,
  erpnextDevelopment,
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelated(post: BlogPost): BlogPost[] {
  return post.related
    .map((slug) => getPost(slug))
    .filter((related): related is BlogPost => Boolean(related));
}

/** Slugified anchor for an H2, shared by the heading and the table of contents. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function tableOfContents(post: BlogPost) {
  return post.blocks
    .filter((block) => block.type === "h2")
    .map((block) => ({
      id: headingId((block as { text: string }).text),
      text: (block as { text: string }).text,
    }));
}

/** Strips the inline syntax so a string can go into plain text or JSON-LD. */
export function stripInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

/** Markdown rendering of a post body, used by /llms-full.txt. */
export function renderMarkdown(blocks: PostBlock[]): string {
  const out: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        out.push(`## ${block.text}`);
        break;
      case "h3":
        out.push(`### ${block.text}`);
        break;
      case "p":
        out.push(stripInline(block.text));
        break;
      case "ul":
        out.push(block.items.map((item) => `- ${stripInline(item)}`).join(NL));
        break;
      case "ol":
        out.push(
          block.items
            .map((item, n) => `${n + 1}. ${stripInline(item)}`)
            .join(NL)
        );
        break;
      case "code":
        out.push(["```" + block.lang, block.code, "```"].join(NL));
        break;
      case "callout":
        out.push(`> **${block.title}** — ${stripInline(block.text)}`);
        break;
      case "table":
        out.push(
          [
            `| ${block.head.join(" | ")} |`,
            `| ${block.head.map(() => "---").join(" | ")} |`,
            ...block.rows.map(
              (row) => `| ${row.map((cell) => stripInline(cell)).join(" | ")} |`
            ),
          ].join(NL)
        );
        break;
    }
  }

  return out.join(NL + NL);
}

/** First paragraph of a post — the extractable "direct answer" for AEO. */
export function leadAnswer(post: BlogPost): string {
  const first = post.blocks.find((block) => block.type === "p");
  return first ? stripInline((first as { text: string }).text) : post.description;
}

/** The trailing "Key takeaways" list, surfaced as a summary block. */
export function keyTakeaways(post: BlogPost): string[] {
  const index = post.blocks.findIndex(
    (block) => block.type === "h2" && /key takeaways/i.test(block.text)
  );
  if (index === -1) return [];

  const next = post.blocks[index + 1];
  return next && next.type === "ul" ? next.items.map(stripInline) : [];
}
