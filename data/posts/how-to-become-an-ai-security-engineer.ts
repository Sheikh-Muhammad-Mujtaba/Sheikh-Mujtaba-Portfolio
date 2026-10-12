import type { BlogPost } from "../../utils/blog-types";

export const howToBecomeAiSecurityEngineer: BlogPost = {
  slug: "how-to-become-an-ai-security-engineer",
  title: "How to Become an AI Security Engineer: A Practical Roadmap",
  heading: "How to Become an AI Security Engineer",
  description:
    "A staged, practical roadmap for becoming an AI security engineer: security fundamentals, building with LLMs, LLM-specific attacks, red teaming practice, building defences and a portfolio — with free resources that actually exist.",
  focusKeyword: "how to become an AI security engineer",
  keywords: [
    "how to become an AI security engineer",
    "AI security engineer roadmap",
    "AI security career",
    "how to get into AI security",
    "learn AI red teaming",
    "LLM security learning path",
    "AI security engineer skills",
    "prompt injection practice",
    "AI security resources",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 10,
  excerpt:
    "There is no degree for this yet. Here is the six-stage path I would follow again — from web pentesting to building LLM apps, breaking them, defending them and showing your work.",
  related: ["ai-security-engineer", "ai-red-teaming", "ai-security"],
  blocks: [
    {
      type: "p",
      text: "If you are working out **how to become an AI security engineer**, the honest answer is that there is no single course or certificate that gets you there. The role is too new. What works is combining two skill sets that rarely live in the same head — classic security engineering and hands-on experience building with large language models — and then practising the overlap until you can find, explain and fix real weaknesses. This roadmap is the path I would follow again, with the resources that actually helped.",
    },
    {
      type: "callout",
      title: "The shortcut that is not a shortcut",
      text: "Skipping straight to jailbreak tricks is the most common mistake. Most serious LLM vulnerabilities end in an ordinary flaw — broken access control, unsafe output rendering, an over-privileged credential. Security fundamentals are the foundation, not a detour.",
    },
    { type: "h2", text: "First, what the job actually is" },
    {
      type: "p",
      text: "An AI security engineer threat-models, tests and hardens systems where a model sits in the decision path: the model, its data, the pipeline, and the agents and tools it can use. If you want the full picture of the role and how it differs from AppSec or ML engineering, read [what an AI security engineer does](/blog/ai-security-engineer) first. This post is about getting there.",
    },
    {
      type: "table",
      head: ["Stage", "Focus", "You are ready to move on when"],
      rows: [
        [
          "1. Security fundamentals",
          "Web and API security, pentesting method",
          "You can find and explain access-control and injection bugs in a lab app",
        ],
        [
          "2. LLM fundamentals",
          "Building RAG and agent features yourself",
          "You have shipped a working RAG chatbot or tool-calling agent",
        ],
        [
          "3. LLM-specific attacks",
          "Prompt injection, data leakage, excessive agency",
          "You can explain each OWASP LLM Top 10 entry with an example",
        ],
        [
          "4. Red teaming practice",
          "Labs, games, public arenas, CTFs",
          "You can run a structured assessment and write a reproducible finding",
        ],
        [
          "5. Building defences",
          "Guardrails, permissions, tests in CI",
          "You can harden your own stage-2 project against your stage-4 attacks",
        ],
        [
          "6. Portfolio and community",
          "Write-ups, open projects, engagements",
          "Someone else can verify your skills without taking your word for it",
        ],
      ],
    },
    { type: "h2", text: "Stage 1: Security fundamentals and web pentesting" },
    {
      type: "p",
      text: "LLM applications are web applications with an unusual component in the middle. The chat endpoint has authentication, the retrieval layer has authorisation, the model's output gets rendered in a browser, and the agent's tools call internal APIs. If you cannot test those parts, you will miss the issues that matter most.",
    },
    {
      type: "ul",
      items: [
        "**HTTP, sessions and authentication.** Know how cookies, tokens and OAuth flows work, and how they break.",
        "**The classic vulnerability classes.** Broken access control, SQL injection, XSS, SSRF, insecure deserialisation. These are exactly what a manipulated model ends up triggering.",
        "**A proxy-driven testing workflow.** Intercept, modify, replay. Get comfortable with Burp Suite or an equivalent.",
        "**Linux, networking and basic scripting.** Python especially, since most AI tooling is in Python.",
      ],
    },
    {
      type: "p",
      text: "The [PortSwigger Web Security Academy](https://portswigger.net/web-security) is the best free resource I know for this stage: structured topics, each with hands-on labs. My own route in was web application pentesting and incident-style work — removing backdoors from compromised sites and hardening their hosting, analysing obfuscated PHP malware, and researching WAF bypasses through fuzzing. None of that is AI-specific, and all of it turned out to be directly useful later.",
    },
    { type: "h2", text: "Stage 2: Learn LLMs by building with them" },
    {
      type: "p",
      text: "You cannot secure what you have never built. Reading about retrieval-augmented generation is not the same as debugging why your retriever returns a chunk from the wrong document, or watching an agent loop call the same tool twelve times. Build at least two things:",
    },
    {
      type: "ol",
      items: [
        "**A RAG chatbot over your own documents.** Chunking, embeddings, a vector database, a prompt that grounds answers in retrieved context, and citations. This teaches you where data leaks and where grounding fails.",
        "**A tool-calling agent.** Give a model two or three tools — a search, a file write, an API call — and an orchestration loop. This teaches you how quickly an agent's permissions become the real attack surface.",
      ],
    },
    {
      type: "p",
      text: "This was the stage that changed how I think about security. I started building AI systems for remote clients in 2025 — RAG chatbots on FastAPI and Qdrant, then autonomous agent systems — and later an \"AI Employee\" project with nine orchestrated services and human-in-the-loop approvals, plus NuraShell, a command-line agent. Building a documentation chatbot that had to answer strictly from retrieved context taught me more about data boundaries than any article did. For architecture patterns, see [agentic AI development](/blog/agentic-ai-development).",
    },
    { type: "h2", text: "Stage 3: Understand LLM-specific attacks" },
    {
      type: "p",
      text: "Now study how these systems fail. The structural fact to internalise is that a model receives instructions and data on the same channel, so content it reads can steer it. Everything else follows from that.",
    },
    {
      type: "ul",
      items: [
        "**The OWASP Top 10 for LLM Applications (2025).** Published by the [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/): prompt injection, sensitive information disclosure, supply chain, data and model poisoning, improper output handling, excessive agency, system prompt leakage, vector and embedding weaknesses, misinformation, and unbounded consumption. Learn each with a concrete example — my walkthrough is in [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications).",
        "**Prompt injection, direct and indirect.** Indirect injection — instructions hidden in a web page, a PDF or a ticket that the system ingests — is the one that causes real damage. Start with [prompt injection](/blog/prompt-injection).",
        "**[MITRE ATLAS](https://atlas.mitre.org/).** A knowledge base of adversary tactics and techniques against AI systems, modelled on ATT&CK, with real-world case studies. Useful for thinking beyond the prompt to the full attack lifecycle.",
        "**RAG and agent-specific risks.** Retrieval that ignores entitlements, poisoned documents, over-scoped tool credentials. See [RAG security](/blog/rag-security) and [AI agent security](/blog/ai-agent-security).",
      ],
    },
    { type: "h2", text: "Stage 4: Practise red teaming" },
    {
      type: "p",
      text: "Reading builds vocabulary; practice builds instinct. Work through these roughly in order of difficulty:",
    },
    {
      type: "ol",
      items: [
        "**[Gandalf by Lakera](https://gandalf.lakera.ai/).** A game where you try to extract a password from a model whose defences get stricter each level. It is the fastest way to feel how brittle prompt-level defences are.",
        "**PortSwigger's Web LLM attacks labs.** The [Web LLM attacks](https://portswigger.net/web-security/llm-attacks) topic covers exploiting LLM-accessible APIs, indirect prompt injection and insecure output handling, with hands-on labs. These are closer to real applications than any game, because the model is wired into a working site.",
        "**Public red-teaming arenas.** Gray Swan runs a public arena with AI red-teaming challenges against real models, including jailbreaking, prompt injection and agent tool-abuse scenarios. Taking part in Gray Swan's ethical red-teaming engagements was where I learned to work methodically under rules of engagement rather than just trying payloads.",
        "**CTFs.** General security CTFs keep your fundamentals sharp, and AI-themed challenges appear increasingly often. Write up every challenge you solve — I keep CTF write-ups for exactly this reason.",
        "**Your own lab.** Set up an isolated environment where you can attack your stage-2 projects freely. A home cybersecurity lab with intentionally vulnerable targets costs very little and removes any question about authorisation.",
      ],
    },
    {
      type: "callout",
      title: "Only test what you are allowed to test",
      text: "Red teaming is an authorised security exercise. Practise on labs, games, arenas and your own systems. Do not probe production AI features you have no written permission to test, however public the chatbot looks.",
    },
    {
      type: "p",
      text: "As you practise, move from \"I got it to say something bad\" to a structured method: map the surface, establish a baseline, test each input channel, attempt tool and data-boundary abuse, and record every step so it can be reproduced. That shift is what separates a hobbyist from someone a team will pay. My full method is in [AI red teaming](/blog/ai-red-teaming).",
    },
    { type: "h2", text: "Stage 5: Build defences" },
    {
      type: "p",
      text: "An AI security engineer who can only break things is half the job. Go back to the RAG chatbot and agent from stage 2 and harden them against everything you learned in stages 3 and 4.",
    },
    {
      type: "ul",
      items: [
        "**Move authorisation into the tools.** Every tool checks the real user's identity and permissions in code, never trusting what the model claims.",
        "**Scope credentials to the end user.** The agent acts with the requester's rights, not a service account that can see everything.",
        "**Filter retrieval by entitlement at query time,** and cite sources so leaks are visible.",
        "**Validate and encode output** before anything renders or executes it.",
        "**Add human approval for irreversible actions** — payments, deletions, outbound messages.",
        "**Turn your attacks into CI tests,** so a prompt change cannot silently reopen a finding.",
      ],
    },
    {
      type: "p",
      text: "Then attack your own system again. Notice which controls stopped you and which only slowed you down; that distinction — boundaries versus speed bumps — is the core judgement of the role. The [LLM guardrails](/blog/llm-guardrails) post covers the layers in more depth.",
    },
    { type: "h2", text: "Stage 6: Build a portfolio and join the community" },
    {
      type: "p",
      text: "Because the field is so new, hiring managers and clients rarely have a credential to check. What they can check is your work. Aim for evidence that someone else can verify:",
    },
    {
      type: "ul",
      items: [
        "**Write-ups.** CTF solutions, lab walkthroughs, and analyses of your own projects' weaknesses and fixes. Clear writing is a core skill of the job, so this doubles as proof.",
        "**Open-source projects.** A hardened RAG reference implementation, an injection test suite, a small guardrail library. Small and well-documented beats ambitious and abandoned.",
        "**Public red-teaming results.** Arena participation, responsible disclosures through official programmes, and bug bounty reports where AI features are in scope.",
        "**Community.** The OWASP GenAI Security Project is open to contributors, and local OWASP chapters and security meetups are a good place to meet people doing this work.",
      ],
    },
    { type: "h2", text: "Mistakes to avoid along the way" },
    {
      type: "ul",
      items: [
        "**Collecting jailbreak prompts instead of understanding systems.** Payload lists go stale every time a model is updated; an understanding of trust boundaries does not.",
        "**Reporting model output as the finding.** \"The model said something rude\" is rarely the issue. The finding is what the system did as a result — the data it leaked, the tool it called, the HTML it rendered.",
        "**Recommending prompt changes as the fix.** Rewording a system prompt is a speed bump. Recommend controls in code: permission checks, scoped credentials, output encoding, approvals.",
        "**Ignoring cost and availability.** Unbounded consumption is on the OWASP list for a reason; an input that triggers runaway tool loops is a real attack on the bill.",
        "**Learning in isolation.** The field moves too quickly to follow alone. Read other people's write-ups and share your own.",
      ],
    },
    { type: "h2", text: "How long does it take?" },
    {
      type: "p",
      text: "It depends almost entirely on where you start. A web pentester who already knows stage 1 can become useful on LLM assessments within months of building and breaking a few projects. A developer who has shipped AI features already has stage 2 and needs to invest in security fundamentals first. Someone starting from zero should expect a longer road, mostly spent in stage 1. I would not trust any precise timeline — including my own — because the stages overlap and the field keeps moving.",
    },
    {
      type: "p",
      text: "What I would do differently: start building with LLMs earlier and in parallel with security study, rather than treating them as separate tracks. The most valuable insights came from the moments when the two collided — realising, mid-build, that the tool I had just given an agent was an attack path. If you would rather have this kind of review done on a system you are building now, my [services](/services) page explains how I work with teams.",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "There is no single credential; becoming an AI security engineer means combining security engineering with hands-on LLM building.",
        "Start with web and API security fundamentals — most LLM exploits end in a classic vulnerability.",
        "Build a RAG chatbot and a tool-calling agent yourself before trying to secure anyone else's.",
        "Learn the OWASP Top 10 for LLM Applications and MITRE ATLAS, with a concrete example for every entry.",
        "Practise on Gandalf, PortSwigger's LLM labs, public arenas such as Gray Swan's, CTFs and your own lab — and only on systems you are authorised to test.",
        "Harden your own projects, turn attacks into CI tests, and publish write-ups others can verify.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need a degree to become an AI security engineer?",
      answer:
        "No specific degree exists for the role yet. A computer science or security background helps, but what employers and clients can actually verify is practical skill: web security knowledge, hands-on LLM projects, red teaming practice and clear write-ups of your findings.",
    },
    {
      question: "Should I learn security or AI first?",
      answer:
        "Security fundamentals first, but start building with LLMs in parallel as soon as you can. Web and API security gives you the vocabulary to understand how LLM exploits cause damage, while building RAG and agent features yourself shows you where the weak points are. The two tracks reinforce each other.",
    },
    {
      question: "What are the best free resources to learn AI security?",
      answer:
        "The OWASP Top 10 for LLM Applications from the OWASP GenAI Security Project, MITRE ATLAS for adversary techniques, PortSwigger's Web Security Academy including its Web LLM attacks labs, Gandalf by Lakera for prompt injection practice, and public red-teaming arenas such as Gray Swan's. Security CTFs are also excellent for keeping fundamentals sharp.",
    },
    {
      question: "Do I need to know machine learning maths?",
      answer:
        "Not for most LLM application security work. You need to understand how prompts, context windows, embeddings, retrieval, tool calling and agent loops work in practice. Deeper ML knowledge becomes useful if you move into model-level research such as training data poisoning or adversarial examples, but it is not where most current roles focus.",
    },
    {
      question: "How do I get AI security experience without a job in it?",
      answer:
        "Build your own LLM projects and attack them, take part in public red-teaming arenas and CTFs, work through PortSwigger's LLM labs, and publish write-ups of everything. Responsible disclosure through official bug bounty programmes that include AI features is another legitimate route. Never test systems you are not authorised to test.",
    },
  ],
};
