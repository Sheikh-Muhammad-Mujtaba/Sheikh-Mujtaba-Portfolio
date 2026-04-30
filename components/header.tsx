"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, CircleHelp, Menu, User, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./social-icons";

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
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex justify-center mt-3 sm:mt-4 px-4">
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[rgba(10,10,10,0.68)] backdrop-blur-xl border border-white/[0.18] shadow-lg w-[90%] md:w-[75%] max-w-[1536px] min-h-[60px]">
          {/* Logo */}
          <Link
            href={logoLink}
            className="flex items-center gap-2 group flex-shrink-0"
            rel="home"
            data-header-logo="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo.png"
              alt="Mujtaba logo"
              width={42}
              height={42}
              className="w-[42px] h-[42px] rounded-full border border-white/40 shadow-lg object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Main Nav Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="w-[1.2rem] h-[1.2rem]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-slate-600 mx-2" />

            {/* Social Links with Slide Reveal */}
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-0 px-3 py-2 rounded-full text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
                  title={link.label}
                >
                  <Icon className="w-[1.3rem] h-[1.3rem] flex-shrink-0" />
                  <span className="max-w-0 overflow-hidden group-hover:max-w-20 group-hover:ml-2 transition-all duration-300 whitespace-nowrap text-sm font-bold">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm mt-2 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-4 space-y-1">
            {/* Main Nav Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all font-bold"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-px bg-slate-700 my-3" />

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all font-bold"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{link.label}</span>
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
