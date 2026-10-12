import type { BlogPost } from "../../utils/blog-types";

export const aiSecurityEngineer: BlogPost = {
  slug: "ai-security-engineer",
  title: "What Is an AI Security Engineer? Role & Skills (2026)",
  heading: "What an AI Security Engineer Actually Does",
  description:
    "A practical explainer of the AI security engineer role: what they protect, their day-to-day responsibilities, the skills it takes, how it differs from AppSec and ML engineering, and the frameworks they rely on — OWASP LLM Top 10, MITRE ATLAS and NIST AI RMF.",
  focusKeyword: "AI security engineer",
  keywords: [
    "AI security engineer",
    "AI security engineer skills",
    "AI security engineer responsibilities",
    "LLM security engineer",
    "what does an AI security engineer do",
    "AI security engineer vs AppSec engineer",
    "AI security engineer role",
    "machine learning security engineer",
    "generative AI security",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 10,
  excerpt:
    "An AI security engineer secures the parts of a system that reason, retrieve and act. Here is what the role covers, how it differs from AppSec and ML engineering, and what the work looks like day to day.",
  related: ["how-to-become-an-ai-security-engineer", "ai-security", "prompt-injection"],
  blocks: [
    {
      type: "p",
      text: "An **AI security engineer** is the person responsible for making sure that systems built on machine learning models — today, mostly large language models — cannot be turned against the people and organisations that run them. That covers the model, the data it sees, the pipeline that feeds it, and, increasingly, the tools and permissions it holds when it acts as an agent. The job title is new; the discipline underneath it is ordinary security engineering applied to a component that does not behave like ordinary software.",
    },
    {
      type: "callout",
      title: "The short definition",
      text: "An AI security engineer threat-models, tests and hardens systems where a model sits in the decision path. The core skill is not knowing clever jailbreaks — it is designing systems so that a manipulated model cannot cause real damage.",
    },
    { type: "h2", text: "Why the role exists now" },
    {
      type: "p",
      text: "Traditional application security assumes code does what it was written to do, so you look for places where untrusted input reaches a dangerous sink. An LLM breaks that assumption. Its instructions and its data travel on the same channel, and it will sometimes follow instructions it finds inside a document, an email or a web page. That single property — explored in depth in [prompt injection](/blog/prompt-injection) — means the model itself is a confused deputy waiting to happen.",
    },
    {
      type: "p",
      text: "For a while that was a curiosity, because chatbots could only produce text. Once teams started wiring models into retrieval systems, internal APIs, email, payments and code execution, the consequences became concrete. Someone has to own the question \"what happens when the model is wrong on purpose?\", and that person is the AI security engineer.",
    },
    { type: "h2", text: "What an AI security engineer protects" },
    {
      type: "p",
      text: "The attack surface is wider than the model. In practice, an AI security engineer is responsible for five layers:",
    },
    {
      type: "table",
      head: ["Asset", "What goes wrong", "Typical control"],
      rows: [
        [
          "The model and its prompts",
          "Jailbreaks, system prompt leakage, behaviour drift after a provider upgrade",
          "Pinned versions, prompts in version control, regression tests",
        ],
        [
          "Data (training, fine-tuning, retrieval)",
          "Poisoned documents, cross-tenant leakage, sensitive data in outputs",
          "Provenance checks, per-chunk access control, egress scanning",
        ],
        [
          "Pipelines",
          "Untrusted model files, compromised dependencies, unreviewed prompt changes",
          "Supply-chain hygiene, signed artefacts, change review",
        ],
        [
          "Agents",
          "The model is talked into an action it should not take",
          "Least privilege, human approval for irreversible actions",
        ],
        [
          "Tool integrations",
          "Over-scoped credentials, malicious tool servers, chained tool abuse",
          "User-scoped credentials, tool allow-lists, audit logging",
        ],
      ],
    },
    {
      type: "p",
      text: "The last two rows are where most of the new risk lives. An agent that can read a ticket and issue a refund, or a coding assistant that can run shell commands, turns a text-generation problem into an authorisation problem. Protocols such as the Model Context Protocol make it easy to connect dozens of tools, which is exactly why [MCP security](/blog/mcp-security) and [AI agent security](/blog/ai-agent-security) have become their own specialisms.",
    },
    { type: "h2", text: "AI security engineer responsibilities, day to day" },
    { type: "h3", text: "Threat modelling LLM features" },
    {
      type: "p",
      text: "Before anything ships, the AI security engineer maps the system: every input channel (chat, uploads, email ingestion, fetched URLs), every data source the model can retrieve from, and every tool it can call. For each, the question is who can write content that reaches the model, and what the model can do afterwards. The useful output is a short list of trust boundaries and the controls that enforce them — not a fifty-page document.",
    },
    { type: "h3", text: "Red teaming" },
    {
      type: "p",
      text: "Red teaming is the hands-on part: authorised, scoped attempts to make the system misbehave. Direct and indirect prompt injection, system prompt extraction, data-boundary tests against retrieval, tool abuse and output-handling attacks. The deliverable is a set of reproducible findings with severity, and — critically — the attacks turned into regression tests. The method is covered in more detail in [AI red teaming](/blog/ai-red-teaming).",
    },
    { type: "h3", text: "Guardrail design" },
    {
      type: "p",
      text: "Guardrails are the layered controls around the model: input normalisation and classification, context separation, output validation, and permission checks at the tool boundary. A good AI security engineer is opinionated about which of these are real boundaries and which are speed bumps. Classifiers and filters reduce attack success rates; authorisation in code and human approval contain the damage when they fail. See [LLM guardrails](/blog/llm-guardrails) for how the layers fit together.",
    },
    { type: "h3", text: "Secure SDLC for LLM features" },
    {
      type: "ul",
      items: [
        "Reviewing prompts, tool schemas and retrieval configuration as security-relevant code.",
        "Keeping injection and authorisation tests in CI so a one-line prompt edit cannot silently reopen a finding.",
        "Gating new tools and new data sources behind a lightweight security review.",
        "Setting rules for model provenance: pinned versions, known publishers, no loading of untrusted serialised model files.",
      ],
    },
    { type: "h3", text: "Monitoring and incident response" },
    {
      type: "p",
      text: "When something goes wrong, the questions are the usual ones — what happened, to whom, and how do we stop it — but the evidence is different. The AI security engineer makes sure every prompt, retrieval, tool call and output is traced to a real user, that alerts exist for unusual tool sequences and cost spikes, and that there is a tested kill switch for an agent or a single tool. Incident response for an LLM feature usually means revoking a credential, disabling a tool, replaying the trace and fixing the architecture, not just rewording the prompt.",
    },
    { type: "h2", text: "AI security engineer vs AppSec engineer vs ML engineer" },
    {
      type: "p",
      text: "The role overlaps with two established ones, and the overlap causes most of the confusion about what it is. The clearest way to see the difference is by what each person is trying to prevent.",
    },
    {
      type: "table",
      head: ["", "AppSec engineer", "ML engineer", "AI security engineer"],
      rows: [
        [
          "Primary goal",
          "Code and infrastructure that cannot be abused",
          "Models that are accurate, fast and cost-effective",
          "Model-driven systems that cannot be turned against their owners",
        ],
        [
          "Mental model of the component",
          "Deterministic code with input sinks",
          "A statistical function to optimise",
          "An untrusted, steerable decision-maker",
        ],
        [
          "Typical findings",
          "SQL injection, XSS, broken access control",
          "Overfitting, drift, latency, evaluation gaps",
          "Prompt injection, excessive agency, RAG data leakage, unsafe output handling",
        ],
        [
          "Testing method",
          "SAST, DAST, manual pentesting",
          "Offline evals, A/B tests, benchmarks",
          "Adversarial prompting, indirect injection, tool-abuse scenarios, plus classic pentesting",
        ],
        [
          "Core frameworks",
          "OWASP Top 10, ASVS",
          "Internal eval suites, model cards",
          "OWASP Top 10 for LLM Applications, MITRE ATLAS, NIST AI RMF",
        ],
        [
          "Where they fix things",
          "Code, configuration, dependencies",
          "Data, training, architecture of the model",
          "System architecture around the model: permissions, boundaries, approvals",
        ],
      ],
    },
    {
      type: "p",
      text: "In practice, the strongest AI security engineers come from the AppSec side and learn enough about models to reason about their failure modes. That is not a rule — ML engineers with an adversarial mindset make excellent ones too — but most of the real damage in LLM systems still arrives through classic weaknesses: an over-privileged credential, unescaped output rendered as HTML, a missing authorisation check. The model is the new entry point; the blast radius is usually old-fashioned.",
    },
    { type: "h2", text: "The frameworks an AI security engineer uses" },
    { type: "h3", text: "OWASP Top 10 for LLM Applications (2025)" },
    {
      type: "p",
      text: "The [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/), maintained by the OWASP GenAI Security Project, is the most practical checklist for application-level work. The 2025 edition lists:",
    },
    {
      type: "ol",
      items: [
        "**LLM01** Prompt Injection",
        "**LLM02** Sensitive Information Disclosure",
        "**LLM03** Supply Chain",
        "**LLM04** Data and Model Poisoning",
        "**LLM05** Improper Output Handling",
        "**LLM06** Excessive Agency",
        "**LLM07** System Prompt Leakage",
        "**LLM08** Vector and Embedding Weaknesses",
        "**LLM09** Misinformation",
        "**LLM10** Unbounded Consumption",
      ],
    },
    {
      type: "p",
      text: "I use it as a coverage check at the end of a threat model rather than as the starting point; a walkthrough of each entry with concrete tests is in [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications).",
    },
    { type: "h3", text: "MITRE ATLAS" },
    {
      type: "p",
      text: "[MITRE ATLAS](https://atlas.mitre.org/) (Adversarial Threat Landscape for Artificial-Intelligence Systems) is a knowledge base of adversary tactics and techniques against AI-enabled systems, modelled on MITRE ATT&CK and backed by real-world case studies. It is most useful when you need a shared vocabulary with a security operations or threat intelligence team, or when you are planning a red team engagement and want to make sure you have considered the full attack lifecycle rather than only the prompt.",
    },
    { type: "h3", text: "NIST AI Risk Management Framework" },
    {
      type: "p",
      text: "The [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) is a voluntary framework organised around four functions — Govern, Map, Measure and Manage — with a Generative AI Profile (NIST AI 600-1) published in 2024. It sits at the governance level: it will not tell you how to stop an injection, but it is the framework leadership, auditors and procurement teams tend to ask about. An AI security engineer who can map technical controls onto it is far more effective in a larger organisation.",
    },
    {
      type: "callout",
      title: "Frameworks are maps, not controls",
      text: "None of these documents secures anything by itself. Use OWASP for coverage, ATLAS for adversary thinking and the NIST AI RMF for governance language — then put the actual controls in code, permissions and process.",
    },
    { type: "h2", text: "AI security engineer skills" },
    {
      type: "ul",
      items: [
        "**Web and API security fundamentals.** Authentication, authorisation, injection, SSRF, XSS. Most LLM exploits end in one of these.",
        "**Hands-on LLM building.** You cannot secure a RAG pipeline or an agent loop you have never built. Embeddings, vector databases, tool calling and orchestration should feel familiar.",
        "**Adversarial creativity.** The ability to think in terms of what content can reach the model and who wrote it — and to keep iterating when the first ten payloads fail.",
        "**Secure architecture.** Least privilege, user-scoped credentials, separation of trusted and untrusted context, human-in-the-loop design.",
        "**Testing automation.** Turning manual findings into repeatable test suites that run in CI.",
        "**Clear writing.** Findings that engineers can reproduce and fix, and summaries that leadership can act on.",
      ],
    },
    {
      type: "p",
      text: "If you are working out how to build these skills, I have written a staged roadmap in [how to become an AI security engineer](/blog/how-to-become-an-ai-security-engineer).",
    },
    { type: "h2", text: "How I work as an AI security engineer" },
    {
      type: "p",
      text: "My own work sits across both sides of the line: I build AI systems — RAG chatbots on FastAPI and Qdrant, agent systems, and an \"AI Employee\" with nine orchestrated services — and I test them and others' systems for weaknesses. As an AI security engineer, I (Sheikh Mujtaba) have found that building first makes the testing far sharper, because I know where the shortcuts usually get taken.",
    },
    {
      type: "p",
      text: "A typical engagement follows the same shape:",
    },
    {
      type: "ol",
      items: [
        "**Scope in writing.** What is in bounds, which environment, which accounts, and what counts as a finding. AI red teaming is an authorised security exercise like any other.",
        "**Map the system as built, not as described.** I list every input channel, every retrieval source and every tool, and I check which credentials each tool actually uses. This step alone usually surfaces the most serious issue — an agent calling an internal API with a service account that can see everything.",
        "**Classic web testing first.** Authentication, access control and output handling on the surrounding application. My background in web application pentesting, malware analysis and WAF bypass research matters here more than any prompt trick.",
        "**LLM-specific testing.** Direct and indirect injection through every channel, system prompt extraction, retrieval boundary tests, tool-abuse chains and cost-exhaustion inputs.",
        "**Fix the architecture, not the wording.** My recommendations focus on permission checks in tools, user-scoped credentials, strict context grounding for retrieval, and human approval for irreversible actions — the same human-in-the-loop pattern I use in my own agent builds.",
        "**Leave regression tests behind.** Every confirmed finding becomes a test so the next prompt change cannot quietly undo the fix.",
      ],
    },
    {
      type: "p",
      text: "Practising in public red-teaming programmes, such as the Gray Swan arena engagements I have taken part in, keeps the attacker side of my thinking current; models change quickly, and techniques that failed six months ago sometimes work again after an update. If you need this kind of assessment or want security built into an AI feature from the start, my [services](/services) page covers how I work with teams.",
    },
    { type: "h2", text: "Where the role is heading" },
    {
      type: "p",
      text: "The centre of gravity is moving from chatbots to agents. As models gain the ability to browse, write code, send messages and call business systems, the AI security engineer's work looks less like content moderation and more like identity and access management for a non-human actor that can be socially engineered. Expect more emphasis on tool permission design, agent-to-agent trust, and audit trails — and less on clever single-prompt jailbreaks. For the broader control stack, start with the [AI security](/blog/ai-security) guide.",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "An AI security engineer secures systems where a model is in the decision path: models, data, pipelines, agents and tool integrations.",
        "The defining problem is that a model cannot reliably separate instructions from data, so controls must live outside the model.",
        "Day-to-day work is threat modelling, red teaming, guardrail design, secure SDLC for LLM features and incident response.",
        "The role differs from AppSec in its mental model of the component and from ML engineering in its goal — preventing abuse, not improving accuracy.",
        "OWASP Top 10 for LLM Applications, MITRE ATLAS and the NIST AI RMF give coverage, adversary vocabulary and governance language respectively.",
        "Strong web security fundamentals plus hands-on LLM building experience is the most reliable skill combination.",
      ],
    },
  ],
  faqs: [
    {
      question: "What does an AI security engineer do?",
      answer:
        "An AI security engineer threat-models, tests and hardens systems that use machine learning models — mostly LLMs today. Day to day that means mapping trust boundaries, red teaming for prompt injection and tool abuse, designing guardrails and permission checks, reviewing prompts and tool schemas as security-relevant code, and handling incidents involving AI features.",
    },
    {
      question: "How is an AI security engineer different from an AppSec engineer?",
      answer:
        "An AppSec engineer treats components as deterministic code and hunts for unsafe input handling. An AI security engineer also has to treat the model as an untrusted, steerable decision-maker that may follow instructions hidden in data. The fixes are often familiar — least privilege, output encoding, authorisation checks — but the threat model and testing methods are different.",
    },
    {
      question: "Do AI security engineers need to know machine learning?",
      answer:
        "They need a working understanding rather than research-level expertise. You should be comfortable with how LLMs are prompted, how retrieval and embeddings work, how tool calling and agent loops are built, and how models are packaged and served. Most practical LLM security work is about the system around the model rather than the maths inside it.",
    },
    {
      question: "Which frameworks should an AI security engineer know?",
      answer:
        "The OWASP Top 10 for LLM Applications (2025 edition) for application-level coverage, MITRE ATLAS for adversary tactics and techniques against AI systems, and the NIST AI Risk Management Framework with its Generative AI Profile for governance. Classic web security references remain essential, because many LLM exploits end in a traditional vulnerability.",
    },
    {
      question: "Is an LLM security engineer the same as an AI security engineer?",
      answer:
        "Largely, yes. \"LLM security engineer\" is a narrower title focused on large language model applications, while \"AI security engineer\" can also cover classical ML systems such as fraud or vision models. Since most current AI deployments are LLM-based, the day-to-day work is usually the same.",
    },
  ],
};
