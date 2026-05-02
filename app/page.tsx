import Link from "next/link";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon, LinktreeIcon } from "../components/social-icons";
import { ArrowUpRight, Mail } from "lucide-react";

import styles from "../styles/home.module.scss";

import Header from "../components/header";
import ProjectListing from "../components/project-listing";
import { projectsList } from "../utils/project-data";


const blogPosts: { title: string; date: string, link: string }[] = [
  {
    title: "🤖 Difference between Generative AI and LLM — In simple and easy language",
    date: " May 14 2025",
    link: "https://medium.com/@smujtabaja/difference-between-generative-ai-and-llm-in-simple-and-easy-language-af9fc34ccbd1"
  },
  {
    title: "The Strongest Encryption Algorithms in 2025: A Complete Guide to Modern Security",
    date: " March 17 2025",
    link: "https://medium.com/@smujtabaja/the-strongest-encryption-algorithms-in-2025-a-complete-guide-to-modern-security-129fa8a80687"
  },
  {
    title: "Some Hashing Algorithms & Their Strength Ratings",
    date: " March 17 2025",
    link: "https://medium.com/@smujtabaja/some-hashing-algorithms-their-strength-ratings-426e35c8ef18"
  },
  {
    title: "Introduction to Machine Learning: A Beginner's Guide",
    date: " March 3 2025",
    link: "https://medium.com/@smujtabaja/introduction-to-machine-learning-73c88b87fa2b"
  },
];

