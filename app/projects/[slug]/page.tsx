import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogContent from "../../../components/blog-content";
import Header from "../../../components/header";
import { BreadcrumbJsonLd } from "../../../components/json-ld";
import styles from "../../../styles/blog.module.scss";
import projectStyles from "../../../styles/project-detail.module.scss";
import { getPost, type BlogPost } from "../../../utils/blog-data";
import {
  getProjectPage,
  projectPages,
  relatedProjects,
  type ProjectPage,
} from "../../../utils/project-details";
import { getRole } from "../../../utils/role-data";
import { socialMetadata } from "../../../utils/seo";
import { authorEmail, authorName, ids, siteUrl } from "../../../utils/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Only projects with a write-up get a page; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projectPages.map((page) => ({ slug: page.slug }));
}

function pageTitle(page: ProjectPage): string {
  return `${page.name} | ${page.type} Project by Sheikh Mujtaba`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProjectPage(slug);

  if (!page) return { title: "Project not found" };

  const url = `${siteUrl}/projects/${page.slug}`;
  const title = pageTitle(page);
  const description = page.detail.summary;

  return {
    title: { absolute: title },
    description,
    keywords: [page.detail.focusKeyword, page.name, ...page.detail.stack, `${authorName} projects`],
    alternates: { canonical: url },
    ...socialMetadata({
      url,
      title,
      description,
      type: "article",
      image: {
        url: `${url}/opengraph-image`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${page.name} — project by Sheikh Mujtaba`,
      },
    }),
  };
}

function ProjectJsonLd({ page }: { page: ProjectPage }) {
  const url = `${siteUrl}/projects/${page.slug}`;

  const project = {
    "@context": "https://schema.org",
    "@type": page.code ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${url}#project`,
    name: page.name,
    url,
    description: page.detail.summary,
    author: { "@id": ids.person },
    creator: { "@id": ids.person },
    isPartOf: { "@id": ids.website },
    keywords: page.detail.stack.join(", "),
    ...(page.code ? { codeRepository: page.code } : {}),
    ...(page.link ? { sameAs: page.link } : {}),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: page.detail.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {[project, faq].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

function ProjectLinks({ page }: { page: ProjectPage }) {
  if (!page.link && !page.code) return null;

  return (
    <div className={styles.ctaRow}>
      {page.link ? (
        <a href={page.link} target="_blank" rel="noopener" className="btn-primary">
          Live demo
        </a>
      ) : null}
      {page.code ? (
        <a href={page.code} target="_blank" rel="noopener" className="btn-secondary">
          Source code
        </a>
      ) : null}
    </div>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getProjectPage(slug);

  if (!page) notFound();

  const url = `${siteUrl}/projects/${page.slug}`;
  const role = getRole(page.detail.role);
  const guides = page.detail.guides
    .map(getPost)
    .filter((post): post is BlogPost => post !== undefined);
  const related = relatedProjects(page);

  return (
    <>
      <ProjectJsonLd page={page} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Projects", url: `${siteUrl}/projects` },
          { name: page.name, url },
        ]}
      />
      <Header logoLink="/" floating />
      <main id="main" tabIndex={-1} className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span>{page.name}</span>
          </nav>

          <header className={styles.articleHeader}>
            <p className={styles.eyebrow}>{page.type} project</p>
            <h1>{page.name}</h1>
            <p className={styles.lead} data-speakable>
              {page.detail.summary}
            </p>
            <ProjectLinks page={page} />
          </header>

          <figure className={projectStyles.media}>
            {page.videoEmbedUrl ? (
              <iframe
                src={page.videoEmbedUrl}
                title={`${page.name} demo video`}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={projectStyles.video}
              />
            ) : (
              <Image
                src={page.image}
                alt={`${page.name} screenshot`}
                className={projectStyles.image}
                sizes="(max-width: 900px) 100vw, 860px"
                priority
              />
            )}
          </figure>

          <section className={styles.summary} aria-labelledby="glance-heading">
            <h2 id="glance-heading">At a glance</h2>
            <p>
              <strong>Type:</strong> {page.type} · <strong>Built by:</strong>{" "}
              <Link href="/about" className={styles.inlineLink}>
                {authorName}
              </Link>
            </p>
            <ul className={projectStyles.stack} aria-label="Technology stack">
              {page.detail.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>

          <BlogContent blocks={page.detail.blocks} />

          {role || guides.length > 0 ? (
            <section className={styles.related} aria-labelledby="learn-heading">
              <h2 id="learn-heading">Go deeper</h2>
              <div className={styles.relatedGrid}>
                {role ? (
                  <Link href={`/${role.slug}`} className={styles.relatedCard}>
                    <strong>Sheikh Mujtaba — {role.role}</strong>
                    <span>{role.description}</span>
                  </Link>
                ) : null}
                {guides.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.relatedCard}>
                    <strong>{post.heading ?? post.title}</strong>
                    <span>{post.excerpt}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className={styles.faq} aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently asked questions</h2>
            {page.detail.faqs.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>

          <section className={styles.related} aria-labelledby="more-heading">
            <h2 id="more-heading">More projects</h2>
            <div className={styles.relatedGrid}>
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className={styles.relatedCard}
                >
                  <strong>{other.name}</strong>
                  <span>{other.description}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <h2>Want something like this built?</h2>
            <p>
              Tell me what you need and I will tell you honestly what it would take, which parts
              are worth building and how long it would run.
            </p>
            <div className={styles.ctaRow}>
              <a href={`mailto:${authorEmail}`} className="btn-primary">
                Email Me
              </a>
              <Link href="/projects" className="btn-secondary">
                All Projects
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
