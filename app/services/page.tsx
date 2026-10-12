import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Header from "../../components/header";
import { HowToBuildAIAgents, HowToSecureAISystems } from "../../components/howto-schema";
import { FaRobot, FaDatabase, FaShieldAlt, FaCode, FaArrowRight, FaCheck } from "react-icons/fa";
import { ids } from "../../utils/site";

export const metadata: Metadata = {
  title: "Services - AI Development & Security Engineering | Sheikh Mujtaba",
  description:
    "AI development and security engineering services: agentic AI systems, RAG pipeline architecture, AI red teaming, security assessments and full-stack development. Clear scope, timelines and custom proposals.",
  keywords: [
    "AI development services",
    "Agentic AI development services",
    "RAG pipeline architecture services",
    "AI red teaming services",
    "hire AI developer",
    "AI agent development",
    "security engineering services",
    "full-stack development services",
    "AI consulting",
    "Next.js development services",
  ],
  openGraph: {
    title: "AI Development & Security Engineering Services",
    description: "AI agent development, RAG pipelines and security engineering, scoped to your project with clear timelines",
    type: "website",
  },
  alternates: {
    canonical: "https://sheikhmujtaba.me/services",
  },
};

const services = [
  {
    icon: FaRobot,
    title: "AI Agent Development",
    description: "Build autonomous AI agents with multi-agent orchestration for business automation",
    timeline: "1-4 weeks",
    tiers: [
      {
        name: "Starter",
        duration: "1-2 weeks",
        features: [
          "Single agent with 2-3 tools",
          "FastAPI backend",
          "Simple Next.js frontend",
          "Basic testing & deployment",
        ],
      },
      {
        name: "Professional",
        duration: "2-4 weeks",
        features: [
          "Multi-agent system (3-5 agents)",
          "RAG integration with Qdrant/PostgreSQL",
          "Human-in-the-loop controls",
          "Production deployment",
        ],
        recommended: true,
      },
      {
        name: "Enterprise",
        duration: "4-8 weeks",
        features: [
          "Complex orchestration (5+ services)",
          "Enterprise security hardening",
          "Custom integrations (ERP, CRM)",
          "SLA and ongoing support",
        ],
      },
    ],
  },
  {
    icon: FaDatabase,
    title: "RAG Pipeline Architecture",
    description: "Design and implement production-grade retrieval augmented generation systems",
    timeline: "1-6 weeks",
    tiers: [
      {
        name: "Basic",
        duration: "1-2 weeks",
        features: [
          "Qdrant or PostgreSQL/pgvector setup",
          "Document ingestion pipeline",
          "Query endpoint with grounding",
          "Basic monitoring",
        ],
      },
      {
        name: "Advanced",
        duration: "2-4 weeks",
        features: [
          "Hybrid search (vector + keyword)",
          "Multi-modal support",
          "Re-ranking and filtering",
          "Performance optimization",
        ],
        recommended: true,
      },
      {
        name: "Enterprise",
        duration: "4-6 weeks",
        features: [
          "Multi-tenant architecture",
          "Enterprise auth (SSO, RBAC)",
          "Real-time data sync",
          "Analytics and tracking",
        ],
      },
    ],
  },
  {
    icon: FaShieldAlt,
    title: "Security Engineering",
    description: "Web application security assessment, AI red teaming, and secure architecture review",
    timeline: "3 days - 2 weeks",
    tiers: [
      {
        name: "Security Assessment",
        duration: "3-5 days",
        features: [
          "Web app penetration testing",
          "OWASP Top 10 validation",
          "Vulnerability report",
          "Remediation guidance",
        ],
      },
      {
        name: "AI Red Teaming",
        duration: "1-2 weeks",
        features: [
          "Prompt injection testing",
          "Jailbreak attempt analysis",
          "Output validation testing",
          "Security hardening plan",
        ],
        recommended: true,
      },
      {
        name: "Architecture Review",
        duration: "2-3 days",
        features: [
          "System architecture assessment",
          "Security best practices audit",
          "Hardening recommendations",
          "Implementation roadmap",
        ],
      },
    ],
  },
  {
    icon: FaCode,
    title: "Full-Stack Development",
    description: "End-to-end web application development with modern tech stack",
    timeline: "1-12 weeks",
    tiers: [
      {
        name: "Landing Page",
        duration: "1-2 weeks",
        features: [
          "Next.js + Tailwind CSS",
          "Responsive design",
          "SEO optimization",
          "Contact forms",
        ],
      },
      {
        name: "Web Application",
        duration: "3-6 weeks",
        features: [
          "Full-stack (Next.js + FastAPI)",
          "Database design (PostgreSQL)",
          "Authentication & authorization",
          "API development",
        ],
        recommended: true,
      },
      {
        name: "Complex Platform",
        duration: "6-12 weeks",
        features: [
          "Multi-user role-based access",
          "Real-time features (WebSockets)",
          "Third-party integrations",
          "Scalable architecture",
        ],
      },
    ],
  },
];

