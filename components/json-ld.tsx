export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sheikh Mujtaba",
    url: "https://sheikmujtaba.me",
    email: "smujtabaja@gmail.com",
    jobTitle: "AI Developer & Security Engineer",
    description: "Building secure AI agents, ERPNext automation, and digital FTE solutions",
    image: "https://sheikmujtaba.me/opengraph-image.png",
    sameAs: [
      "https://github.com/Sheikh-Muhammad-Mujtaba",
      "https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/",
      "https://medium.com/@smujtabaja",
      "https://linktr.ee/s.m.mujtabajaved",
    ],
    knowsAbout: [
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
    worksFor: {
      "@type": "Organization",
      name: "Self Employed",
    },
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
    name: "Sheikh Mujtaba Portfolio",
    url: "https://sheikmujtaba.me",
    description:
      "AI Developer & Security Engineer specializing in Agentic AI, ERPNext automation, and digital FTE solutions",
    creator: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sheikmujtaba.me/search?q={search_term_string}",
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
    name: "Sheikh Mujtaba - AI & Security Services",
    url: "https://sheikmujtaba.me",
    description:
      "Professional AI development, ERPNext automation, and cybersecurity services",
    areaServed: {
      "@type": "GeoShape",
      name: "Worldwide",
    },
    priceRange: "$$",
    image: "https://sheikmujtaba.me/opengraph-image.png",
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
    founder: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
    },
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
