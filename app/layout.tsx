import "./tailwind.css";
import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import DeferredChat from "../components/deferred-chat";
import IntroOverlay from "../components/intro-overlay";
import { Instrument_Serif, Manrope } from "next/font/google";
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
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <head>
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ProfessionalServiceJsonLd />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QPNQ4HRE4V"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
        <IntroOverlay />
        {children}
        <DeferredChat />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
