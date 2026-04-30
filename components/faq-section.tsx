"use client";

import { useState } from "react";
import { FaChevronDown, FaRobot, FaDatabase, FaShieldAlt, FaCode, FaClock, FaGlobe, FaLightbulb, FaUserCheck, FaProjectDiagram } from "react-icons/fa";
import Script from "next/script";

const faqIcons = [
  FaRobot, FaDatabase, FaCode, FaShieldAlt, FaLightbulb, 
  FaClock, FaUserCheck, FaGlobe, FaProjectDiagram, FaRobot
];

const faqs = [
  {
    question: "What is Agentic AI and how does it differ from traditional AI?",
    answer:
      "Agentic AI refers to AI systems that can autonomously take actions, make decisions, and complete multi-step tasks without constant human intervention. Unlike traditional AI that responds to single prompts, agentic systems use tools, maintain context across interactions, and can orchestrate complex workflows. I specialize in building these systems using OpenAI Agents SDK, Gemini SDK, and Claude API with human-in-the-loop controls for reliability.",
  },
  {
    question: "What is a RAG pipeline and why is it important for AI applications?",
    answer:
      "RAG (Retrieval Augmented Generation) is an architecture that grounds LLM responses in specific data sources rather than relying solely on training data. It works by retrieving relevant documents from a vector database (like Qdrant or PostgreSQL/pgvector), then providing that context to the LLM for accurate, hallucination-resistant responses. RAG is crucial for business applications requiring factual accuracy, data privacy, and domain-specific knowledge.",
  },
  {
    question: "What services does Sheikh Mujtaba offer?",
    answer:
      "I offer four main service categories: (1) AI Agent Development - building autonomous multi-agent systems for business automation, (2) RAG Pipeline Architecture - designing production-grade retrieval systems with vector databases, (3) Security Engineering - web app pentesting, AI red teaming, and secure architecture review, and (4) Full-Stack Development - end-to-end web applications using Next.js and FastAPI. I also provide consulting and advisory services.",
  },
  {
    question: "What is AI red teaming and why do businesses need it?",
    answer:
      "AI red teaming is the practice of systematically testing AI systems for security vulnerabilities, particularly prompt injection attacks, jailbreak attempts, and output manipulation. As businesses deploy AI systems that interact with sensitive data or make decisions, red teaming identifies weaknesses before malicious actors do. I conduct comprehensive AI security assessments using both automated tools and manual testing methodologies.",
  },
  {
    question: "What tech stack does Sheikh Mujtaba specialize in?",
    answer:
      "My core stack includes: Frontend (Next.js 15, React 19, TypeScript, Tailwind CSS), Backend (FastAPI, Python, Node.js), AI/ML (OpenAI Agents SDK, Gemini SDK, Claude API, LangChain), Databases (PostgreSQL with pgvector, Qdrant vector database), DevOps (Vercel, Docker, cloud deployment), and Automation (n8n workflows). This full-stack capability allows me to architect complete systems from database to UI.",
  },
  {
    question: "How long does it take to build an AI agent system?",
    answer:
      "Timeline depends on complexity: A basic single-agent system with 2-3 tools takes 1-2 weeks ($2,500-$5,000). A multi-agent orchestration with RAG integration and human-in-the-loop controls takes 2-4 weeks ($5,000-$15,000). Enterprise systems with complex integrations, SSO, and SLA requirements take 4-8 weeks ($15,000+). I provide detailed timelines during project scoping.",
  },
  {
    question: "What makes Sheikh Mujtaba's approach to AI development unique?",
    answer:
      "Three key differentiators: (1) Security-first architecture - I apply security engineering principles to AI systems from day one, (2) Context grounding expertise - I specialize in techniques that minimize AI hallucination through proper RAG implementation and validation, and (3) Full-stack delivery - I can build complete systems including vector databases, APIs, and user interfaces, not just AI components. This ensures cohesive, production-ready solutions.",
  },
  {
    question: "Does Sheikh Mujtaba work with international clients?",
    answer:
      "Yes, I work with clients globally. I'm based in Pakistan (PKT, UTC+5) but have successfully delivered projects for US, European, and Middle Eastern clients. I communicate primarily via email and video calls, with flexible scheduling to accommodate different timezones. Payment is accepted via bank transfer (Wise, Payoneer), cryptocurrency (USDC, ETH), or PayPal for smaller projects.",
  },
  {
    question: "What is the typical engagement process?",
    answer:
      "The process is: (1) Initial consultation - discuss requirements, timeline, and budget, (2) Proposal - detailed scope, deliverables, and pricing, (3) Kickoff - 50% upfront payment and project initiation, (4) Development - regular async updates and milestone reviews, (5) Delivery - remaining payment, code handover, deployment, and knowledge transfer, (6) Support - 30-day post-launch bug fix support included.",
  },
  {
    question: "Can I see examples of Sheikh Mujtaba's previous work?",
    answer:
      "Absolutely. My portfolio at sheikhmujtaba.me showcases 25+ projects including: (1) CRM Digital FTE - an autonomous customer success platform with AI agents, (2) AI Employee Digital FTE - a 9-service orchestrated business automation system, (3) NuraShell - a CLI AI agent published on PyPI, and (4) Various full-stack applications with AI integration. Each project includes code repositories, live demos, and detailed descriptions.",
  },
];

export function FAQJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const Icon = faqIcons[index % faqIcons.length];
        return (
          <div
            key={index}
            className={`card-premium overflow-hidden animate-slide-up ${
              openIndex === index ? "border-cyan-500/40 glow-cyan-soft" : ""
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center gap-4 p-5 md:p-6 text-left group"
              aria-expanded={openIndex === index ? "true" : "false"}
            >
              {/* Number Badge */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                openIndex === index 
                  ? "bg-cyan-500/20 text-cyan-400" 
                  : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"
              }`}>
                <span className="font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
              </div>
              
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                openIndex === index 
                  ? "bg-cyan-500 text-white" 
                  : "bg-slate-800 text-slate-400 group-hover:text-cyan-400"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Question */}
              <span className={`flex-1 font-semibold text-base md:text-lg pr-4 transition-colors duration-300 ${
                openIndex === index ? "text-cyan-400" : "text-slate-200 group-hover:text-white"
              }`}>
                {faq.question}
              </span>
              
              {/* Chevron */}
              <FaChevronDown
                className={`flex-shrink-0 w-5 h-5 text-slate-500 transition-all duration-300 ${
                  openIndex === index ? "rotate-180 text-cyan-400" : "group-hover:text-slate-400"
                }`}
              />
            </button>
            
            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                openIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[120px]">
                <div className="h-px bg-gradient-to-r from-cyan-500/20 to-transparent mb-4" />
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
