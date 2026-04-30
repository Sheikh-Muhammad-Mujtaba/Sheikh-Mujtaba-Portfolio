"use client";

import Script from "next/script";

// Person Schema for Sheikh Mujtaba
export function PersonJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sheikh Mujtaba Javed",
    alternateName: "Sheikh Mujtaba",
    url: "https://sheikhmujtaba.me",
    image: "https://sheikhmujtaba.me/images/ProfileImage.jpeg",
    jobTitle: "AI Developer & Security Engineer",
    description:
      "AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, multi-agent orchestration, and secure-by-design architecture.",
    worksFor: {
      "@type": "Organization",
      name: "Tech Accuracy",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Agentic AI",
      "RAG (Retrieval Augmented Generation)",
      "Cybersecurity",
      "Web Application Security",
      "Next.js",
      "FastAPI",
      "Python",
      "TypeScript",
      "LLM Integration",
      "Multi-Agent Systems",
      "Penetration Testing",
      "AI Red Teaming",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Self-taught & Industry Certified",
    },
    sameAs: [
      "https://github.com/Sheikh-Muhammad-Mujtaba",
      "https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/",
      "https://linktr.ee/s.m.mujtabajaved",
      "https://medium.com/@smujtabaja",
    ],
    email: "mailto:smujtabaja@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// WebSite Schema
export function WebSiteJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sheikh Mujtaba Portfolio",
    url: "https://sheikhmujtaba.me",
    description:
      "Portfolio and blog of Sheikh Mujtaba, showcasing AI development and security engineering projects.",
    author: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
      url: "https://sheikhmujtaba.me",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sheikhmujtaba.me/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    copyrightYear: new Date().getFullYear(),
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// ProfessionalService Schema
export function ProfessionalServiceJsonLd() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sheikh Mujtaba - AI & Security Engineering Services",
    description:
      "Professional AI development and security engineering services including RAG pipeline architecture, multi-agent systems, web application security, and AI automation.",
    url: "https://sheikhmujtaba.me",
    provider: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
      url: "https://sheikhmujtaba.me",
    },
    areaServed: {
      "@type": "Place",
      name: "Global - Remote Services",
    },
    serviceType: [
      "AI Development",
      "Security Engineering",
      "Web Development",
      "LLM Integration",
      "RAG Pipeline Architecture",
      "Multi-Agent System Design",
      "Cybersecurity Consulting",
    ],
    priceRange: "$$",
    knowsAbout: [
      "OpenAI Agents SDK",
      "Gemini SDK",
      "Claude API",
      "FastAPI",
      "Next.js",
      "Qdrant",
      "PostgreSQL",
      "Python",
      "TypeScript",
      "Penetration Testing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Agent Development",
            description:
              "Build autonomous AI agents with multi-agent orchestration using OpenAI, Gemini, and Claude APIs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RAG Pipeline Architecture",
            description:
              "Design and implement production-grade RAG systems with Qdrant vector database and PostgreSQL",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Security Engineering",
            description:
              "Web application security assessment, penetration testing, and AI red teaming services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Development",
            description:
              "Build modern web applications with Next.js, FastAPI, and secure-by-design architecture",
          },
        },
      ],
    },
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// BlogPosting Schema for individual blog posts
export function BlogPostingJsonLd({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    datePublished: date,
    author: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
      url: "https://sheikhmujtaba.me",
    },
    publisher: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
      url: "https://sheikhmujtaba.me",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  return (
    <Script
      id="blog-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// CreativeWork Schema for portfolio projects
export function ProjectJsonLd({
  name,
  description,
  slug,
  type,
  codeUrl,
  demoUrl,
}: {
  name: string;
  description: string;
  slug: string;
  type: string;
  codeUrl?: string;
  demoUrl?: string;
}) {
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: name,
    description: description,
    url: `https://sheikhmujtaba.me/#${slug}`,
    image: `https://sheikhmujtaba.me/images/${slug}.png`,
    creator: {
      "@type": "Person",
      name: "Sheikh Mujtaba",
      url: "https://sheikhmujtaba.me",
    },
    genre: type,
    codeRepository: codeUrl,
    isAccessibleForFree: true,
    inLanguage: "en-US",
    ...(demoUrl && { potentialAction: {
      "@type": "ViewAction",
      target: demoUrl,
    }}),
  };

  return (
    <Script
      id={`project-schema-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
