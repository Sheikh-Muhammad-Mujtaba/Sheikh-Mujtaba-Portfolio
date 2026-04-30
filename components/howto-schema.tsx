"use client";

import Script from "next/script";

// HowTo schema for building AI agent systems - targets "how to build AI agents" queries
export function HowToBuildAIAgents() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Build Production-Grade AI Agent Systems",
    description:
      "A comprehensive guide to building autonomous AI agents with multi-agent orchestration, tool integration, and human-in-the-loop controls for business automation.",
    totalTime: "P4W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "5000-15000",
    },
    supply: [
      "OpenAI API key or Gemini API key",
      "Python 3.10+",
      "FastAPI framework",
      "Vector database (Qdrant or PostgreSQL/pgvector)",
      "Next.js frontend (optional)",
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "OpenAI Agents SDK or Gemini SDK",
      },
      {
        "@type": "HowToTool",
        name: "LangChain or LlamaIndex",
      },
      {
        "@type": "HowToTool",
        name: "Docker",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Define Agent Scope and Tools",
        text: "Identify what tasks the AI agent should perform and what external tools it needs access to (APIs, databases, search, etc.). Create a tool registry with clear input/output schemas.",
        url: "https://sheikhmujtaba.me/#howto-step-1",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Set Up Vector Database for RAG",
        text: "Configure Qdrant or PostgreSQL with pgvector extension. Design document ingestion pipeline with proper chunking strategy (typically 500-1000 tokens with overlap). Implement embedding model (OpenAI text-embedding-3-small or similar).",
        url: "https://sheikhmujtaba.me/#howto-step-2",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Build Agent Core with SDK",
        text: "Initialize agent with OpenAI Agents SDK or Gemini SDK. Define system prompt with clear instructions, constraints, and output format. Implement tool calling mechanism with error handling and retry logic.",
        url: "https://sheikhmujtaba.me/#howto-step-3",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Implement Multi-Agent Orchestration",
        text: "For complex workflows, design agent hierarchy with supervisor and worker agents. Use message passing or shared state for coordination. Implement workflow patterns: sequential, parallel, or conditional branching.",
        url: "https://sheikhmujtaba.me/#howto-step-4",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Add Human-in-the-Loop Controls",
        text: "Design approval checkpoints for high-stakes actions. Implement notification system for human review. Create rollback mechanisms for rejected actions. Build admin dashboard for monitoring and intervention.",
        url: "https://sheikhmujtaba.me/#howto-step-5",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Deploy and Monitor",
        text: "Containerize with Docker and deploy to cloud (AWS, GCP, or Azure). Set up logging and observability (LangSmith, Langfuse, or custom). Implement rate limiting and cost controls. Create feedback loop for continuous improvement.",
        url: "https://sheikhmujtaba.me/#howto-step-6",
      },
    ],
  };

  return (
    <Script
      id="howto-ai-agents"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// HowTo schema for security assessment - targets "how to secure AI systems" queries
export function HowToSecureAISystems() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Conduct AI Red Teaming and Security Assessment",
    description:
      "Step-by-step guide to testing AI systems for security vulnerabilities including prompt injection, jailbreak attempts, and output validation.",
    totalTime: "P1W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "3000-8000",
    },
    tool: [
      { "@type": "HowToTool", name: "Burp Suite" },
      { "@type": "HowToTool", name: "Custom prompt injection scripts" },
      { "@type": "HowToTool", name: "Jailbreak attempt libraries" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Reconnaissance and Scope Definition",
        text: "Identify all AI system entry points: chat interfaces, API endpoints, file uploads, and embedded prompts. Document system capabilities, data access levels, and integration points. Define attack surface boundaries.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Prompt Injection Testing",
        text: "Test for direct prompt injection (user input that overrides system instructions). Attempt indirect injection (malicious content in documents, emails, or data sources that the AI processes). Use techniques like ignore previous instructions, role reversal, and delimiter injection.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Jailbreak and Safety Bypass Testing",
        text: "Attempt to bypass safety filters using: roleplay scenarios, fictional framing, encoding tricks (base64, ROT13), translation attacks, and persona adoption. Document which safety guidelines can be circumvented.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Output Validation Testing",
        text: "Test if AI outputs can be manipulated to: reveal system prompts, expose sensitive training data, generate harmful content, or leak internal configuration. Verify output filtering effectiveness.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Data Exfiltration Testing",
        text: "Attempt to trick AI into revealing: source code, internal API documentation, private user data, or proprietary business information. Test if RAG systems leak information from restricted documents.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Remediation and Hardening",
        text: "Implement defense layers: input sanitization and validation, output filtering and review, principle of least privilege for tool access, rate limiting and monitoring, and regular red team retesting. Document all findings and fixes.",
      },
    ],
  };

  return (
    <Script
      id="howto-security"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// BreadcrumbList schema for better AI understanding of site structure
export function BreadcrumbSchema() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sheikhmujtaba.me",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://sheikhmujtaba.me/#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: "https://sheikhmujtaba.me/#projects",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "FAQ",
        item: "https://sheikhmujtaba.me/#faq",
      },
    ],
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
