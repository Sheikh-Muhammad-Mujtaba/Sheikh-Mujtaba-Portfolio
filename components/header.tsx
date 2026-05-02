"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Briefcase, CircleHelp, Menu, User, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./social-icons";
import styles from "../styles/header.module.scss";

type HeaderProps = {
  logoLink: string;
};

const navItems = [
  { href: "/about", label: "About", icon: User },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/faq", label: "FAQ", icon: CircleHelp },
];

const socialLinks = [
  { href: "https://github.com/Sheikh-Muhammad-Mujtaba", label: "GitHub", icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/", label: "LinkedIn", icon: LinkedInIcon },
];

export default function Header({ logoLink }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <div className={styles.navShell}>
          <Link
            href={logoLink}
            className={styles.logo}
            rel="home"
            data-header-logo="true"
          >
            <Image
              src="/Logo.avif"
              alt="Mujtaba logo"
              width={70}
              height={70}
              priority
            />
          </Link>

          <div className={styles.desktopNav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className={styles.divider} aria-hidden="true" />

            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title={link.label}
                >
                  <Icon aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.menuButton}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
          }`}
        >
          <div className={styles.mobileMenuInner}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={styles.mobileLink}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className={styles.mobileDivider} aria-hidden="true" />

            <div className={styles.mobileSocials}>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileLink}
                  >
                    <Icon aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
