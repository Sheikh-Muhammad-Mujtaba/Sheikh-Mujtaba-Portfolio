import {
  authorAlternateNames,
  authorEmail,
  authorImage,
  authorJobTitle,
  authorName,
  authorSameAs,
  ids,
  siteUrl,
} from "../utils/site";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ids.person,
    name: authorName,
    alternateName: authorAlternateNames,
    givenName: "Mujtaba",
    familyName: "Javed",
    url: siteUrl,
    email: authorEmail,
    jobTitle: authorJobTitle,
    description:
      "Sheikh Mujtaba (Mujtaba Javed) is an AI Security Engineer and AI Developer who builds secure AI agents, RAG pipelines and ERPNext automation, and red-teams LLM applications.",
    image: authorImage,
    sameAs: authorSameAs,
    homeLocation: { "@type": "Country", name: "Pakistan" },
    knowsAbout: [
      "AI Security",
      "LLM Security",
      "AI Red Teaming",
      "Prompt Injection",
      "MCP Security",
      "Agentic AI",
      "RAG Pipeline",
      "LLM Integration",
      "ERPNext",
      "Digital FTE",
      "Business Automation",
      "Cybersecurity",
      "Full-Stack Development",
      "FastAPI",
      "Next.js",
      "Python",
      "TypeScript",
    ],
    // Matches the About page and the homepage experience list.
    worksFor: {
      "@type": "Organization",
      name: "Tech Accuracy",
      url: "https://techaccuracy.com",
    },
    mainEntityOfPage: { "@type": "WebSite", "@id": ids.website },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    name: "Sheikh Mujtaba Portfolio",
    url: siteUrl,
    inLanguage: "en",
    description:
      "AI Developer & Security Engineer specializing in Agentic AI, ERPNext automation, and digital FTE solutions",
    creator: { "@type": "Person", "@id": ids.person },
    publisher: { "@type": "Person", "@id": ids.person },
    hasPart: { "@type": "Blog", "@id": ids.blog },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfessionalServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ids.service,
    name: "Sheikh Mujtaba - AI & Security Services",
    url: siteUrl,
    description:
      "Professional AI development, ERPNext automation, and cybersecurity services",
    areaServed: {
      "@type": "GeoShape",
      name: "Worldwide",
    },
    priceRange: "$$",
    image: `${siteUrl}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Pakistan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Work",
      email: "smujtabaja@gmail.com",
      contactOption: "TollFree",
    },
    founder: { "@type": "Person", "@id": ids.person },
    provider: { "@type": "Person", "@id": ids.person },
    award: [
      "Expert in Agentic AI Systems",
      "ERPNext Specialist",
      "Full-Stack Developer",
      "Security Engineer",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "AI Agent Development",
        description: "Building autonomous AI systems for business automation",
      },
      {
        "@type": "Offer",
        name: "ERPNext Solutions",
        description: "Custom ERPNext implementations and automation",
      },
      {
        "@type": "Offer",
        name: "Digital FTE Automation",
        description: "Automating business processes to reduce costs",
      },
      {
        "@type": "Offer",
        name: "Security Engineering",
        description: "Web app penetration testing and security consulting",
      },
      {
        "@type": "Offer",
        name: "Full-Stack Development",
        description: "Building scalable web applications",
      },
      {
        "@type": "Offer",
        name: "LLM Integration",
        description: "Integrating OpenAI, Gemini, and Claude APIs",
      },
      {
        "@type": "Offer",
        name: "RAG Pipeline Development",
        description: "Creating knowledge-grounded AI systems",
      },
      {
        "@type": "Offer",
        name: "Business Automation",
        description: "Workflow automation using n8n and Python",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
