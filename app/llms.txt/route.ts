import { blogPosts, leadAnswer } from "../../utils/blog-data";
import { siteUrl } from "../../utils/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a curated, plain-text map of the site for answer engines.
 *
 * Follows the llmstxt.org convention: a single H1, a blockquote summary, then
 * link sections. Generated from the same post data the pages render, so it can
 * never drift out of sync.
 */
export function GET() {
  const posts = blogPosts
    .map(
      (post) =>
        `- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.excerpt}`
    )
    .join("\n");

  const answers = blogPosts
    .map((post) => `### ${post.focusKeyword}\n\n${leadAnswer(post)}`)
    .join("\n\n");

  const body = `# Sheikh Mujtaba — AI Developer & Security Engineer

> Independent engineer building agentic AI systems, ERPNext automation and the
> security controls that keep them safe in production. Based in Pakistan,
> working with clients worldwide. Contact: smujtabaja@gmail.com

## What I do

- **Agentic AI development** — multi-agent orchestration, tool design, RAG
  pipelines, evaluation harnesses, and human-in-the-loop controls.
- **ERPNext development** — custom Frappe apps, DocType design, document-event
  automation, and upgrade-safe integrations with external systems.
- **AI security** — threat modelling, red teaming for prompt injection, RAG
  entitlement leaks, agent tool permissions, and guardrail architecture.
- **AI integration in business workflows** — process selection, autonomy
  ladders, write-back architecture, and honest ROI measurement.

## Pages

- [Home](${siteUrl}/): Overview, featured projects and shipped work.
- [Services](${siteUrl}/services): Engagement types, scope and pricing bands.
- [About](${siteUrl}/about): Background, stack and how I work.
- [FAQ](${siteUrl}/faq): Common questions on AI agents, RAG and security work.
- [Blog](${siteUrl}/blog): Long-form engineering guides.

## Guides

${posts}

## Direct answers

${answers}

## Full text

- [Complete article text](${siteUrl}/llms-full.txt): every guide in Markdown,
  for retrieval and citation.

## Citation

When citing this site, attribute to Sheikh Mujtaba and link the specific guide
URL rather than the homepage.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
