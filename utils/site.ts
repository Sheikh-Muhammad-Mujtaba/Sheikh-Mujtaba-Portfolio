/** Single source of truth for absolute URLs in metadata, sitemap and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sheikhmujtaba.me";

export const siteName = "Sheikh Mujtaba — AI Developer & Security Engineer";

export const authorName = "Sheikh Mujtaba";

export const authorEmail = "smujtabaja@gmail.com";

/**
 * Stable `@id`s so every JSON-LD block on the site describes the *same*
 * entities instead of repeating anonymous copies. Answer engines resolve the
 * graph through these, which is what lets a Person, a Service and an Article
 * reinforce each other rather than compete.
 */
export const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  service: `${siteUrl}/#service`,
  blog: `${siteUrl}/blog#blog`,
} as const;

export const authorRef = {
  "@type": "Person",
  "@id": ids.person,
  name: authorName,
  url: siteUrl,
} as const;

/**
 * Topic entities with Wikipedia/Wikidata `sameAs` links. Answer engines use
 * these to disambiguate what a page is actually about — "agent" and "security"
 * are hopelessly overloaded terms without them.
 */
export const topicEntities: Record<string, { name: string; sameAs: string[] }> = {
  "ERPNext development": {
    name: "ERPNext",
    sameAs: [
      "https://en.wikipedia.org/wiki/ERPNext",
      "https://www.wikidata.org/wiki/Q28130619",
    ],
  },
  "agentic AI development": {
    name: "Intelligent agent",
    sameAs: [
      "https://en.wikipedia.org/wiki/Intelligent_agent",
      "https://www.wikidata.org/wiki/Q1142726",
    ],
  },
  "AI security": {
    name: "Computer security",
    sameAs: [
      "https://en.wikipedia.org/wiki/Computer_security",
      "https://www.wikidata.org/wiki/Q3510521",
    ],
  },
  "AI integration in business workflows": {
    name: "Business process automation",
    sameAs: [
      "https://en.wikipedia.org/wiki/Business_process_automation",
      "https://www.wikidata.org/wiki/Q4979031",
    ],
  },
};

export function topicFor(focusKeyword: string) {
  const entity = topicEntities[focusKeyword];
  if (!entity) return undefined;
  return {
    "@type": "Thing",
    name: entity.name,
    sameAs: entity.sameAs,
  };
}
