import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogContent from "../../../components/blog-content";
import Header from "../../../components/header";
import { BreadcrumbJsonLd } from "../../../components/json-ld";
import styles from "../../../styles/blog.module.scss";
import {
  blogPosts,
  getPost,
  getRelated,
  keyTakeaways,
  leadAnswer,
  tableOfContents,
  type BlogPost,
} from "../../../utils/blog-data";
import { authorRef, ids, siteUrl, topicFor } from "../../../utils/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: "Sheikh Mujtaba", url: siteUrl }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: ["Sheikh Mujtaba"],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function ArticleJsonLd({ post }: { post: BlogPost }) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const related = getRelated(post);

  const topic = topicFor(post.focusKeyword);

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    alternativeHeadline: post.heading ?? post.title,
    description: post.description,
    // The opening paragraph, verbatim: the passage an answer engine should
    // lift when it quotes this page.
    abstract: leadAnswer(post),
    url,
    datePublished: post.published,
    dateModified: post.updated,
    keywords: post.keywords.join(", "),
    articleSection: post.focusKeyword,
    timeRequired: `PT${post.readingMinutes}M`,
    wordCount: post.blocks.reduce((total, block) => {
      const text =
        "text" in block
          ? block.text
          : "items" in block
            ? block.items.join(" ")
            : "";
      return total + text.split(/\s+/).filter(Boolean).length;
    }, 0),
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
      ...authorRef,
      jobTitle: "AI Developer & Security Engineer",
      knowsAbout: post.keywords,
    },
    publisher: authorRef,
    isPartOf: { "@type": "Blog", "@id": ids.blog },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // Entity disambiguation: pins the subject to a Wikipedia/Wikidata node so
    // "agent" or "security" is not read as the generic sense of the word.
    ...(topic ? { about: topic } : {}),
    mentions: post.keywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
    citation: related.map((item) => ({
      "@type": "BlogPosting",
      name: item.title,
      url: `${siteUrl}/blog/${item.slug}`,
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]"],
    },
    image: `${siteUrl}/opengraph-image.png`,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: "en",
    isPartOf: { "@type": "WebPage", "@id": url },
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        url: `${url}#faq-heading`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(article).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faq).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const toc = tableOfContents(post);
  const related = getRelated(post);
  const takeaways = keyTakeaways(post);

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
          { name: post.heading ?? post.title, url: `${siteUrl}/blog/${post.slug}` },
        ]}
      />
      <Header logoLink="/" floating />
      <main className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{post.focusKeyword}</span>
          </nav>

          <header className={styles.articleHeader}>
            <p className={styles.eyebrow}>{post.focusKeyword}</p>
            <h1>{post.heading ?? post.title}</h1>
            <p className={styles.lead} data-speakable>
              {post.description}
            </p>
            <p className={styles.meta} style={{ marginTop: "1rem" }}>
              <span>Sheikh Mujtaba</span>
              <span className={styles.metaDot} aria-hidden="true">
                &bull;
              </span>
              <time dateTime={post.updated}>
                Updated {dateFormat.format(new Date(post.updated))}
              </time>
              <span className={styles.metaDot} aria-hidden="true">
                &bull;
              </span>
              <span>{post.readingMinutes} min read</span>
            </p>
          </header>

          <div className={styles.article}>
            <div>
              {takeaways.length > 0 && (
                <section className={styles.summary} aria-labelledby="summary-heading">
                  <h2 id="summary-heading">The short answer</h2>
                  <p data-speakable>{leadAnswer(post)}</p>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              <BlogContent blocks={post.blocks} />

              <section className={styles.faq} aria-labelledby="faq-heading">
                <h2 id="faq-heading">Frequently asked questions</h2>
                {post.faqs.map((item) => (
                  <div key={item.question} className={styles.faqItem}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </section>

              {related.length > 0 && (
                <section className={styles.related} aria-labelledby="related-heading">
                  <h2 id="related-heading">Related guides</h2>
                  <div className={styles.relatedGrid}>
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        className={styles.relatedCard}
                      >
                        <strong>{item.heading ?? item.title}</strong>
                        <span>{item.excerpt}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <section className={styles.cta}>
                <h2>Working on something like this?</h2>
                <p>
                  I build agentic AI systems, ERPNext automation and the security
                  controls that keep them safe in production. Tell me what the
                  workflow is and I will tell you honestly whether AI belongs in it.
                </p>
                <div className={styles.ctaRow}>
                  <a href="mailto:smujtabaja@gmail.com" className="btn-primary">
                    Email Me
                  </a>
                  <Link href="/services" className="btn-secondary">
                    View Services
                  </Link>
                </div>
              </section>
            </div>

            <aside className={styles.toc} aria-label="On this page">
              <p>On this page</p>
              <ol>
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`}>{entry.text}</a>
                  </li>
                ))}
                <li>
                  <a href="#faq-heading">Frequently asked questions</a>
                </li>
              </ol>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
