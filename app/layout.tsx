import "./tailwind.css";
import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import SmoothScroll from "../components/smooth-scroll-optimized";
import DeferredChat from "../components/deferred-chat";
import { Inter, Outfit } from "next/font/google";
import { siteMetadata } from "./metadata";
import { PersonJsonLd, WebSiteJsonLd, ProfessionalServiceJsonLd } from "../components/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = siteMetadata;

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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Preload GSAP for intro animation to load immediately */}
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700&display=swap"
          as="style"
        />
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/ProfileImage.jpeg"
          as="image"
          type="image/jpeg"
        />
        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Preconnect to API endpoints */}
        <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ProfessionalServiceJsonLd />
      </head>
      <body className="antialiased font-sans">
        <SmoothScroll>{children}</SmoothScroll>
        <DeferredChat />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
