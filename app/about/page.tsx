import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Header from "../../components/header";
import { FaGithub, FaLinkedin, FaEnvelope, FaMedium, FaRobot, FaShieldAlt, FaCode } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About - Sheikh Mujtaba | AI Developer & Security Engineer",
  description:
    "Learn about Sheikh Mujtaba, an AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, and secure-by-design architecture. Based in Pakistan, working globally.",
  keywords: [
    "Sheikh Mujtaba",
    "AI Developer Pakistan",
    "Security Engineer",
    "Agentic AI expert",
    "RAG pipeline architect",
    "AI red teaming",
    "Full-stack developer",
    "Next.js developer",
    "FastAPI developer",
    "hire AI developer",
  ],
  openGraph: {
    title: "About Sheikh Mujtaba - AI Developer & Security Engineer",
    description: "Specializing in Agentic AI, RAG pipelines, and secure-by-design architecture",
    type: "profile",
  },
  alternates: {
    canonical: "https://sheikhmujtaba.me/about",
  },
};

// Enhanced Person schema for this page
function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sheikh Mujtaba Javed",
    alternateName: "Sheikh Mujtaba",
    url: "https://sheikhmujtaba.me/about",
    image: "https://sheikhmujtaba.me/images/ProfileImage.jpeg",
    jobTitle: "AI Developer & Security Engineer",
    description:
      "AI Developer and Security Engineer specializing in Agentic AI systems, RAG pipelines, multi-agent orchestration, and secure-by-design architecture.",
    worksFor: {
      "@type": "Organization",
      name: "Tech Accuracy",
      url: "https://techaccuracy.com",
    },
    knowsAbout: [
      "Agentic AI",
      "RAG (Retrieval Augmented Generation)",
      "Multi-Agent Systems",
      "OpenAI Agents SDK",
      "Gemini SDK",
      "Claude API",
      "FastAPI",
      "Next.js",
      "Qdrant Vector Database",
      "PostgreSQL",
      "Web Application Security",
      "AI Red Teaming",
      "Prompt Injection Testing",
      "Python",
      "TypeScript",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Self-taught & Industry Certified",
    },
    sameAs: [
      "https://github.com/Sheikh-Muhammad-Mujtaba",
      "https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/",
      "https://linktr.ee/s.m.mujtabajaved",
      "https://medium.com/@smujtabaja",
    ],
    email: "mailto:smujtabaja@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Pakistan",
    },
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
    knowsLanguage: ["English", "Urdu"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Skill",
        name: "AI Agent Development",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Skill",
        name: "Security Engineering",
      },
    ],
  };

  return (
    <Script
      id="about-person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const skills = {
  ai: [
    "OpenAI Agents SDK",
    "Gemini SDK",
    "Claude API",
    "LangChain",
    "RAG Architecture",
    "Vector Databases (Qdrant, pgvector)",
    "Multi-Agent Orchestration",
    "Context Grounding",
  ],
  security: [
    "Web Application Pentesting",
    "AI Red Teaming",
    "Prompt Injection Testing",
    "Jailbreak Analysis",
    "Secure Architecture Review",
    "OWASP Top 10",
  ],
  development: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
  ],
};

