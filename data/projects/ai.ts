import type { ProjectDetail } from "../../utils/project-detail-types";

export const aiProjects: ProjectDetail[] = [
  {
    slug: "crm-digital-fte-ai-customer-success-platform",
    focusKeyword: "AI customer success platform",
    summary:
      "CRM Digital FTE is an AI customer success platform that takes customer requests from a web form, WhatsApp and email, works them with an AI agent, and hands anything sensitive to a human. Sheikh Mujtaba built it end to end: intake, agent, async workers, database and the admin dashboard.",
    stack: [
      "Python",
      "FastAPI",
      "OpenAI Agents SDK",
      "Gemini",
      "PostgreSQL + pgvector",
      "Apache Kafka",
      "SQLAlchemy (async)",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker Compose",
      "Pytest",
    ],
    blocks: [
      { type: "h2", text: "What the platform does" },
      {
        type: "p",
        text: "Support teams answer the same questions across several channels and lose context every time a customer switches from email to WhatsApp. CRM Digital FTE puts every channel behind one intake layer and one AI agent, so each conversation is handled with the customer's full history and the company's knowledge base — at any hour.",
      },
      {
        type: "ul",
        items: [
          "**Multi-channel intake** — a web form, WhatsApp (via Twilio) and Gmail all feed one normalised event format.",
          "**AI agent workflow** — the agent searches the knowledge base, reads customer history, creates tickets, escalates and sends the reply.",
          "**Human-in-the-loop** — escalated cases go to a person, who can hand the conversation back to the agent with instructions.",
          "**Admin operations** — a dark-theme dashboard to manage ticket status and clean up conversations in bulk.",
        ],
      },
      { type: "h2", text: "Architecture" },
      {
        type: "p",
        text: "Requests arrive at a FastAPI intake router and are published to a Kafka topic, so a spike in traffic queues instead of timing out. A message worker consumes the topic and runs the customer success agent, built on the OpenAI Agents SDK with Gemini served through its OpenAI-compatible endpoint. The agent's tools — `search_knowledge_base`, `get_customer_history`, `create_ticket`, `escalate_to_human` and `send_response` — all read and write PostgreSQL, with pgvector providing semantic search over the knowledge base.",
      },
      {
        type: "table",
        head: ["Layer", "What it does"],
        rows: [
          ["Intake", "FastAPI routers for web, Twilio WhatsApp and Gmail"],
          ["Queue", "Kafka topic decouples intake from processing"],
          ["Agent", "OpenAI Agents SDK + Gemini with five scoped tools"],
          ["Data", "PostgreSQL with pgvector, managed with Alembic migrations"],
          ["Dashboard", "Next.js, React, TypeScript and Tailwind CSS"],
        ],
      },
      { type: "h2", text: "Design decisions" },
      {
        type: "p",
        text: "Two choices shaped the build. First, asynchronous processing: channels never wait on the model, which keeps webhooks fast and makes retries safe. Second, narrow tools: the agent can only act through a handful of explicit functions, which makes its behaviour testable and limits the damage a confused or manipulated model can do — the same principle covered in my guide to [AI agent security](/blog/ai-agent-security).",
      },
      {
        type: "p",
        text: "The project ships with Docker Compose for local development, Kubernetes manifests for deployment, a Pytest suite and a written specification, so it can be run, tested and extended by another engineer.",
      },
    ],
    role: "ai-engineer",
    guides: ["agentic-ai-development", "ai-agent-security", "rag-security"],
    faqs: [
      {
        question: "Which channels does CRM Digital FTE support?",
        answer: "A web form, WhatsApp through Twilio, and email through Gmail, all normalised into one event format.",
      },
      {
        question: "Does the AI reply without human oversight?",
        answer:
          "It answers routine requests itself and escalates to a human when needed. A person can then hand the conversation back to the agent with instructions.",
      },
      {
        question: "Is the code available?",
        answer: "Yes, the source code is public on GitHub.",
      },
    ],
  },
  {
    slug: "ai-employee-digital-fte-business-autopilot",
    focusKeyword: "autonomous AI employee",
    summary:
      "AI Employee Digital FTE is an autonomous AI employee that drafts email, social posts, WhatsApp replies and ERPNext accounting tasks around the clock — and executes nothing until a human approves it. Sheikh Mujtaba designed and built its cloud-plus-local architecture, nine services and approval dashboard.",
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "SQLAlchemy",
      "Claude Code / Qwen Code / Gemini CLI",
      "Playwright",
      "ERPNext",
      "WhatsApp (Baileys)",
      "MCP servers",
      "Obsidian vault",
      "Git sync",
    ],
    blocks: [
      { type: "h2", text: "An executive assistant that never sleeps" },
      {
        type: "p",
        text: "Small business owners spend hours a day on inboxes, social media and bookkeeping. This project turns that work into a pipeline: watchers notice new work, an AI agent drafts the response, and the owner approves or rejects each action from a dashboard. The README calls it the Platinum tier — cloud watchers running 24/7, with execution kept on the owner's own machine.",
      },
      { type: "h2", text: "Nine orchestrated services" },
      {
        type: "p",
        text: "A single `start.bat` launches the whole system:",
      },
      {
        type: "ul",
        items: [
          "**Dashboard API** (FastAPI) and **Dashboard UI** (Next.js) with JWT login.",
          "**WhatsApp** through Baileys, paired by QR code.",
          "**Orchestrator** that watches vault folders for new tasks.",
          "**Gmail, LinkedIn, Twitter/X and Facebook watchers** that queue new work.",
          "**ERPNext watcher** for accounting, audit reports and project planning.",
        ],
      },
      { type: "h2", text: "Human-in-the-loop by design" },
      {
        type: "p",
        text: "Every action requires approval before it runs. Drafts land in a Markdown vault (readable in Obsidian), the dashboard shows them as tasks, and nothing is sent, posted or booked until the owner clicks approve. This is the control that makes an autonomous agent safe to give real credentials to — and it is the pattern I recommend in [agentic AI development in production](/blog/agentic-ai-development).",
      },
      { type: "h2", text: "Cloud and local, without leaking secrets" },
      {
        type: "p",
        text: "The cloud side watches for work; the local side executes it. The two sync through a Git-backed vault, and credentials never sync — they stay on the machine that uses them. All actions are logged and auditable. The agent layer is swappable: Claude Code, Qwen Code or Gemini CLI can drive it, and Playwright handles browser tasks where no API exists.",
      },
      {
        type: "callout",
        title: "Why it matters",
        text: "The hard part of an AI employee is not drafting text — it is giving it access to real systems without losing control. Approval gates, local execution and non-syncing credentials are what make that possible.",
      },
    ],
    role: "ai-engineer",
    guides: ["agentic-ai-development", "ai-integration-in-business-workflows", "mcp-security"],
    faqs: [
      {
        question: "Can the AI employee act without approval?",
        answer: "No. Every action is drafted first and runs only after a human approves it in the dashboard.",
      },
      {
        question: "Which AI models can drive it?",
        answer: "Claude Code, Qwen Code or Gemini CLI, chosen at setup.",
      },
      {
        question: "Does it integrate with ERPNext?",
        answer: "Yes. An ERPNext watcher and MCP server handle accounting, audit reports and project planning tasks.",
      },
    ],
  },
  {
    slug: "ai-spec-driven-documentation-platform",
    focusKeyword: "RAG chatbot documentation platform",
    summary:
      "The AI Spec-Driven Documentation Platform is a published textbook on Physical AI and humanoid robotics with a built-in RAG chatbot that answers readers' questions from the book itself. Sheikh Mujtaba built it through a specification-driven process with a FastAPI and Qdrant backend.",
    stack: ["Docusaurus", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Qdrant", "OpenAI Python SDK", "Vercel"],
    blocks: [
      { type: "h2", text: "A textbook you can talk to" },
      {
        type: "p",
        text: "The site hosts “Physical AI & Humanoid Robotics – AI-Native Systems”: five modules of three chapters each, covering the foundations of Physical AI, humanoid robot design, AI-native systems, perception and sensor fusion, and motion planning and control. A floating chat widget lets readers ask questions, and the RAG backend answers from the book's own content rather than from the model's general knowledge.",
      },
      { type: "h2", text: "Specification-driven development" },
      {
        type: "p",
        text: "The project was built against a written constitution of fifteen rules that every change had to satisfy. A few examples show the discipline involved:",
      },
      {
        type: "ul",
        items: [
          "The backend must use the OpenAI Python SDK behind an adapter, so the model provider can change.",
          "The chatbot is a collapsible floating widget rendered once at the root, with chat state in a React Context.",
          "Sessions use version-4 UUIDs, and the chatbot shows a friendly error if the backend is offline.",
          "Every custom component supports light and dark mode, and the build must pass with zero broken links.",
          "The FastAPI backend ships with CORS middleware and secrets stay in Vercel environment variables.",
        ],
      },
      { type: "h2", text: "Grounded answers with Qdrant" },
      {
        type: "p",
        text: "Chapters are chunked and embedded into Qdrant. When a reader asks a question, the backend retrieves the most relevant passages and the model answers only from them — strict context grounding that keeps the chatbot from inventing robotics facts. The same retrieval patterns, and their risks, are covered in my [RAG security guide](/blog/rag-security).",
      },
      { type: "h2", text: "Built for search" },
      {
        type: "p",
        text: "Docusaurus provides sitemaps, meta tags and image optimisation, and placeholder URLs are rewritten automatically to keep internal links intact. The frontend and the API deploy together on Vercel from one repository.",
      },
    ],
    role: "ai-engineer",
    guides: ["rag-security", "agentic-ai-development", "llm-guardrails"],
    faqs: [
      {
        question: "What is spec-driven development?",
        answer:
          "Writing explicit, testable rules for the system first and building every change against them, so AI-assisted code stays consistent and verifiable.",
      },
      {
        question: "Where does the chatbot get its answers?",
        answer: "From passages of the textbook retrieved from a Qdrant vector database, not from the model's general training.",
      },
      {
        question: "Can I read the book?",
        answer: "Yes, it is live on Vercel and the source is public on GitHub.",
      },
    ],
  },
  {
    slug: "nurashell",
    focusKeyword: "AI terminal assistant",
    summary:
      "NuraShell (published on PyPI as NuralShell) is an AI terminal assistant that turns plain-English requests into shell commands and file edits, asking for confirmation before anything runs. Sheikh Mujtaba built it in Python with support for both ChatGPT and Gemini.",
    stack: ["Python", "OpenAI API", "Google Gemini", "CLI", "PyPI"],
    blocks: [
      { type: "h2", text: "Talk to your server" },
      {
        type: "p",
        text: "Deploying and maintaining servers means remembering dozens of commands. NuraShell lets you describe the task instead — “update the system packages”, “read my_script.py” — and proposes the exact command or file change to make it happen.",
      },
      { type: "h2", text: "Safety first: confirm before execute" },
      {
        type: "p",
        text: "Because it can run with root permissions, NuraShell never executes a command silently. It shows the command it intends to run and waits for a Y/N confirmation. That one design choice is the difference between a useful assistant and a dangerous one, and it mirrors the human-approval pattern I use in every production agent.",
      },
      {
        type: "code",
        lang: "text",
        code: "You: Update the system packages.\nNuralShell: Do you want to Execute `sudo apt update && sudo apt upgrade -y`? (Y/N)\nYou: Y",
      },
      { type: "h2", text: "Features" },
      {
        type: "ul",
        items: [
          "**Command execution** with explicit confirmation.",
          "**File reading and writing** for code, configuration and data.",
          "**Persistent chat history** across sessions, so context carries over.",
          "**Choice of model** — OpenAI/ChatGPT or Google Gemini, configured on first run or through `OPENAI_API_KEY` / `GEMINI_API_KEY`.",
          "**Modular design** with sub-agents for command execution and file I/O.",
        ],
      },
      { type: "h2", text: "Install" },
      { type: "code", lang: "bash", code: "pip install NuralShell\nnuralshell" },
      {
        type: "p",
        text: "On first launch a one-time setup stores the chosen model and key in `~/.NuralShell/config.json`.",
      },
    ],
    role: "ai-engineer",
    guides: ["ai-agent-security", "agentic-ai-development"],
    faqs: [
      {
        question: "Does NuraShell run commands automatically?",
        answer: "No. It always shows the command and asks for confirmation before running it.",
      },
      {
        question: "Which models does it support?",
        answer: "OpenAI/ChatGPT and Google Gemini.",
      },
      {
        question: "How do I install it?",
        answer: "With pip: `pip install NuralShell`, then run `nuralshell`.",
      },
    ],
  },
  {
    slug: "cryptodataagent",
    focusKeyword: "crypto data analysis agent",
    summary:
      "CryptoDataAgent is a crypto data analysis agent built with Node.js and the OpenAI Agents SDK. It answers questions about crypto markets by calling data tools rather than guessing from the model's memory.",
    stack: ["Node.js", "OpenAI Agents SDK", "TypeScript / JavaScript"],
    blocks: [
      { type: "h2", text: "Why an agent for market data" },
      {
        type: "p",
        text: "Language models are confident about prices they cannot know. Crypto markets move every second, so any answer from training data is stale. An agent fixes that by treating the model as a reasoner, not a database: it decides which data it needs, calls a tool to fetch it, and explains the result.",
      },
      { type: "h2", text: "How it works" },
      {
        type: "p",
        text: "CryptoDataAgent is built on the OpenAI Agents SDK in Node.js. The agent receives a question, plans the steps, calls data tools, and composes an answer from what those tools return. Keeping the facts in tool output — not in the prompt — is what makes the answers checkable.",
      },
      {
        type: "ol",
        items: [
          "Parse the user's question and decide what data is needed.",
          "Call the relevant data tools.",
          "Analyse the returned figures.",
          "Answer in plain language, grounded in the fetched data.",
        ],
      },
      { type: "h2", text: "What it demonstrates" },
      {
        type: "p",
        text: "This is a compact example of the tool-use pattern behind larger systems like my Digital FTE platforms: define narrow tools, let the model choose between them, and never let it invent the facts it should be fetching. The same pattern, applied safely, is described in [agentic AI development](/blog/agentic-ai-development).",
      },
      {
        type: "callout",
        title: "Not financial advice",
        text: "An analysis agent explains data; it does not replace judgement. Any trading decision should rest with a person.",
      },
    ],
    role: "ai-engineer",
    guides: ["agentic-ai-development", "ai-agent-security"],
    faqs: [
      {
        question: "What is CryptoDataAgent built with?",
        answer: "Node.js and the OpenAI Agents SDK.",
      },
      {
        question: "Why use tools instead of asking the model directly?",
        answer: "Market data changes constantly, so the agent fetches current figures through tools instead of relying on stale training data.",
      },
    ],
  },
  {
    slug: "learning-management-system-lms",
    focusKeyword: "learning management system",
    summary:
      "This learning management system (LMS) is a full-stack platform for courses: enrolment, role-based dashboards for students and staff, secure sign-in and progress tracking. Sheikh Mujtaba built it with Next.js, PostgreSQL, Python and Tailwind CSS.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Python", "Tailwind CSS"],
    blocks: [
      { type: "h2", text: "What the LMS covers" },
      {
        type: "p",
        text: "An LMS has to serve very different users from one system: learners who want to find and finish courses, and instructors or administrators who manage content and watch progress. This project brings those roles together.",
      },
      {
        type: "ul",
        items: [
          "**Enrolment** — learners join courses and see them in their own dashboard.",
          "**Role-based dashboards** — each role sees only the tools and data it needs.",
          "**Secure authentication** — sign-in with access enforced on the server.",
          "**Progress tracking** — learners and staff can see how far each person has come.",
        ],
      },
      { type: "h2", text: "Architecture" },
      {
        type: "p",
        text: "The frontend is Next.js with Tailwind CSS, rendered on the server for speed. Course, user and progress data live in PostgreSQL, a good fit for the relational shape of enrolments and completions. Python handles backend services.",
      },
      { type: "h2", text: "Access control done properly" },
      {
        type: "p",
        text: "The most common LMS security bug is broken access control — a student changing an ID in the URL and seeing someone else's grades. Role checks here run on the server for every request, never only in the interface. That habit comes from my [ethical hacking](/ethical-hacker) work, where IDOR and privilege escalation are among the first things I test.",
      },
      { type: "h2", text: "Where it fits" },
      {
        type: "p",
        text: "Training companies, schools and internal academies all need the same core: content, enrolment, roles and progress. The same building blocks extend to certificates, assessments or integration with an ERP such as ERPNext for billing.",
      },
    ],
    role: "full-stack-developer",
    guides: ["ai-integration-in-business-workflows"],
    faqs: [
      {
        question: "What stack is the LMS built on?",
        answer: "Next.js, PostgreSQL, Python and Tailwind CSS.",
      },
      {
        question: "Does it support different user roles?",
        answer: "Yes, it has role-based dashboards with access enforced on the server.",
      },
    ],
  },
];
