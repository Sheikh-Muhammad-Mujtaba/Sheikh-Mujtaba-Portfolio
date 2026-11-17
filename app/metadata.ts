import type { Metadata } from "next";

import { socialMetadata } from "../utils/seo";

const siteUrl = "https://sheikhmujtaba.me";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Sheikh Mujtaba (Mujtaba Javed) | AI Security Engineer",
    template: "%s | Sheikh Mujtaba",
  },

  description:
    "Portfolio of Sheikh Mujtaba (Mujtaba Javed), an AI Security Engineer and AI Developer specializing in AI red teaming, agentic AI systems, RAG pipelines and secure-by-design architecture.",

  keywords: [
    "AI Developer",
    "Security Engineer",
    "Machine Learning Engineer",
    "Agentic AI",
    "RAG Pipeline",
    "Multi-Agent Systems",
    "Cybersecurity",
    "Full Stack Developer",
    "Next.js Developer",
    "Python Developer",
    "FastAPI",
    "LLM Integration",
    "GPT-4",
    "Claude",
    "Gemini",
    "Qdrant",
    "PostgreSQL",
    "Portfolio",
    "Software Engineer",
  ],

  authors: [{ name: "Sheikh Mujtaba", url: siteUrl }],

  creator: "Sheikh Mujtaba",

  publisher: "Sheikh Mujtaba",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },

  ...socialMetadata({
    url: `${siteUrl}/`,
    title: "Sheikh Mujtaba (Mujtaba Javed) | AI Security Engineer & AI Developer",
    description:
      "AI Security Engineer and AI Developer: AI red teaming, prompt injection testing, secure AI agents, RAG pipelines and ERPNext automation.",
  }),

  // Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the real token.
  // The literal placeholder used to be published as a meta tag.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),

  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

// Helper to generate project page metadata
export function generateProjectMetadata(
  name: string,
  description: string,
  slug: string,
  type: string
): Metadata {
  const title = `${name} - ${type}`;
  const url = `${siteUrl}/#${slug}`;

  return {
    title,
    description,
    keywords: [name, type, "AI Project", "Portfolio Project"],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: `/images/${slug}.avif`,
          width: 1200,
          height: 630,
          alt: `${name} project screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/images/${slug}.avif`],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Page-specific metadata exports
export const aboutPageMetadata: Metadata = {
  title: "About - Sheikh Mujtaba | AI Developer & Security Engineer",
  description:
    "Learn about Sheikh Mujtaba, an AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, and secure-by-design architecture.",
  keywords: [
    "Sheikh Mujtaba",
    "AI Developer Pakistan",
    "Security Engineer",
    "Agentic AI expert",
    "RAG pipeline architect",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export const servicesPageMetadata: Metadata = {
  title: "Services - AI Development | Sheikh Mujtaba",
  description:
    "AI development services: agentic AI systems, RAG pipeline architecture, security engineering and full-stack development. Custom proposals with clear timelines.",
  keywords: [
    "AI development services",
    "Agentic AI development",
    "RAG pipeline services",
    "hire AI developer",
    "AI consulting",
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export const faqPageMetadata: Metadata = {
  title: "FAQ - AI Development & Security Engineering | Sheikh Mujtaba",
  description:
    "Frequently asked questions about Agentic AI, RAG pipelines, AI agent development services, security engineering, and working with Sheikh Mujtaba.",
  keywords: [
    "Agentic AI FAQ",
    "RAG pipeline FAQ",
    "AI development questions",
    "hire AI developer FAQ",
  ],
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};
