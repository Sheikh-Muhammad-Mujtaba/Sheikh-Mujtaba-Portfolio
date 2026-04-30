import type { Metadata } from "next";
import FAQSection, { FAQJsonLd } from "../../components/faq-section";
import { BreadcrumbSchema } from "../../components/howto-schema";
import Header from "../../components/header";

export const metadata: Metadata = {
  title: "FAQ - AI Development & Security Engineering | Sheikh Mujtaba",
  description:
    "Frequently asked questions about Agentic AI, RAG pipelines, AI agent development services, security engineering, and working with Sheikh Mujtaba.",
  keywords: [
    "Agentic AI FAQ",
    "RAG pipeline FAQ",
    "AI agent development questions",
    "AI red teaming FAQ",
    "hire AI developer",
    "AI development services FAQ",
    "RAG vector database",
    "multi-agent systems",
    "AI security questions",
  ],
  openGraph: {
    title: "FAQ - AI Development & Security Engineering",
    description: "Common questions about Agentic AI, RAG pipelines, and AI development services",
    type: "website",
  },
  alternates: {
    canonical: "https://sheikhmujtaba.me/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd />
      <BreadcrumbSchema />
      <Header logoLink="/" />
      <main className="min-h-screen text-white header-offset">
        {/* Hero Section */}
        <section className="section-padding text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="container-premium relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300">Last updated: April 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-up">
                Frequently Asked{" "}
                <span className="text-gradient">Questions</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Everything you need to know about Agentic AI, RAG pipelines, AI development services, and working with me.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-8 px-4 md:px-8 max-w-4xl mx-auto relative">
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
          <FAQSection />
        </section>

        {/* Quick Contact CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
          <div className="container-premium relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="glass rounded-2xl p-8 md:p-12 glow-cyan-soft">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Still have <span className="text-gradient">questions?</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  I&apos;m happy to discuss your specific AI development or security engineering needs.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="mailto:smujtabaja@gmail.com"
                    className="btn-primary"
                  >
                    Email Me
                  </a>
                  <a
                    href="/services"
                    className="btn-secondary"
                  >
                    View Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
