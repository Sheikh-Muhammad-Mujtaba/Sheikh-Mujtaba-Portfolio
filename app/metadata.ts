import type { Metadata } from "next";

const siteUrl = "https://sheikhmujtaba.me";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Sheikh Mujtaba | AI Developer & Security Engineer",
    template: "%s | Sheikh Mujtaba",
  },

  description:
    "Portfolio of Sheikh Mujtaba, an AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, multi-agent orchestration, and secure-by-design architecture.",

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sheikh Mujtaba Portfolio",
    title: "Sheikh Mujtaba | AI Developer & Security Engineer",
    description:
      "AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, and secure-by-design architecture.",
    images: [
      {
        // Use the dynamic Open Graph image route which generates the image server-side
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sheikh Mujtaba - AI Developer & Security Engineer",
      },
      {
        url: "/Logo.avif",
        width: 500,
        height: 500,
        alt: "Mujtaba Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Mujtaba | AI Developer & Security Engineer",
    description:
      "AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, and secure-by-design architecture.",
    creator: "@smujtabaja",
    images: ["/opengraph-image"],
  },

  verification: {
    google: "your-google-verification-code",
  },

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
  title: "Services & Pricing - AI Development | Sheikh Mujtaba",
  description:
    "Professional AI development services: Agentic AI systems, RAG pipeline architecture, Security engineering, Full-stack development. Transparent pricing.",
  keywords: [
    "AI development services",
    "Agentic AI pricing",
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
