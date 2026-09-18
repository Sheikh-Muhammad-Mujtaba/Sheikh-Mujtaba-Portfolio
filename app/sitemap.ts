import type { MetadataRoute } from "next";

import { blogPosts } from "../utils/blog-data";
import { siteUrl } from "../utils/site";

/**
 * Every `<loc>` must be an indexable URL at or below the sitemap's own
 * location (`/sitemap.xml`), otherwise Search Console rejects it with
 * "URL not allowed":
 *
 * - The home entry needs the trailing slash. Google compares the loc against
 *   the sitemap's directory literally, and a bare `https://host` has no path
 *   to compare.
 * - Fragment URLs (`/#about`, `/#projects`) are not separate documents. Google
 *   strips the fragment, so they were only duplicate home-page entries.
 *   In-page sections are discovered by crawling the home page itself.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts,
  ];
}
