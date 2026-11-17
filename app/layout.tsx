import "./tailwind.css";
import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import DeferredChat from "../components/deferred-chat";
import IntroOverlay from "../components/intro-overlay";
import RevealObserver from "../components/reveal-observer";
import SiteFooter from "../components/site-footer";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import { siteMetadata } from "./metadata";
import { PersonJsonLd, WebSiteJsonLd, ProfessionalServiceJsonLd } from "../components/json-ld";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = siteMetadata;

/**
 * Runs before first paint on every full page load (refresh, typed URL, link
 * from another site). In-site navigation is client-side, so the root layout and
 * this decision persist and the intro does not replay between pages. Skipped
 * for visitors who prefer reduced motion.
 */
const introGate = [
  "try{",
  "document.documentElement.dataset.intro=",
  'matchMedia("(prefers-reduced-motion: reduce)").matches?"skip":"play"',
  '}catch(e){document.documentElement.dataset.intro="skip"}',
].join("");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      // Next.js disables the CSS smooth scroll during route changes when this is set.
      data-scroll-behavior="smooth"
      // The intro gate sets data-intro on <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ProfessionalServiceJsonLd />

        {/* Google Analytics — lazyOnload keeps ~150 KB of third-party JS off the
            critical path; gtag replays the queued dataLayer once it arrives. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QPNQ4HRE4V"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QPNQ4HRE4V');
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <IntroOverlay />
        {children}
        <SiteFooter />
        <RevealObserver />
        <DeferredChat />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
