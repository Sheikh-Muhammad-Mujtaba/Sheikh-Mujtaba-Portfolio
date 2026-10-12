import { blogPosts } from "../../utils/blog-data";
import { authorEmail, authorName, siteUrl } from "../../utils/site";

// Advertised in app/metadata.ts (alternates.types) — previously a 404.
export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );
  const lastBuild = posts.reduce(
    (latest, post) => Math.max(latest, new Date(post.updated).getTime()),
    0
  );

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.published).toUTCString()}</pubDate>
      <author>${authorEmail} (${escapeXml(authorName)})</author>
      <category>${escapeXml(post.focusKeyword)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${authorName} — Engineering Notes`)}</title>
    <link>${siteUrl}/blog</link>
    <description>Notes on agentic AI, RAG pipelines, AI security and ERPNext automation.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(lastBuild || Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