const consulting = {
  title: "AI Consulting & Advisory",
  description: "Hourly consulting and retainer arrangements for ongoing support",
  options: [
    {
      name: "Hourly Consulting",
      cadence: "Flexible, by the session",
      features: [
        "Architecture review sessions",
        "Code review and optimization",
        "Technical troubleshooting",
        "Best practices guidance",
      ],
    },
    {
      name: "Weekly Retainer",
      cadence: "A dedicated weekly block",
      features: [
        "Dedicated availability",
        "Priority response",
        "Regular check-ins",
        "Implementation support",
      ],
    },
    {
      name: "Monthly Advisory",
      cadence: "An ongoing monthly partnership",
      features: [
        "Strategic AI roadmap planning",
        "Weekly consulting calls",
        "Code review and mentorship",
        "Architecture decisions support",
      ],
    },
  ],
};

// Service schema for structured data
function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": ids.person },
        areaServed: "Worldwide",
      },
    })),
  };

  return (
    <Script
      id="services-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function ServicesPage() {
  return (
    <>
      <HowToBuildAIAgents />
      <HowToSecureAISystems />
      <ServiceSchema />
      <Header logoLink="/" floating />
      <main className="min-h-screen text-white header-offset">
        {/* Hero Section */}
        <section className="section-padding text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="container-premium relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300">Custom proposals &amp; clear timelines</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-up">
                Services &amp; <span className="text-gradient">Engagements</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                AI development and security engineering, scoped to your goals.
                From autonomous AI agents to secure-by-design architecture.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <FaCheck className="text-emerald-400" />
                  <span className="text-slate-300">Tailored proposals</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <FaCheck className="text-emerald-400" />
                  <span className="text-slate-300">Clear timelines</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <FaCheck className="text-emerald-400" />
                  <span className="text-slate-300">30-day support included</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto relative">
          {/* Decorative line */}
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden lg:block" />
          
          {services.map((service, serviceIndex) => (
            <div key={serviceIndex} className="mb-24 relative">
              {/* Service Header */}
              <div className="flex items-center gap-4 mb-10 animate-slide-up">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center glow-cyan-soft">
                  <service.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h2>
                  <p className="text-slate-400">{service.description}</p>
                </div>
              </div>

              {/* Engagement tiers */}
              <div className="grid md:grid-cols-3 gap-6">
                {service.tiers.map((tier, tierIndex) => (
                  <div
                    key={tierIndex}
                    className={`card-premium relative p-6 md:p-8 ${
                      tier.recommended
                        ? "border-cyan-500/50 glow-cyan-soft scale-[1.02]"
                        : ""
                    } animate-slide-up`}
                    style={{ animationDelay: `${tierIndex * 0.1}s` }}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-cyan-500/30">
                          Recommended
                        </span>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gradient mb-2">{tier.name}</h3>
                      <div className="text-sm text-slate-500">Typical timeline: {tier.duration}</div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-sm text-slate-400">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                            <FaCheck className="w-3 h-3 text-emerald-400" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href={`mailto:smujtabaja@gmail.com?subject=${encodeURIComponent(`Proposal request: ${service.title} (${tier.name})`)}`}
                      className={tier.recommended ? "btn-primary block text-center" : "btn-secondary block text-center"}
                    >
                      Request a Proposal
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Consulting Section */}
        <section className="section-padding relative border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
          <div className="container-premium relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-gradient">{consulting.title}</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">{consulting.description}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {consulting.options.map((option, index) => (
                  <div key={index} className="card-premium p-6 md:p-8 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h3 className="text-2xl font-bold text-gradient mb-2">{option.name}</h3>
                    <div className="text-sm text-slate-500 mb-6">{option.cadence}</div>
                    <ul className="space-y-3 text-left">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-sm text-slate-400">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                            <FaCheck className="w-3 h-3 text-emerald-400" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Terms */}
        <section className="section-padding relative">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                Engagement <span className="text-gradient">Terms</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Payment Structure", items: ["50% upfront to begin work", "25% at project midpoint", "25% upon completion"] },
                  { title: "Payment Methods", items: ["Bank transfer (Wise, Payoneer)", "Cryptocurrency (USDC, ETH)", "PayPal (smaller projects)"] },
                  { title: "Deliverables", items: ["Source code via GitHub", "Documentation & deployment guide", "Production deployment", "30-day post-launch support"] },
                  { title: "Availability", items: ["Booking 1-2 weeks in advance", "Expedited timelines on request", "Retainer clients get priority", "Timezone: PKT (UTC+5)"] }
                ].map((section, index) => (
                  <div key={index} className="card-premium p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h3 className="font-semibold text-cyan-400 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative overflow-hidden border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
          <div className="container-premium relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="glass rounded-2xl p-8 md:p-12 glow-cyan-soft">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to start your <span className="text-gradient">project?</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Let&apos;s discuss your AI development or security engineering needs.
                  I&apos;ll send a tailored proposal covering scope, timeline and investment.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="mailto:smujtabaja@gmail.com?subject=Project%20Inquiry"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Get a Custom Quote
                    <FaArrowRight />
                  </a>
                  <Link href="/faq" className="btn-secondary">
                    Read FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
