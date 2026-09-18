import type { MetadataRoute } from "next";

import { siteUrl } from "../utils/site";

/**
 * `/_next/` is deliberately crawlable.
 *
 * Google had already indexed build asset URLs such as
 * `/_next/static/media/*.avif` and `*.woff2`. A robots.txt `Disallow` does not
 * remove those — a blocked URL stays in the index as an untitled entry, because
 * the crawler is never allowed to fetch it and discover a noindex. Letting
 * Googlebot fetch them so it sees the `X-Robots-Tag: noindex` header set in
 * `next.config.mjs` is what actually drops them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Answer engines: explicitly welcome, so the site can be cited.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Bingbot",
          "Applebot",
          "Applebot-Extended",
          "DuckAssistBot",
          "cohere-ai",
          "YouBot",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
      // Bulk training scrapers with no citation benefit.
      {
        userAgent: ["CCBot", "Bytespider", "Amazonbot", "Omgilibot"],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
