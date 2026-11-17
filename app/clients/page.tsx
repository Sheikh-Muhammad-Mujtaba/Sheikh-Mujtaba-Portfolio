import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/header";
import { BreadcrumbJsonLd } from "../../components/json-ld";
import {
  clients,
  serviceDetails,
  serviceLabels,
  type ClientCaseStudy,
  type ServiceKey,
} from "../../data/clients";
import styles from "../../styles/blog.module.scss";
import cardStyles from "../../styles/clients.module.scss";
import { socialMetadata } from "../../utils/seo";
import { authorEmail, authorName, ids, siteUrl } from "../../utils/site";

const pageUrl = `${siteUrl}/clients`;
const pageTitle = "Sheikh Mujtaba | Clients & Partners — Case Studies";
const pageDescription =
  "Case studies from Sheikh Mujtaba's (Mujtaba Javed) work with clients and partners: web development, ERPNext development, AI integration and automation, and infrastructure security.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "Sheikh Mujtaba clients",
    "Mujtaba Javed case studies",
    "ERPNext development case study",
    "AI automation case study",
    "web development case study Pakistan",
    "Softech Global Services",
    "Tech Accuracy",
    "Right Window Solutions",
  ],
  alternates: { canonical: pageUrl },
  ...socialMetadata({
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    image: {
      url: `${pageUrl}/opengraph-image`,
      width: 1200,
      height: 630,
      type: "image/png",
      alt: "Sheikh Mujtaba — Clients & Partners",
    },
  }),
};

const serviceOrder: ServiceKey[] = ["web", "erp", "ai", "security", "it"];

const faqs = [
  {
    question: "Who has Sheikh Mujtaba worked with?",
    answer: `Sheikh Mujtaba (Mujtaba Javed) has worked with ${clients
      .map((client) => client.name)
      .join(", ")} on web development, ERP development, AI integration and automation, and infrastructure security.`,
  },
  {
    question: "Why are there no revenue or traffic numbers in these case studies?",
    answer:
      "These are real companies, and their figures are theirs to share. Each case study describes the scope and approach; I am happy to discuss details privately where the client agrees.",
  },
  {
    question: "Can I learn more about a specific engagement?",
    answer:
      "Ask me by email. Where the client agrees, I can share more detail about the work or make an introduction.",
  },
];

function ClientsJsonLd() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.person },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: clients.map((client, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Organization",
          name: client.name,
          url: client.url,
          description: client.about,
        },
      })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {[collection, faq].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

function ServiceMatrix() {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Client / partner</th>
            {serviceOrder.map((key) => (
              <th key={key} scope="col">
                {serviceLabels[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.slug}>
              <th scope="row">
                <Link href={`/clients/${client.slug}`} className={styles.inlineLink}>
                  {client.name}
                </Link>
              </th>
              {serviceOrder.map((key) => (
                <td key={key} aria-label={client.services.includes(key) ? "Yes" : "No"}>
                  {client.services.includes(key) ? "✓" : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseStudy({ client }: { client: ClientCaseStudy }) {
  const headingId = `${client.slug}-heading`;

  return (
    <article id={client.slug} className={cardStyles.card} aria-labelledby={headingId}>
      <p className={cardStyles.sector}>{client.sector}</p>
      <h2 id={headingId} className={cardStyles.name}>
        {client.name}
      </h2>
      {client.location ? <p className={cardStyles.location}>{client.location}</p> : null}

      <h3>About the client</h3>
      <p>{client.about}</p>

      <h3>The engagement</h3>
      <p>{client.context}</p>

      <h3>Scope of work</h3>
      <ul>
        {client.services.map((key) => (
          <li key={key}>
            <Link href={serviceDetails[key].href} className={styles.inlineLink}>
              <strong>{serviceLabels[key]}</strong>
            </Link>{" "}
            — {serviceDetails[key].text}
          </li>
        ))}
      </ul>

      <div className={cardStyles.actions}>
        <Link href={`/clients/${client.slug}`} className="btn-primary">
          Read the case study
        </Link>
        <a href={client.url} target="_blank" rel="noopener" className="btn-secondary">
          Visit site
        </a>
      </div>
    </article>
  );
}

export default function ClientsPage() {
  return (
    <>
      <ClientsJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Clients & Partners", url: pageUrl },
        ]}
      />
      <Header logoLink="/" floating />
      <main id="main" tabIndex={-1} className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Clients &amp; Partners</span>
          </nav>

          <header className={styles.articleHeader}>
            <p className={styles.eyebrow}>Case studies</p>
            <h1>Clients &amp; Partners</h1>
            <p className={styles.lead} data-speakable>
              The companies {authorName} (Mujtaba Javed) has built for — ERPNext partners,
              software and automation agencies, a training company and a child therapy center —
              and the web, ERP, AI automation and security work behind each engagement.
            </p>
          </header>

          <section aria-labelledby="matrix-heading">
            <h2 id="matrix-heading" className={styles.h2}>
              Work at a glance
            </h2>
            <ServiceMatrix />
          </section>

          <div className={cardStyles.grid}>
            {clients.map((client) => (
              <CaseStudy key={client.slug} client={client} />
            ))}
          </div>

          <section className={styles.faq} aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently asked questions</h2>
            {faqs.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>

          <section className={styles.cta}>
            <h2>Want to be the next case study?</h2>
            <p>
              Tell me what is slowing your business down — a website, an ERP rollout, a manual
              process or an infrastructure worry — and I will tell you honestly how I can help.
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
