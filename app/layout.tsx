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
import dynamic from "next/dynamic";

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

const SmoothScroll = dynamic(
  () => import("../components/smooth-scroll-optimized"),
  { ssr: false }
);

const DeferredChat = dynamic(
  () => import("../components/deferred-chat"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Preload GSAP for intro animation to load immediately */}
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/ProfileImage.jpeg"
          as="image"
          fetchPriority="high"
        />
        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
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
