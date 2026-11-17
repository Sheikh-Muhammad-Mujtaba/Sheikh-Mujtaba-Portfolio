import type { RolePage } from "../../utils/role-types";

export const aiEngineer: RolePage = {
  slug: "ai-engineer",
  role: "AI Engineer & AI Developer",
  title: "Sheikh Mujtaba | AI Engineer & AI Developer (Agentic AI, RAG)",
  heading: "Sheikh Mujtaba — AI Engineer & AI Developer",
  description:
    "Sheikh Mujtaba (Mujtaba Javed) is an AI engineer and AI developer from Pakistan who builds production agentic AI: multi-agent systems, RAG pipelines with Qdrant and pgvector, and AI employees with human approval.",
  focusKeyword: "AI engineer",
  keywords: [
    "Sheikh Mujtaba AI engineer",
    "Mujtaba Javed AI developer",
    "AI engineer Pakistan",
    "AI developer Pakistan",
    "agentic AI developer",
    "RAG developer",
    "multi-agent systems",
    "OpenAI Agents SDK developer",
    "hire AI developer",
  ],
  tags: ["Agentic AI", "RAG", "Multi-Agent"],
  skills: [
    "Agentic AI and multi-agent orchestration",
    "RAG pipelines with Qdrant and pgvector",
    "LLM integration (OpenAI, Gemini, Claude)",
    "OpenAI Agents SDK and Gemini SDK",
    "FastAPI and Next.js AI backends",
    "Human-in-the-loop controls and evaluation",
  ],
  summary:
    "I am Sheikh Mujtaba (Mujtaba Javed), an AI engineer who builds AI that does work, not just conversation: autonomous agents, multi-agent systems and retrieval pipelines that are grounded in real data and safe to run in production.",
  blocks: [
    { type: "h2", text: "From chatbot to AI employee" },
    {
      type: "p",
      text: "Most AI projects stop at a chatbot that answers questions. As an **AI engineer** I build the next layer: agents that use tools, keep context across a workflow, hand tasks between specialised agents, and stop for a human when an action is risky. That is what turns a demo into something a business can rely on.",
    },
    { type: "h2", text: "Digital FTE: autonomous AI employees" },
    {
      type: "p",
      text: "My largest builds are what I call Digital FTEs — AI employees that handle a role end to end. The **AI Employee Digital FTE** runs nine orchestrated services across cloud and local machines, with human-in-the-loop approvals and a secure Next.js and FastAPI dashboard. The **CRM Digital FTE** is a multi-channel customer success platform built on Gemini and the OpenAI Agents SDK, with semantic search and ticketing workflows.",
    },
    { type: "h2", text: "RAG pipelines that do not hallucinate" },
    {
      type: "p",
      text: "Retrieval-augmented generation grounds a model in your documents instead of its training data. I build RAG pipelines on Qdrant and PostgreSQL with pgvector, served through FastAPI, with strict context grounding so the system says \"I don't know\" rather than inventing an answer. My **AI Spec-Driven Documentation Platform** is a public example: a specification-first docs site with a grounded RAG chatbot.",
    },
    {
      type: "ul",
      items: [
        "**Chunking and indexing** tuned to the document type, not one fixed size.",
        "**Hybrid retrieval** and re-ranking so the right passage reaches the model.",
        "**Grounded answers** with citations back to the source.",
        "**Evaluation** on real questions before launch, and monitoring after.",
      ],
    },
    { type: "h2", text: "The stack I build with" },
    {
      type: "table",
      head: ["Layer", "Tools"],
      rows: [
        ["Models", "OpenAI, Gemini, Claude"],
        ["Agent frameworks", "OpenAI Agents SDK, Gemini SDK"],
        ["Retrieval", "Qdrant, PostgreSQL + pgvector"],
        ["Backend", "Python, FastAPI, Node.js"],
        ["Frontend", "Next.js, TypeScript, Tailwind CSS"],
        ["Automation", "n8n, custom Python workers"],
      ],
    },
    { type: "h2", text: "Security is part of the build" },
    {
      type: "p",
      text: "Because I also work as an [AI security engineer](/blog/ai-security-engineer), every agent I ship has least-privilege tools, approval gates on irreversible actions and defences against prompt injection from retrieved content. Read my guide on [agentic AI development in production](/blog/agentic-ai-development) for the full architecture.",
    },
    { type: "h2", text: "Smaller AI tools" },
    {
      type: "p",
      text: "Not everything needs a platform. **NuraShell** is a Python CLI agent published on PyPI that brings Gemini and ChatGPT into the terminal for shell automation, and **CryptoDataAgent** analyses crypto market data with the OpenAI Agents SDK.",
    },
  ],
  projects: [
    "ai-employee-digital-fte-business-autopilot",
    "crm-digital-fte-ai-customer-success-platform",
    "ai-spec-driven-documentation-platform",
    "nurashell",
    "cryptodataagent",
  ],
  guides: ["agentic-ai-development", "ai-integration-in-business-workflows", "ai-agent-security"],
  faqs: [
    {
      question: "Is Sheikh Mujtaba an AI engineer?",
      answer:
        "Yes. Sheikh Mujtaba (Mujtaba Javed) is an AI engineer and AI developer from Pakistan who builds agentic AI systems, multi-agent platforms and RAG pipelines for businesses.",
    },
    {
      question: "What is the difference between an AI engineer and a data scientist?",
      answer:
        "A data scientist mostly analyses data and trains models. An AI engineer builds production software around models: agents, retrieval pipelines, APIs, evaluation and the controls that keep them reliable.",
    },
    {
      question: "Which AI models do you work with?",
      answer:
        "OpenAI, Google Gemini and Anthropic Claude, chosen per task on cost, latency and quality, often behind one interface so they can be swapped.",
    },
    {
      question: "Can you build an AI agent for my business?",
      answer:
        "Yes. I start by mapping the workflow, then build an agent with the right tools, human approval for risky steps and measurable success criteria.",
    },
  ],
  updated: "2026-11-18",
};
