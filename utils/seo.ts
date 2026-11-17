import type { Metadata } from "next";

import { siteName, siteUrl } from "./site";

export const twitterHandle = "@Mujtaba_Javed_";

/** Served by app/opengraph-image.tsx. */
export const defaultOgImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Sheikh Mujtaba (Mujtaba Javed) - AI Security Engineer & AI Developer",
} as const;

type OgImage = { url: string; width: number; height: number; type: string; alt: string };

type SocialInput = {
  /** Absolute canonical URL of the page. */
  url: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  image?: OgImage;
  /** Extra article fields (publishedTime, tags, …). */
  article?: {
    publishedTime: string;
    modifiedTime: string;
    authors: string[];
    tags: string[];
  };
};

/**
 * Next.js merges metadata *shallowly*: a page that sets `openGraph` replaces
 * the layout's whole object, images included. That is why every page except
 * the homepage shipped without `og:image`. Building both objects here
 * guarantees each page has a full, absolute card.
 */
export function socialMetadata({
  url,
  title,
  description,
  type = "website",
  image = defaultOgImage,
  article,
}: SocialInput): Pick<Metadata, "openGraph" | "twitter"> {
  const base = {
    url,
    title,
    description,
    siteName,
    locale: "en_US",
    images: [image],
  };

  return {
    openGraph: article ? { ...base, type: "article", ...article } : { ...base, type },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle,
      creator: twitterHandle,
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
