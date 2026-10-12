import type { BlogPost } from "../../utils/blog-types";

export const owaspTop10ForLlmApplications: BlogPost = {
  slug: "owasp-top-10-for-llm-applications",
  title: "OWASP Top 10 for LLM Applications (2025), Explained",
  heading: "The OWASP Top 10 for LLM Applications, Explained",
  description:
    "A practical walkthrough of the OWASP Top 10 for LLM Applications 2025: what each risk means, a realistic example, how to test for it, and the control that actually fixes it, plus what changed from the 2023/24 list.",
  focusKeyword: "OWASP Top 10 for LLM applications",
  keywords: [
    "OWASP Top 10 for LLM applications",
    "OWASP LLM Top 10 2025",
    "OWASP Top 10 LLM",
    "LLM security risks",
    "LLM01 prompt injection",
    "excessive agency",
    "system prompt leakage",
    "vector and embedding weaknesses",
    "LLM application security",
    "AI security checklist",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 11,
  excerpt:
    "All ten 2025 OWASP LLM risks, each with a realistic example, a test you can run this week and the control that closes it.",
  related: ["prompt-injection", "ai-red-teaming", "ai-security"],
  blocks: [
    {
      type: "p",
      text: "The **OWASP Top 10 for LLM applications** is the closest thing the industry has to a shared vocabulary for LLM security risks. It is maintained by the OWASP GenAI Security Project, and the current edition is the 2025 list. Most summaries of it repeat the ten names and stop. This guide goes further: for every entry you get what it means in practice, a realistic example, how to test for it, and the control that actually closes it.",
    },
    {
      type: "callout",
      title: "Read the list as a system checklist, not a model checklist",
      text: "Only a few of the ten entries are about the model itself. Most are about what surrounds it: the data you feed it, the tools you give it, the output you trust and the bill you pay. If your review only looks at the prompt, you are covering a fraction of the list.",
    },
    { type: "h2", text: "The 2025 list at a glance" },
    {
      type: "p",
      text: "The official names and IDs below are taken from the [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/). The example and control columns are my own summary of how each risk shows up in real applications.",
    },
    {
      type: "table",
      head: ["ID", "Risk", "Example", "Primary control"],
      rows: [
        [
          "LLM01:2025",
          "Prompt Injection",
          "A support ticket tells the agent to refund a different account",
          "Least-privilege tools and authorisation outside the model",
        ],
        [
          "LLM02:2025",
          "Sensitive Information Disclosure",
          "Chatbot repeats another customer's order details",
          "Data minimisation and entitlement checks before context",
        ],
        [
          "LLM03:2025",
          "Supply Chain",
          "Fine-tuned model or adapter pulled from an unverified hub",
          "Provenance, pinning and an AI bill of materials",
        ],
        [
          "LLM04:2025",
          "Data and Model Poisoning",
          "Planted documents skew answers or embed a trigger phrase",
          "Vetted data sources, ingestion review and evals",
        ],
        [
          "LLM05:2025",
          "Improper Output Handling",
          "Model output rendered as HTML, causing XSS",
          "Encode, validate and parameterise all output",
        ],
        [
          "LLM06:2025",
          "Excessive Agency",
          "Email-summary agent also holds a send-and-delete tool",
          "Minimal tools, minimal permissions, human approval",
        ],
        [
          "LLM07:2025",
          "System Prompt Leakage",
          "Extracted prompt reveals an API key and routing rules",
          "Keep secrets and authorisation out of prompts",
        ],
        [
          "LLM08:2025",
          "Vector and Embedding Weaknesses",
          "Shared index returns another tenant's documents",
          "Permission-aware retrieval and index separation",
        ],
        [
          "LLM09:2025",
          "Misinformation",
          "Assistant invents a refund policy or a software package",
          "Grounding, citations and human review for high stakes",
        ],
        [
          "LLM10:2025",
          "Unbounded Consumption",
          "Scripted requests run up a huge inference bill",
          "Rate limits, quotas, token caps and cost alerts",
        ],
      ],
    },
    { type: "h2", text: "What changed from the 2023/24 list" },
    {
      type: "p",
      text: "The [2023/24 edition](https://genai.owasp.org/llm-top-10-2023-24/) had a different shape. Comparing the two lists side by side, the main movements are:",
    },
    {
      type: "ul",
      items: [
        "**Two new entries:** System Prompt Leakage (LLM07) and Vector and Embedding Weaknesses (LLM08). Both reflect how teams now build: long system prompts carrying business logic, and RAG pipelines everywhere.",
        "**Model Denial of Service became Unbounded Consumption (LLM10).** The scope widened from availability to cost and resource abuse, which matters when every token is billed.",
        "**Overreliance became Misinformation (LLM09).** The focus moved from the user trusting too much to the model producing false content in the first place.",
        "**Training Data Poisoning became Data and Model Poisoning (LLM04),** covering fine-tuning and embedding data as well as pre-training.",
        "**Insecure Output Handling was renamed Improper Output Handling (LLM05),** and Supply Chain Vulnerabilities is now simply Supply Chain (LLM03).",
        "**Sensitive Information Disclosure rose from sixth to second,** and Excessive Agency moved from eighth to sixth.",
        "**Insecure Plugin Design and Model Theft no longer have their own entries.** Plugin risk is now largely covered by Excessive Agency and Supply Chain.",
      ],
    },
    {
      type: "p",
      text: "For agent-heavy systems, OWASP has also published a separate [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications/) (the 2026 edition, released in December 2025). It targets autonomous agents that plan and act across multi-step workflows. It complements the LLM list rather than replacing it; if you are building agents, read both, and see [AI agent security](/blog/ai-agent-security) for the controls I apply.",
    },
    { type: "h2", text: "Every risk, explained" },
    { type: "h3", text: "LLM01:2025 Prompt Injection" },
    {
      type: "p",
      text: "Prompt injection is any input that changes the model's behaviour in a way the developer did not intend. Direct injection comes from the user's own message; indirect injection arrives inside content the system reads, such as a web page, a PDF, an email or a tool result. Because instructions and data share one channel, there is no complete fix at the model layer.",
    },
    {
      type: "p",
      text: "**Example:** an agent that triages support tickets and can issue refunds reads a ticket containing a hidden line addressed to the model, asking it to refund an unrelated order. **Test:** plant payloads in every channel the system ingests, including filenames, HTML comments, image ALT text and white-on-white text, then check whether any privileged tool fires. **Fix:** put authorisation in the tool using the real user's identity, separate untrusted content from instructions, and require human approval for irreversible actions. The full playbook is in [prompt injection](/blog/prompt-injection).",
    },
    { type: "h3", text: "LLM02:2025 Sensitive Information Disclosure" },
    {
      type: "p",
      text: "The model reveals data it should not: personal data, credentials, internal documents, or another user's records. The model usually is not the root cause; it repeats whatever ended up in its context or training data.",
    },
    {
      type: "p",
      text: "**Example:** a customer chatbot loads the last fifty orders into context to be helpful, and a user asks it to list \"recent orders similar to mine\". **Test:** ask for other users' data by name, ID and description; try to extract anything placed in context; check logs and traces for PII you did not expect to store. **Fix:** fetch only what the current user is entitled to see, redact before data reaches the model, scan output for secrets and PII, and never fine-tune on data you would not be willing to have reproduced.",
    },
    { type: "h3", text: "LLM03:2025 Supply Chain" },
    {
      type: "p",
      text: "LLM applications depend on third-party models, adapters, datasets, libraries and tool servers. Any of these can be outdated, tampered with or simply not what its name claims.",
    },
    {
      type: "p",
      text: "**Example:** a team downloads a fine-tuned model from a public hub because it scores well, without checking who published it or what format the weights use. **Test:** inventory every model, dataset, plugin and tool server; check signatures, licences and maintainers; flag any pickle-based weight files and unpinned versions. **Fix:** pin versions, prefer safe serialisation formats such as safetensors, verify checksums, keep an AI bill of materials, and review third-party tool servers as carefully as code. The same thinking applies to [MCP security](/blog/mcp-security).",
    },
    { type: "h3", text: "LLM04:2025 Data and Model Poisoning" },
    {
      type: "p",
      text: "An attacker influences the data a model learns from or retrieves, to bias outputs, degrade quality or plant a backdoor that activates on a trigger phrase. This covers pre-training, fine-tuning and embedding data.",
    },
    {
      type: "p",
      text: "**Example:** a knowledge base accepts documents from a shared drive, and someone adds a file that subtly rewrites the official procedure for approving supplier payments. **Test:** trace every path by which data enters training sets and indexes, and check who can write to each; run evaluation sets before and after each data or model update and investigate unexplained shifts. **Fix:** restrict and log writes to data sources, review ingestion, track data lineage, and gate model updates on a fixed evaluation suite.",
    },
    { type: "h3", text: "LLM05:2025 Improper Output Handling" },
    {
      type: "p",
      text: "Model output is passed to another component without validation or encoding. This turns an LLM into a delivery mechanism for classic web vulnerabilities: XSS, SQL injection, command injection, SSRF and path traversal.",
    },
    {
      type: "p",
      text: "**Example:** a chat UI renders model replies as raw HTML, so an injected instruction that makes the model emit a script tag runs in the victim's browser. Markdown image links that leak data through the URL are a common variant. **Test:** coax the model into producing markup, SQL fragments, shell metacharacters and external URLs, then follow each output to wherever it lands. **Fix:** treat model output as untrusted user input. Encode for the context it is rendered in, validate against a schema, parameterise queries, and never pass output to `eval`, a shell or a template engine.",
    },
    { type: "h3", text: "LLM06:2025 Excessive Agency" },
    {
      type: "p",
      text: "The system gives the model more functionality, permission or autonomy than the task needs, so a manipulated or simply mistaken model can do real damage. OWASP frames the root causes as excessive functionality, excessive permissions and excessive autonomy.",
    },
    {
      type: "p",
      text: "**Example:** an assistant that only needs to read and summarise emails is wired to a mailbox integration that can also send and delete, using a service account with access to every mailbox. **Test:** list every tool, the permissions behind it, and whether any action runs without confirmation; then try to reach each one through injection. **Fix:** expose only the tools the task needs, narrow each tool's scope, run downstream calls with the end user's identity, and require approval for high-impact actions. See [agentic AI development](/blog/agentic-ai-development) for how to design this in from the start.",
    },
    {
      type: "code",
      lang: "typescript",
      code: `// Excessive agency is fixed in the tool definition, not the prompt.
const tools = {
  // Read-only, scoped to the signed-in user's mailbox.
  listMyEmails: tool({
    inputSchema: z.object({ limit: z.number().int().max(20) }),
    execute: ({ limit }, { session }) =>
      mail.list({ owner: session.userId, limit }),
  }),
  // No send, no delete. If drafting is needed, create a draft
  // that the human reviews and sends themselves.
  createDraftReply: tool({
    inputSchema: z.object({ threadId: z.string(), body: z.string().max(4000) }),
    execute: ({ threadId, body }, { session }) =>
      mail.createDraft({ owner: session.userId, threadId, body }),
  }),
};`,
    },
    { type: "h3", text: "LLM07:2025 System Prompt Leakage" },
    {
      type: "p",
      text: "The system prompt is exposed, revealing whatever it contains. OWASP is explicit that the prompt should not be treated as a secret or a security control. The real risk is what developers put in it: credentials, internal rules, role logic or filtering criteria an attacker can then work around.",
    },
    {
      type: "p",
      text: "**Example:** an extracted prompt contains a database connection string and the line \"users with the admin role may see all records\", which tells an attacker exactly what to impersonate. **Test:** run extraction attempts such as translation requests, \"repeat the text above\", role-play and encoding tricks; then read your own prompt and assume it is public. **Fix:** move secrets to the server, enforce permissions in code, and write prompts you would be comfortable publishing.",
    },
    { type: "h3", text: "LLM08:2025 Vector and Embedding Weaknesses" },
    {
      type: "p",
      text: "Weaknesses in how embeddings are generated, stored and retrieved in RAG systems. These include missing access control on the vector store, cross-tenant leakage, poisoned documents in the index, and embedding inversion that can recover source text.",
    },
    {
      type: "p",
      text: "**Example:** a multi-tenant SaaS keeps all customers in one collection and filters results after retrieval, so a crafted query surfaces another tenant's contract. **Test:** query for content you should not be able to see; inspect whether access filters run inside the vector query; plant a document containing instructions and see whether it changes answers. **Fix:** store ACL metadata on every chunk and filter at query time, separate indexes by trust level, validate content at ingestion and log every retrieval. The detail is in [RAG security](/blog/rag-security).",
    },
    { type: "h3", text: "LLM09:2025 Misinformation" },
    {
      type: "p",
      text: "The model produces false or misleading content that looks credible, and people or systems act on it. Hallucination is the main cause, made worse by over-trust in confident answers.",
    },
    {
      type: "p",
      text: "**Example:** a coding assistant suggests installing a package that does not exist. If an attacker later registers that name, developers who follow the suggestion install malware. A support bot inventing a refund policy is the business version. **Test:** ask questions whose answers are not in your sources and check whether the system admits it; verify citations actually support the claims. **Fix:** ground answers in retrieved sources with citations, let the system say \"I do not know\", validate package and API names automatically, and put a human in the loop where errors are costly.",
    },
    { type: "h3", text: "LLM10:2025 Unbounded Consumption" },
    {
      type: "p",
      text: "The application allows excessive or uncontrolled inference, leading to denial of service, runaway cost (sometimes called denial of wallet) or model extraction through mass querying.",
    },
    {
      type: "p",
      text: "**Example:** a public chatbot with no per-user limits is scripted to send maximum-length prompts all night; or an agent loops on a failing tool call indefinitely. **Test:** send oversized inputs, high request rates and prompts designed to trigger long outputs or recursive tool calls, and watch latency and cost. **Fix:** rate-limit per user and per key, cap input and output tokens, bound agent steps and tool calls, set budget alerts, and keep a kill switch.",
    },
    { type: "h2", text: "How to use the list in a real assessment" },
    {
      type: "p",
      text: "The list is a coverage tool, not a test plan. In my own assessments (Sheikh Mujtaba), I map each entry to the specific components of the system under test, then build test cases against those components. A useful order of work:",
    },
    {
      type: "ol",
      items: [
        "**Draw the data flow.** Every input channel, every data source, every tool, every place output is rendered or executed.",
        "**Map each OWASP entry to components.** LLM05 maps to every output sink; LLM08 maps to the vector store; LLM06 maps to the tool list.",
        "**Prioritise by blast radius.** An agent that can move money or delete records outranks a chatbot that can only talk.",
        "**Test with reproducible cases** and keep them as regression tests, as described in [AI red teaming](/blog/ai-red-teaming).",
        "**Report against the IDs.** Using `LLM01:2025` and friends in findings gives developers and auditors a shared reference.",
      ],
    },
    {
      type: "callout",
      title: "Need a second pair of eyes?",
      text: "I assess LLM applications and agents against this list as part of my [AI security services](/services), including prompt injection testing, RAG access-control review and agent tool permission audits.",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "The 2025 OWASP Top 10 for LLM applications runs from Prompt Injection (LLM01) to Unbounded Consumption (LLM10).",
        "System Prompt Leakage and Vector and Embedding Weaknesses are new for 2025; Model Denial of Service and Overreliance were reframed.",
        "Most entries are system risks: data, tools, output handling and cost, not just the model.",
        "Authorisation belongs in code and tools, never in the system prompt.",
        "Treat model output as untrusted input to every downstream component.",
        "Use the list for coverage, then turn each test into a regression case.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the OWASP Top 10 for LLM applications?",
      answer:
        "It is a community-maintained list of the most critical security risks in applications built on large language models, published by the OWASP GenAI Security Project. The current 2025 edition covers prompt injection, sensitive information disclosure, supply chain, data and model poisoning, improper output handling, excessive agency, system prompt leakage, vector and embedding weaknesses, misinformation and unbounded consumption.",
    },
    {
      question: "What is new in the OWASP LLM Top 10 2025?",
      answer:
        "System Prompt Leakage (LLM07) and Vector and Embedding Weaknesses (LLM08) are new entries. Model Denial of Service was broadened into Unbounded Consumption, Overreliance was reframed as Misinformation, and Training Data Poisoning became Data and Model Poisoning. Insecure Plugin Design and Model Theft no longer have standalone entries.",
    },
    {
      question: "Is prompt injection still the top LLM security risk?",
      answer:
        "Yes. Prompt injection remains LLM01 in the 2025 list. It cannot be fully prevented at the model layer because instructions and data share the same channel, so the practical defence is to limit what a successful injection can achieve through least-privilege tools, user-scoped credentials and human approval for irreversible actions.",
    },
    {
      question: "How is the OWASP Top 10 for Agentic Applications different?",
      answer:
        "It is a separate OWASP GenAI Security Project list, released in December 2025 as the 2026 edition, focused on autonomous agents that plan and act across multi-step workflows. The LLM list covers applications built on language models generally; the agentic list goes deeper on risks specific to agents. Agent builders should use both.",
    },
    {
      question: "How do I test an application against the OWASP LLM Top 10?",
      answer:
        "Map each entry to concrete components of your system, such as input channels, the vector store, tools and output sinks, then write reproducible test cases for each. Combine manual testing with automated scanners, record findings against the OWASP IDs, and keep every confirmed attack as a regression test in CI.",
    },
  ],
};
