import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogContent from "../../components/blog-content";
import Header from "../../components/header";
import { BreadcrumbJsonLd } from "../../components/json-ld";
import styles from "../../styles/blog.module.scss";
import { getPost, type BlogPost } from "../../utils/blog-data";
import { projectsList, type ProjectType } from "../../utils/project-data";
import { getRole, otherRoles, rolePages, type RolePage } from "../../utils/role-data";
import { socialMetadata } from "../../utils/seo";
import { authorAlternateNames, authorEmail, authorName, ids, siteUrl } from "../../utils/site";

type PageProps = {
  params: Promise<{ role: string }>;
};

/** Only the slugs in `rolePages` exist; every other top-level path is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return rolePages.map((page) => ({ role: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const page = getRole(role);

  if (!page) return { title: "Page not found" };

  const url = `${siteUrl}/${page.slug}`;

  return {
    // `absolute` skips the "| Sheikh Mujtaba" template: the name already leads.
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: authorName, url: `${siteUrl}/about` }],
    alternates: { canonical: url },
    ...socialMetadata({
      url,
      title: page.title,
      description: page.description,
      type: "profile",
      image: {
        url: `${url}/opengraph-image`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `Sheikh Mujtaba — ${page.role}`,
      },
    }),
  };
}

function RoleJsonLd({ page }: { page: RolePage }) {
  const url = `${siteUrl}/${page.slug}`;

  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#page`,
    url,
    name: page.title,
    description: page.description,
    dateModified: page.updated,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    mainEntity: {
      "@type": "Person",
      // Same @id as the site-wide Person, so this page adds an occupation to
      // the one entity instead of describing a second person.
      "@id": ids.person,
      name: authorName,
      alternateName: authorAlternateNames,
      hasOccupation: {
        "@type": "Occupation",
        name: page.role,
        skills: page.skills.join(", "),
        occupationLocation: { "@type": "Country", name: "Pakistan" },
      },
      knowsAbout: page.skills,
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {[profile, faq].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function ProjectEvidence({ projects }: { projects: ProjectType[] }) {
  if (projects.length === 0) return null;

  return (
    <section className={styles.related} aria-labelledby="projects-heading">
      <h2 id="projects-heading">Work that backs this up</h2>
      <div className={styles.relatedGrid}>
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.relatedCard}>
            <strong>{project.name}</strong>
            <span>{project.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function GuideLinks({ guides }: { guides: BlogPost[] }) {
  if (guides.length === 0) return null;

  return (
    <section className={styles.related} aria-labelledby="guides-heading">
      <h2 id="guides-heading">Guides I have written on this</h2>
      <div className={styles.relatedGrid}>
        {guides.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.relatedCard}>
            <strong>{post.heading ?? post.title}</strong>
            <span>{post.excerpt}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function RolePageRoute({ params }: PageProps) {
  const { role } = await params;
  const page = getRole(role);

  if (!page) notFound();

  const projects = page.projects
    .map((slug) => projectsList.find((project) => project.slug === slug))
    .filter(isDefined);
  const guides = page.guides.map(getPost).filter(isDefined);
  const roles = otherRoles(page);

  return (
    <>
      <RoleJsonLd page={page} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "About", url: `${siteUrl}/about` },
          { name: page.role, url: `${siteUrl}/${page.slug}` },
        ]}
      />
      <Header logoLink="/" floating />
      <main id="main" tabIndex={-1} className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/about">About</Link>
            <span aria-hidden="true">/</span>
            <span>{page.role}</span>
          </nav>

          <header className={styles.articleHeader}>
            <p className={styles.eyebrow}>{page.role}</p>
            <h1>{page.heading}</h1>
            <p className={styles.lead} data-speakable>
              {page.summary}
            </p>
          </header>

          <section className={styles.summary} aria-labelledby="glance-heading">
            <h2 id="glance-heading">At a glance</h2>
            <p>
              <strong>{authorName}</strong> (also known as {authorAlternateNames[0]}) — {page.role},
              based in Pakistan and working remotely with clients worldwide.
            </p>
            <ul>
              {page.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <BlogContent blocks={page.blocks} />

          <ProjectEvidence projects={projects} />
          <GuideLinks guides={guides} />

          <section className={styles.faq} aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently asked questions</h2>
            {page.faqs.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>

          <section className={styles.related} aria-labelledby="roles-heading">
            <h2 id="roles-heading">Other things I do</h2>
            <div className={styles.relatedGrid}>
              {roles.map((other) => (
                <Link key={other.slug} href={`/${other.slug}`} className={styles.relatedCard}>
                  <strong>{other.role}</strong>
                  <span>{other.description}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <h2>Want to work together?</h2>
            <p>
              Tell me what you are working on and I will tell you honestly whether I am the
              right fit, what it would take and how long it would run.
            </p>
            <div className={styles.ctaRow}>
              <a href={`mailto:${authorEmail}`} className="btn-primary">
                Email Me
              </a>
              <Link href="/services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