export default function Homepage() {
  return (
    <div className={styles.homeContainer}>
      <div>
        <Header logoLink="/" />
        <main>
          <section className={`${styles.hero} px-1`}>
            <div className={styles.cta}>
              <div className="flex flex-col gap-1 w-full min-w-0">
                <div className={`${styles.title} leading-[1.05]`}>
                  <div className="overflow-hidden pb-2"><h1 className="titleLine">I build</h1></div>
                  <div className="overflow-hidden pb-2">
                    <span className="titleLine flex flex-wrap gap-x-[0.45em]">
                      <span className={`${styles.highlightCyan} ${styles.animatedGradientCyan}`}>secure</span>
                      <span className={`${styles.highlightGold} ${styles.animatedGradientGold}`}> AI</span>
                    </span>
                  </div>
                  <div className="overflow-hidden pb-2"><span className="titleLine">systems.</span></div>
                </div>

                <p className={`${styles.jobTitle} wrap-break-word`}>
                  <strong className={styles.roleName}>Sheikh Mujtaba</strong>
                  <span className={styles.roleAI}>AI Developer</span>
                  <span className="opacity-50 mx-3">&bull;</span>
                  <span className={styles.roleSecurity}>Security Engineer</span>
                </p>

                <div className="flex gap-3 sm:gap-4 mt-2 heroButtons justify-center w-full md:justify-start flex-wrap md:flex-nowrap">
                  <Link href="#projects" className={styles.primaryBtn}>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    View Projects
                  </Link>
                  <a href="mailto:smujtabaja@gmail.com" className={styles.secondaryBtn}>
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Contact Me
                  </a>
                </div>
              </div>
              <div
                className={`${styles.portraitContainer} rounded-3xl relative`}
              >
                <div className={styles.portraitGlow}></div>
                <Image
                  src={"/images/ProfileImage.avif"}
                  alt="Portrait of Sheikh Mujtaba - AI Developer and Security Engineer"
                  width={400}
                  height={400}
                  className={styles.portrait}
                  fetchPriority="high"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnIHZpZXdCb3g9JzAgMCAxMCAxMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9J2cnIGN4PSc1MCUnIGN5PSc0MCUnIHI9JzcwJSc+PHN0b3Agc3RvcC1jb2xvcj0nIzA2YjZkNCcvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzAyMDYxNyc+PC9zdG9wPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg=="
                  sizes="(max-width: 640px) 200px, (max-width: 1536px) 300px, 400px"
                />
                <div className={styles.portraitBadge}>
                  <span className={styles.badgeGlyph} aria-hidden="true" />
                  <span>
                    Building secure, intelligent<br />
                    solutions for a safer digital future.
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section
            id="about"
            className={styles.aboutContainer}
          >
            <h2>About Sheikh Mujtaba</h2>
            <p className="mb-4">
              <strong>Sheikh Mujtaba is an AI Developer and Security Engineer</strong> who builds production-grade Agentic AI systems for business automation. He specializes in architecting RAG (Retrieval Augmented Generation) pipelines, multi-agent orchestration, and secure AI infrastructure.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-cyan-400">What is Agentic AI?</h3>
            <p className="mb-4">
              Agentic AI refers to autonomous AI systems that can take actions, make decisions, and complete complex tasks without constant human intervention. Unlike traditional chatbots that respond to single prompts, agentic systems use tools, maintain context across interactions, and can orchestrate multi-step workflows. Sheikh Mujtaba builds these systems using OpenAI Agents SDK, Gemini SDK, and Claude API with human-in-the-loop controls for reliability.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-cyan-400">Core Expertise</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>AI Development:</strong> RAG pipelines with Qdrant/PostgreSQL, multi-agent orchestration, LLM integration (GPT-4, Gemini, Claude)</li>
              <li><strong>Security Engineering:</strong> Web app pentesting, AI red teaming, prompt injection testing, secure-by-design architecture</li>
              <li><strong>Full-Stack Development:</strong> Next.js, FastAPI, TypeScript, Python, cloud deployment</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-cyan-400">Why Context Grounding Matters</h3>
            <p className="mb-4">
              <strong>Context grounding</strong> is the practice of connecting AI responses to specific, verifiable data sources rather than relying on the model&apos;s training data. This approach reduces AI hallucination by 60-80% and ensures factual accuracy. Sheikh Mujtaba implements context grounding through vector databases (Qdrant, pgvector) and careful prompt engineering.
            </p>

            <p className="text-sm text-slate-400 mt-6">
              <em>Last updated: April 2025 | Based in Pakistan | Available for remote work worldwide</em>
            </p>
          </section>
          <section
            id="experienceContainer"
            className={`${styles.experienceContainer} mt-12`}
          >
            <h2>Experience</h2>
            <ul>
              <li>
                <strong>Web Application Developer & IT Consultant (Jul 2025 - Present):</strong> Built internal web tools and streamlined maintenance workflows at Tech Accuracy, helping reduce potential downtime and improve operations.
              </li>
              <li>
                <strong>AI Developer for Remote Clients (Apr 2025 - Present):</strong> Architected and deployed RAG-based AI chatbots with FastAPI + Qdrant, and built autonomous AI agent systems for enterprise workflow automation.
              </li>
              <li>
                <strong>Freelance Web Developer (Jan 2024 - 2025):</strong> Delivered multiple full-stack client applications using Next.js and Tailwind CSS, integrating AI backends and improving SEO performance.
              </li>
              <li>
                <strong>AI & LLM Engineering:</strong> Integrated GPT-4, Gemini, and Claude into secure backend APIs for production use cases with better grounding and lower hallucination rates.
              </li>
              <li>
                <strong>Security Engineering:</strong> Applied web app pentesting, AI red teaming, prompt injection testing, and security best practices across software and ERP workflows.
              </li>
              <li>
                <strong>Automation & Integrations:</strong> Designed n8n workflow pipelines and custom Python automation scripts for end-to-end business process optimization.
              </li>
            </ul>
          </section>
          <section
            className={`${styles.blogPreviewContainer} mt-12`}
          >
            <h2>My Blog</h2>
            <ul>
              {blogPosts.map((post, i) => (
                <li key={i}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <h3>{post.title}</h3>
                    <p>{post.date}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className={`${styles.projectContainer} pb-20`} id="projects">
            <div className={styles.projectTitleContainer}>
              <h2>My Projects</h2>
            </div>

            <div className={styles.projectListingsContainer}>
              {projectsList.map((project) => (
                <ProjectListing key={project.slug} project={project} />
              ))}
            </div>
          </section>

          {/* Quick Links Section */}
          <section className={styles.quickLinks}>
            <h2 className="text-2xl font-bold mb-4">Want to Learn More?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Explore detailed information about my services, background, or find answers to common questions.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/services" className="btn-primary">
                View Services & Pricing
              </a>
              <a
                href="/about"
                className="px-6 py-3 border border-slate-600 hover:border-cyan-500 text-slate-300 rounded-lg font-medium transition-colors"
              >
                About Me
              </a>
              <a
                href="/faq"
                className="px-6 py-3 border border-slate-600 hover:border-cyan-500 text-slate-300 rounded-lg font-medium transition-colors"
              >
                Read FAQ
              </a>
            </div>
          </section>
        </main>
        <footer>
          <h2 className={styles.footerTitle}>Connect with Me</h2>
          <ul className={`${styles.footerLinks} ${styles.mobileStack}`}>
            <li>
              <a
                href="https://github.com/Sheikh-Muhammad-Mujtaba"
                target="_blank"
                rel="noopener noreferrer"
                title="Go to Mujtaba's GitHub"
              >
                GitHub
                <GitHubIcon className={styles.socialIcon} width={20} height={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect with Mujtaba on LinkedIn"
              >
                LinkedIn
                <LinkedInIcon className={styles.socialIcon} width={20} height={20} />
              </a>
            </li>
            <li>
              <a
                href="https://linktr.ee/s.m.mujtabajaved"
                target="_blank"
                rel="noopener noreferrer"
                title="Check out Mujtaba's Linktree"
              >
                Linktree
                <LinktreeIcon className={styles.socialIcon} width={20} height={20} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
