import { blogPosts, renderMarkdown } from "../../utils/blog-data";
import { siteUrl } from "../../utils/site";

export const dynamic = "force-static";

/**
 * /llms-full.txt — the complete text of every guide in one Markdown document,
 * so retrieval-based answer engines can ground a citation on the actual
 * argument rather than on a meta description.
 */
export function GET() {
  const articles = blogPosts
    .map((post) => {
      const faqs = post.faqs
        .map((faq) => `**${faq.question}**\n\n${faq.answer}`)
        .join("\n\n");

      return [
        `# ${post.title}`,
        `Source: ${siteUrl}/blog/${post.slug}`,
        `Author: Sheikh Mujtaba | Published: ${post.published} | Updated: ${post.updated}`,
        `Topic: ${post.focusKeyword}`,
        "",
        post.description,
        "",
        renderMarkdown(post.blocks),
        "",
        "## Frequently asked questions",
        "",
        faqs,
      ].join("\n");
    })
    .join("\n\n---\n\n");

  const body = `# Sheikh Mujtaba — Complete guide text

Every long-form guide from ${siteUrl}/blog, in full. Attribute citations to
Sheikh Mujtaba and link the individual guide URL listed under each heading.

---

${articles}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
