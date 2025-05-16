import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";


import styles from "../styles/home.module.scss";
import commonStyles from "../styles/common.module.scss";
import introOverlayStyles from "../styles/intro-overlay.module.scss";

import Header from "../components/header";
import IntroOverlay from "../components/intro-overlay";
import { projectsList } from "../utils/project-data";
import ProjectListing from "../components/project-listing";
import SheikhMujtaba from "../images/Sheikh-Mujtaba.png";

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
      <Suspense
        fallback={<div className={introOverlayStyles.introOverlay}></div>}
      >
        <IntroOverlay />
      </Suspense>
      <div id="afterAnimation">
        <Header logoLink="/" />
        <main>
          <section className={styles.hero}>
            <div className={styles.cta}>
              <h1 className={commonStyles.hiddenText}>Sheikh Mujtaba Javed</h1>
              <h2 id="title" className={styles.title}>
                I create
                <span className={commonStyles.playful}> playful </span>{" "}
                experiences.
              </h2>
              <div id="portraitContainer" className={styles.portraitContainer}>
                <Image
                  src={SheikhMujtaba}
                  alt="Portrait of Alexander Grattan"
                  className={styles.portrait}
                  priority
                />
              </div>
            </div>
            <p id="jobTitle" className={styles.jobTitle}>
              Sheikh Mujtaba / Full-Stack Developer | Cybersecurity Specialist
            </p>
          </section>
          <section id="aboutContainer" className={styles.aboutContainer}>
            <h2>About Me</h2>
            <p>
              Hi there! My name is Mujtaba Javed, and I’m an IT expert and Full-Stack Developer
              specializing in cybersecurity and web development. I
              currently focus on building secure, scalable applications and
              improving the safety of online environments. <br />
              <br /> My technical skills range from programming in languages
              like Python, JavaScript, and TypeScript to web development
              frameworks such as Next.js. I also have experience in penetration
              testing and cyber defense strategies. In addition to
              cybersecurity, I enjoy exploring AI, networking, and creating
              innovative solutions for digital problems.
            </p>
          </section>
          <section
            id="blogPreviewContainer"
            className={styles.blogPreviewContainer}
          >
            <h2>My Blog</h2>
            <ul>
              {blogPosts.map((post, i) => (
                <li key={i}>
                  <Link href={post.link} target="_blank" rel="noopener noreferrer">
                    <h3>{post.title}</h3>
                    <p>{post.date}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.projectContainer} id="projects">
            <div className={styles.projectTitleContainer}>
              <h2>My Projects</h2>
            </div>

            <div className={styles.projectListingsContainer}>
              {projectsList.map((project) => (
                <ProjectListing key={project.slug} project={project} />
              ))}
            </div>
          </section>
        </main>
        <footer>
          <h2>Connect with Me</h2>
          <ul id="footerLinks" className={styles.footerLinks}>
            <li>
              <a
                href="https://github.com/Sheikh-Muhammad-Mujtaba"
                target="_blank"
                rel="noopener noreferrer"
                title="Go to Mujtaba's GitHub"
              >
                GitHub
                <FaGithub />
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
                <FaLinkedin />
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
                <SiLinktree />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
