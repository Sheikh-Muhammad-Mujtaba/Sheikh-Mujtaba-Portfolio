import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import styles from "../styles/site-footer.module.scss";
import { rolePages } from "../utils/role-data";
import { authorEmail, authorName } from "../utils/site";
import { GitHubIcon, LinkedInIcon, LinktreeIcon, MediumIcon, XIcon } from "./social-icons";

const explore = [
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients & case studies" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Engineering notes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

const social = [
  { href: "https://github.com/Sheikh-Muhammad-Mujtaba", label: "GitHub", Icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/sheikhmujtaba/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://x.com/Mujtaba_Javed_", label: "X", Icon: XIcon },
  { href: "https://medium.com/@smujtabaja", label: "Medium", Icon: MediumIcon },
  { href: "https://linktr.ee/s.m.mujtabajaved", label: "Linktree", Icon: LinktreeIcon },
];

/** Site-wide footer: closing call to action, sitemap columns and identity links. */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className={styles.inner}>
        <section className={styles.cta} aria-labelledby="footer-cta-heading">
          <p className={styles.kicker}>Available for new work</p>
          <h3 id="footer-cta-heading" className={styles.ctaTitle}>
            Have something to build <span className="text-gradient">or secure?</span>
          </h3>
          <p className={styles.ctaText}>
            AI agents, RAG pipelines, ERPNext, full-stack apps or a security review. Tell me
            what you need and you will get an honest answer on scope and timeline.
          </p>
          <div className={styles.ctaActions}>
            <a href={`mailto:${authorEmail}`} className="btn-primary">
              <Mail size={18} aria-hidden="true" />
              Start a conversation
            </a>
            <Link href="/services" className="btn-secondary">
              View services
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLink} aria-label={`${authorName}, home`}>
              <Image src="/Logo.avif" alt="" width={44} height={44} className={styles.logo} />
              <span>
                <strong>{authorName}</strong>
                <span className={styles.brandSub}>Mujtaba Javed</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              AI Security Engineer and AI Developer building agentic AI, ERPNext automation and
              the controls that keep them safe in production.
            </p>
            <ul className={styles.contact}>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${authorEmail}`}>{authorEmail}</a>
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>Pakistan · remote worldwide</span>
              </li>
            </ul>
          </div>

          <nav className={styles.column} aria-labelledby="footer-roles">
            <h3 id="footer-roles" className={styles.columnTitle}>
              What I do
            </h3>
            <ul>
              {rolePages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`}>{page.role}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-labelledby="footer-explore">
            <h3 id="footer-explore" className={styles.columnTitle}>
              Explore
            </h3>
            <ul>
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-labelledby="footer-connect">
            <h3 id="footer-connect" className={styles.columnTitle}>
              Connect
            </h3>
            <ul className={styles.social}>
              {social.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="me noopener noreferrer">
                    <Icon width={16} height={16} aria-hidden="true" />
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {authorName} (Mujtaba Javed). All rights reserved.
          </p>
          <p className={styles.bottomLinks}>
            <a href="/rss.xml">RSS</a>
            <a href="/sitemap.xml">Sitemap</a>
            <a href="/llms.txt">llms.txt</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
