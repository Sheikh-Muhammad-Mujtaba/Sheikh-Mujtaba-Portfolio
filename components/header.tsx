import Link from "next/link";
import { FaGithub, FaLinkedin,  } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import styles from "../styles/header.module.scss";
import commonStyles from "../styles/common.module.scss";

type HeaderProps = {
  logoLink: string;
};

export default function Header({ logoLink }: HeaderProps) {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.spaceBetween}>
          <Link href={logoLink} className={styles.logo} rel="home">
            <span aria-hidden="true">SM</span>
            <span className={commonStyles.hiddenText}>
              Sheikh Mujtaba - Homepage
            </span>
          </Link>
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com/Sheikh-Muhammad-Mujtaba"
                title="Go to Mujtaba's GitHub"
              >
                GitHub
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/"
                title="Connect with Sheikh Mujtaba on LinkedIn"
              >
                LinkedIn
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://linktr.ee/s.m.mujtabajaved"
                title="Check out Mujtaba's Linktree"
              >
                Linktree
                <SiLinktree />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
