import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../../components/header";
import { BreadcrumbJsonLd } from "../../../components/json-ld";
import {
  clients,
  getClient,
  serviceApproach,
  serviceDetails,
  serviceGuides,
  serviceLabels,
  serviceNouns,
  type ClientCaseStudy,
} from "../../../data/clients";
import styles from "../../../styles/blog.module.scss";
import cardStyles from "../../../styles/clients.module.scss";
import { getPost, type BlogPost } from "../../../utils/blog-data";
import { projectsList } from "../../../utils/project-data";
import { socialMetadata } from "../../../utils/seo";
import { authorEmail, authorName, ids, siteUrl } from "../../../utils/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Only the clients in data/clients.ts exist; anything else is a 404. */
export const dynamicParams = false;

const MAX_GUIDES = 3;

export function generateStaticParams() {
  return clients.map((client) => ({ slug: client.slug }));
}

function serviceList(client: ClientCaseStudy): string {
  const names = client.services.map((key) => serviceNouns[key]);
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function pageTitle(client: ClientCaseStudy): string {
  return `${client.name} Case Study | Sheikh Mujtaba`;
}

function pageDescription(client: ClientCaseStudy): string {
  return `How Sheikh Mujtaba (Mujtaba Javed) worked with ${client.name} — ${client.sector} — on ${serviceList(client)}.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);

  if (!client) return { title: "Case study not found" };

  const url = `${siteUrl}/clients/${client.slug}`;
  const title = pageTitle(client);
  const description = pageDescription(client);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${client.name} case study`,
      `${client.name} ${authorName}`,
      ...client.services.map((key) => `${serviceLabels[key]} case study`),
      "Sheikh Mujtaba clients",
    ],
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
        alt: `${client.name} case study by Sheikh Mujtaba`,
      },
    }),
  };
}

function relatedGuides(client: ClientCaseStudy): BlogPost[] {
  const slugs = [...new Set(client.services.flatMap((key) => serviceGuides[key]))];
  return slugs
    .map(getPost)
    .filter((post): post is BlogPost => post !== undefined)
    .slice(0, MAX_GUIDES);
}

function faqsFor(client: ClientCaseStudy) {
  return [
    {
      question: `What did Sheikh Mujtaba do for ${client.name}?`,
      answer: `Sheikh Mujtaba (Mujtaba Javed) worked with ${client.name} on ${serviceList(client)}.`,
    },
    {
      question: `What does ${client.name} do?`,
      answer: client.about,
    },
    {
      question: "Can I get similar work done for my business?",
      answer: `Yes. Email ${authorEmail} with what you need and you will get an honest view of scope, approach and timeline.`,
    },
  ];
}

function CaseStudyJsonLd({ client }: { client: ClientCaseStudy }) {
  const url = `${siteUrl}/clients/${client.slug}`;

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: pageTitle(client),
    description: pageDescription(client),
    isPartOf: { "@id": ids.website },
    author: { "@id": ids.person },
    about: {
      "@type": "Organization",
      name: client.name,
      url: client.url,
      description: client.about,
    },
    mentions: client.services.map((key) => ({ "@type": "Thing", name: serviceLabels[key] })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqsFor(client).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {[page, faq].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

export default async function ClientCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const client = getClient(slug);

  if (!client) notFound();

  const url = `${siteUrl}/clients/${client.slug}`;
  const guides = relatedGuides(client);
  const others = clients.filter((other) => other.slug !== client.slug);
  const project = client.projectSlug
    ? projectsList.find((item) => item.slug === client.projectSlug)
    : undefined;
  const faqs = faqsFor(client);

  return (
    <>
      <CaseStudyJsonLd client={client} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Clients & Partners", url: `${siteUrl}/clients` },
          { name: client.name, url },
        ]}
      />
      <Header logoLink="/" floating />
      <main id="main" tabIndex={-1} className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/clients">Clients &amp; Partners</Link>
            <span aria-hidden="true">/</span>
            <span>{client.name}</span>
          </nav>

          <header className={styles.articleHeader}>
            <p className={styles.eyebrow}>Case study · {client.sector}</p>
            <h1>{client.name}</h1>
            <p className={styles.lead} data-speakable>
              {client.context}
            </p>
            <p className={styles.meta} style={{ marginTop: "1rem" }}>
              {client.location ? <span>{client.location}</span> : null}
              {client.location ? (
                <span className={styles.metaDot} aria-hidden="true">
                  &bull;
                </span>
              ) : null}
              <span>{serviceList(client)}</span>
            </p>
          </header>

          <section className={styles.summary} aria-labelledby="client-heading">
            <h2 id="client-heading">About {client.name}</h2>
            <p>{client.about}</p>
            <p>
              <a href={client.url} target="_blank" rel="noopener" className={styles.inlineLink}>
                Visit {client.url.replace(/^https?:\/\/|\/$/g, "")}
              </a>
            </p>
          </section>

          <section aria-labelledby="scope-heading">
            <h2 id="scope-heading" className={styles.h2}>
              Scope of work
            </h2>
            <div className={cardStyles.grid}>
              {client.services.map((key) => (
                <article key={key} className={cardStyles.card} aria-labelledby={`${key}-heading`}>
                  <h3 id={`${key}-heading`} className={cardStyles.name}>
                    {serviceLabels[key]}
                  </h3>
                  <p style={{ marginTop: "0.75rem" }}>{serviceDetails[key].text}</p>
                  <h3>How this work is delivered</h3>
                  <ul>
                    {serviceApproach[key].map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                  <div className={cardStyles.actions}>
                    <Link href={serviceDetails[key].href} className="btn-secondary">
                      More on {serviceNouns[key]}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {project ? (
            <section className={styles.related} aria-labelledby="project-heading">
              <h2 id="project-heading">See the project</h2>
              <div className={styles.relatedGrid}>
                <Link href={`/projects/${project.slug}`} className={styles.relatedCard}>
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>
                </Link>
              </div>
            </section>
          ) : null}

          {guides.length > 0 ? (
            <section className={styles.related} aria-labelledby="guides-heading">
              <h2 id="guides-heading">Related guides</h2>
              <div className={styles.relatedGrid}>
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
            {faqs.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>

          <section className={styles.related} aria-labelledby="others-heading">
            <h2 id="others-heading">More case studies</h2>
            <div className={styles.relatedGrid}>
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/clients/${other.slug}`}
                  className={styles.relatedCard}
                >
                  <strong>{other.name}</strong>
                  <span>{other.sector}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <h2>Need similar work?</h2>
            <p>
              Tell me what is slowing your business down and I will tell you honestly how I can
              help, what it would take and how long it would run.
            </p>
            <div className={styles.ctaRow}>
              <a href={`mailto:${authorEmail}`} className="btn-primary">
                Email Me
              </a>
              <Link href="/clients" className="btn-secondary">
                All Case Studies
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
