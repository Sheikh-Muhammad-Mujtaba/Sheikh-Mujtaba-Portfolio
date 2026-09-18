import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/header";
import { BreadcrumbJsonLd } from "../../components/json-ld";
import styles from "../../styles/blog.module.scss";
import { blogPosts, leadAnswer } from "../../utils/blog-data";
import { authorRef, ids, siteUrl } from "../../utils/site";

export const metadata: Metadata = {
  title:
    "Engineering Notes: ERPNext, Agentic AI, AI Security & Workflow Automation",
  description:
    "In-depth guides on ERPNext development, agentic AI development, AI security and AI integration in business workflows — written from production implementations, not demos.",
  keywords: [
    "ERPNext development blog",
    "agentic AI development guide",
    "AI security guide",
    "AI integration in business workflows",
    "AI automation blog",
    "Sheikh Mujtaba blog",
  ],
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Engineering Notes — ERPNext, Agentic AI & AI Security",
    description:
      "Long-form guides on ERPNext development, agentic AI architecture, AI security and business workflow automation.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function BlogIndexJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": ids.blog,
    name: "Sheikh Mujtaba — Engineering Notes",
    description:
      "Guides on ERPNext development, agentic AI development, AI security and AI integration in business workflows.",
    url: `${siteUrl}/blog`,
    inLanguage: "en",
    author: authorRef,
    publisher: authorRef,
    isPartOf: { "@type": "WebSite", "@id": ids.website },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.published,
      dateModified: post.updated,
      keywords: post.keywords.join(", "),
      abstract: leadAnswer(post),
      author: authorRef,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function BlogIndexPage() {
  return (
    <>
      <BlogIndexJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
        ]}
      />
      <Header logoLink="/" floating />
      <main className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Blog</span>
          </nav>

          <header className={styles.indexHeader}>
            <p className={styles.eyebrow}>Engineering Notes</p>
            <h1>Field notes from production AI and ERP work</h1>
            <p className={styles.indexLead}>
              Long-form guides on ERPNext development, agentic AI architecture,
              AI security and AI integration in business workflows. Written from
              systems that shipped and stayed running — including the parts that
              went wrong.
            </p>
          </header>

          <div className={styles.postGrid}>
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.postCard}
              >
                <p className={styles.eyebrow}>{post.focusKeyword}</p>
                <h2>{post.title}</h2>
                <p className={styles.postCardExcerpt}>{post.excerpt}</p>
                <p className={styles.meta}>
                  <time dateTime={post.updated}>
                    {dateFormat.format(new Date(post.updated))}
                  </time>
                  <span className={styles.metaDot} aria-hidden="true">
                    &bull;
                  </span>
                  <span>{post.readingMinutes} min read</span>
                </p>
                <p className={styles.cardCta}>Read the guide &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
