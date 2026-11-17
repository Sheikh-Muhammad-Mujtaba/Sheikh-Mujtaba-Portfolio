import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/header";
import ProjectCard from "../../components/project-card";
import { BreadcrumbJsonLd } from "../../components/json-ld";
import styles from "../../styles/blog.module.scss";
import gridStyles from "../../styles/project-grid.module.scss";
import { projectPages } from "../../utils/project-details";
import { socialMetadata } from "../../utils/seo";
import { authorName, ids, siteUrl } from "../../utils/site";

const pageUrl = `${siteUrl}/projects`;
const pageTitle = "Sheikh Mujtaba | Projects — AI, Full-Stack & Security Work";
const pageDescription =
  "Projects by Sheikh Mujtaba (Mujtaba Javed): AI agents and Digital FTE platforms, full-stack web applications, Laravel modules, and cybersecurity research and red teaming.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "Sheikh Mujtaba projects",
    "Mujtaba Javed portfolio",
    "AI agent projects",
    "Next.js projects",
    "cybersecurity projects",
  ],
  alternates: { canonical: pageUrl },
  ...socialMetadata({ url: pageUrl, title: pageTitle, description: pageDescription }),
};

type Group = { title: string; intro: string; types: string[] };

/** Every project type must appear in exactly one group. */
const groups: Group[] = [
  {
    title: "AI agents & platforms",
    intro: "Autonomous agents, Digital FTE platforms and retrieval-grounded AI systems.",
    types: ["AI Platform", "AI Agent", "AI + Documentation"],
  },
  {
    title: "Full-stack & web",
    intro: "Web applications, client websites and interface builds.",
    types: ["Full-Stack", "Frontend", "Backend"],
  },
  {
    title: "Cybersecurity & red teaming",
    intro: "Offensive testing, incident clean-up, malware analysis and security research.",
    types: ["Cybersecurity", "AI Red Team"],
  },
];

function ProjectsJsonLd() {
  const schema = {
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
      itemListElement: projectPages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/projects/${page.slug}`,
        name: page.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}

/** Cards in the first group load eagerly: they are above the fold. */
const EAGER_IMAGES = 3;

export default function ProjectsPage() {
  return (
    <>
      <ProjectsJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Projects", url: pageUrl },
        ]}
      />
      <Header logoLink="/" floating />
      <main id="main" tabIndex={-1} className="min-h-screen text-white header-offset">
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Projects</span>
          </nav>

          <header className={styles.indexHeader}>
            <p className={styles.eyebrow}>Portfolio</p>
            <h1>Projects</h1>
            <p className={styles.indexLead}>
              {projectPages.length} projects by {authorName} (Mujtaba Javed), from autonomous AI
              employees and RAG platforms to client websites, Laravel modules and security
              research. Each page covers what was built, how and why.
            </p>
          </header>

          {groups.map((group, groupIndex) => {
            const pages = projectPages.filter((page) => group.types.includes(page.type));
            if (pages.length === 0) return null;
            const headingId = `group-${group.types[0].toLowerCase().replace(/[^a-z]+/g, "-")}`;

            return (
              <section key={group.title} aria-labelledby={headingId}>
                <h2 id={headingId} className={styles.h2}>
                  {group.title}
                </h2>
                <p className={styles.indexLead} style={{ marginBottom: "1.5rem" }}>
                  {group.intro}
                </p>
                <div className={gridStyles.grid}>
                  {pages.map((page, index) => (
                    <ProjectCard
                      key={page.slug}
                      project={page}
                      priority={groupIndex === 0 && index < EAGER_IMAGES}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
