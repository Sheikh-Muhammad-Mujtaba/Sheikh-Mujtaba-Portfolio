/** Single source of truth for absolute URLs in metadata, sitemap and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sheikhmujtaba.me";

export const siteName = "Sheikh Mujtaba — AI Developer & Security Engineer";

export const authorName = "Sheikh Mujtaba";

/**
 * Every name the author is known by. Search engines only merge these into one
 * person when they appear together on the same entity, so every Person
 * JSON-LD block on the site uses this exact list.
 */
export const authorAlternateNames = [
  "Mujtaba Javed",
  "Sheikh Mujtaba Javed",
  "Sheikh Muhammad Mujtaba Javed",
  "Sheikh M. Mujtaba Javed",
  "Muhammad Mujtaba",
];

export const authorJobTitle = "AI Security Engineer & AI Developer";

export const authorImage = `${siteUrl}/images/ProfileImage.jpeg`;

export const authorTwitterUrl = "https://x.com/Mujtaba_Javed_";

/** Profiles that are verifiably the same person — the strongest identity signal. */
export const authorSameAs = [
  authorTwitterUrl,
  "https://github.com/Sheikh-Muhammad-Mujtaba",
  "https://www.linkedin.com/in/sheikhmujtaba/",
  "https://medium.com/@smujtabaja",
  "https://linktr.ee/s.m.mujtabajaved",
];

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

const wiki = (page: string) => `https://en.wikipedia.org/wiki/${page}`;

// Security-cluster posts. Wikipedia URLs verified to resolve; reuses the
// Wikidata IDs above where the entity is the same.
Object.assign(topicEntities, {
  "AI security engineer": topicEntities["AI security"],
  "how to become an AI security engineer": topicEntities["AI security"],
  "prompt injection": { name: "Prompt injection", sameAs: [wiki("Prompt_injection")] },
  "OWASP Top 10 for LLM applications": { name: "OWASP", sameAs: [wiki("OWASP")] },
  "MCP security": { name: "Model Context Protocol", sameAs: [wiki("Model_Context_Protocol")] },
  "AI agent security": topicEntities["agentic AI development"],
  "AI red teaming": { name: "Red team", sameAs: [wiki("Red_team")] },
  "RAG security": { name: "Retrieval-augmented generation", sameAs: [wiki("Retrieval-augmented_generation")] },
  "LLM guardrails": { name: "Large language model", sameAs: [wiki("Large_language_model")] },
  "ERPNext security": topicEntities["ERPNext development"],
});

export function topicFor(focusKeyword: string) {
  const entity = topicEntities[focusKeyword];
  if (!entity) return undefined;
  return {
    "@type": "Thing",
    name: entity.name,
    sameAs: entity.sameAs,
  };
}