const experiences = [
  {
    role: "AI Developer",
    company: "Remote Clients",
    period: "Apr 2025 - Present",
    description:
      "Architected and deployed RAG-based AI chatbots with FastAPI + Qdrant. Built autonomous AI agent systems for enterprise workflow automation serving 500+ daily active users.",
    highlights: [
      "Reduced AI hallucination by 75% through improved context grounding",
      "Built multi-agent system processing 10,000+ requests/day",
      "Implemented human-in-the-loop approval workflows",
    ],
  },
  {
    role: "Web Application Developer & IT Consultant",
    company: "Tech Accuracy",
    period: "Jul 2025 - Present",
    description:
      "Built internal web tools and streamlined maintenance workflows. Implemented monitoring systems reducing potential downtime by 40%.",
    highlights: [
      "Developed internal dashboard used by 50+ team members",
      "Automated maintenance workflows saving 20+ hours/week",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Various Clients",
    period: "Jan 2024 - 2025",
    description:
      "Delivered multiple full-stack client applications using Next.js and Tailwind CSS. Integrated AI backends and improved SEO performance, achieving 90+ Lighthouse scores.",
    highlights: [
      "Delivered 15+ production applications",
      "Improved client SEO rankings by average of 45%",
      "Maintained 100% client satisfaction rate",
    ],
  },
];

const publications = [
  {
    title: "Difference between Generative AI and LLM — In simple and easy language",
    date: "May 14, 2025",
    url: "https://medium.com/@smujtabaja/difference-between-generative-ai-and-llm-in-simple-and-easy-language-af9fc34ccbd1",
    platform: "Medium",
  },
  {
    title: "The Strongest Encryption Algorithms in 2025: A Complete Guide to Modern Security",
    date: "March 17, 2025",
    url: "https://medium.com/@smujtabaja/the-strongest-encryption-algorithms-in-2025-a-complete-guide-to-modern-security-129fa8a80687",
    platform: "Medium",
  },
  {
    title: "Introduction to Machine Learning: A Beginner's Guide",
    date: "March 3, 2025",
    url: "https://medium.com/@smujtabaja/introduction-to-machine-learning-73c88b87fa2b",
    platform: "Medium",
  },
];

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <Header logoLink="/" />
      <main className="min-h-screen text-white header-offset">
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="container-premium relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative order-2 md:order-1 animate-slide-up">
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden glass-strong glow-cyan-soft">
                    <Image
                      src="/images/ProfileImage.jpeg"
                      alt="Sheikh Mujtaba - AI Developer and Security Engineer"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 flex items-center gap-2 animate-float">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-300">Available for projects</span>
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              <div className="order-1 md:order-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <span className="text-sm text-cyan-400 font-medium">AI Developer & Security Engineer</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  Sheikh <span className="text-gradient">Mujtaba</span>
                </h1>
                
                <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                  I build production-grade <span className="text-cyan-400 font-medium">Agentic AI systems</span> for real-world business automation.
                  With expertise in <span className="text-cyan-400 font-medium">RAG pipeline architecture</span>, multi-agent orchestration, and
                  secure-by-design development.
                </p>
                
                <p className="text-slate-500 mb-8">
                  Based in <span className="text-slate-300">Pakistan</span>, working with clients globally. I specialize in reducing AI
                  hallucination through proper context grounding and building secure AI infrastructure.
                </p>
                
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://github.com/Sheikh-Muhammad-Mujtaba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl transition-all duration-300 text-slate-300 hover:text-white hover:border-cyan-500/50"
                  >
                    <FaGithub className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl transition-all duration-300 text-slate-300 hover:text-white hover:border-cyan-500/50"
                  >
                    <FaLinkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                  <a
                    href="https://medium.com/@smujtabaja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl transition-all duration-300 text-slate-300 hover:text-white hover:border-cyan-500/50"
                  >
                    <FaMedium className="w-5 h-5" />
                    Medium
                  </a>
                  <a
                    href="mailto:smujtabaja@gmail.com"
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaEnvelope className="w-4 h-4" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Agentic AI Section */}
        <section className="section-padding relative border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
          <div className="container-premium relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What is <span className="text-gradient">Agentic AI?</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Understanding the next generation of AI systems
                </p>
              </div>
              
              <div className="glass rounded-2xl p-8 md:p-10 glow-cyan-soft">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  <span className="text-cyan-400 font-semibold">Agentic AI</span> refers to artificial intelligence systems that can autonomously take actions,
                  make decisions, and complete complex multi-step tasks without constant human intervention.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: "⚡", text: "Use tools to interact with external systems" },
                    { icon: "🧠", text: "Maintain context across interactions" },
                    { icon: "🔄", text: "Orchestrate multi-step workflows" },
                    { icon: "🤖", text: "Work autonomously on complex tasks" },
                    { icon: "👤", text: "Human-in-the-loop controls" },
                    { icon: "🔒", text: "Built-in safety and reliability" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-slate-400 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-slate-400 leading-relaxed">
                  I build these systems using <span className="text-cyan-400">OpenAI Agents SDK</span>, <span className="text-cyan-400">Gemini SDK</span>, and
                  <span className="text-cyan-400"> Claude API</span>, with careful attention to reliability, security, and human oversight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section-padding relative">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Technical <span className="text-gradient">Expertise</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Core competencies across AI, security, and development
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "AI & Machine Learning", color: "cyan", skills: skills.ai, icon: FaRobot },
                { title: "Security Engineering", color: "emerald", skills: skills.security, icon: FaShieldAlt },
                { title: "Development", color: "purple", skills: skills.development, icon: FaCode }
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <div 
                    key={index} 
                    className="card-premium p-6 md:p-8 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${category.color}-500/10 flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${category.color}-400`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-4 text-${category.color}-400`}>
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {category.skills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${category.color}-500/50 flex-shrink-0`} />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section-padding relative border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
          <div className="container-premium relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Professional <span className="text-gradient">Experience</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Building AI systems and securing infrastructure for global clients
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />
                
                <div className="flex flex-col gap-8">
                  {experiences.map((exp, index) => (
                    <div 
                      key={index} 
                      className="relative pl-12 md:pl-20 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-2 md:left-6 top-6 w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/30" />
                      
                      <div className="card-premium p-6 md:p-8">
                        <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                            <p className="text-cyan-400 font-medium">{exp.company}</p>
                          </div>
                          <span className="text-sm text-slate-400 glass px-3 py-1 rounded-full">{exp.period}</span>
                        </div>
                        <p className="text-slate-400 mb-4">{exp.description}</p>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="text-sm text-slate-500 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section className="section-padding relative">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Technical <span className="text-gradient">Writing</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Sharing knowledge about AI, security, and development
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {publications.map((pub, index) => (
                <a
                  key={index}
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium p-6 md:p-8 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-slate-500 glass px-2 py-1 rounded">
                      {pub.platform}
                    </span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-slate-500">{pub.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {pub.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
                    <span>Read article</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Me Section */}
        <section className="section-padding relative border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
          <div className="container-premium relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Work With <span className="text-gradient">Me?</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                What sets my approach apart from typical AI development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  title: "Production Experience", 
                  description: "I've built and deployed AI systems serving real users, not just prototypes. I understand the difference between demo-ready and production-ready.",
                  icon: "🚀"
                },
                { 
                  title: "Security-First Approach", 
                  description: "I apply security engineering principles to AI development from day one. Prompt injection testing, output validation, and safe architecture are built-in.",
                  icon: "🔒"
                },
                { 
                  title: "Context Grounding Specialist", 
                  description: "I specialize in techniques that reduce AI hallucination by 60-80% through proper RAG implementation, careful prompt engineering, and validation layers.",
                  icon: "🎯"
                },
                { 
                  title: "Full-Stack Capability", 
                  description: "I can architect complete systems from vector database to UI, not just AI components. This ensures cohesive, deployable solutions.",
                  icon: "⚙️"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="card-premium p-6 md:p-8 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
          <div className="container-premium relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="glass rounded-2xl p-8 md:p-12 glow-cyan-soft">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Let&apos;s Build Something <span className="text-gradient">Together</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Whether you need an AI agent system, RAG pipeline, security assessment, or full-stack application,
                  I&apos;m ready to help bring your vision to life.
                </p>
                <div className="flex gap-4 justify-center flex-wrap mb-8">
                  <a href="/services" className="btn-primary">
                    View Services & Pricing
                  </a>
                  <a href="mailto:smujtabaja@gmail.com" className="btn-secondary">
                    Get in Touch
                  </a>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    Pakistan Based
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    Global Clients
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    Remote Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
