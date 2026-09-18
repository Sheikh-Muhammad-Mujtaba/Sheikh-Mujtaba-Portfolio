import type { BlogPost } from "../../utils/blog-types";

export const agenticAiDevelopment: BlogPost = {
  slug: "agentic-ai-development",
  title:
    "Agentic AI Development: Architecture Patterns for Production Multi-Agent Systems",
  heading: "Agentic AI Development in Production",
  description:
    "How to design, build and ship agentic AI systems that survive real users: tool design, multi-agent orchestration patterns, memory and RAG, evaluation harnesses, cost control and human-in-the-loop checkpoints.",
  focusKeyword: "agentic AI development",
  keywords: [
    "agentic AI development",
    "AI agent development",
    "multi-agent systems",
    "LLM orchestration",
    "RAG pipeline",
    "tool calling",
    "AI agent architecture",
    "production AI agents",
    "autonomous AI agents",
    "AI agent evaluation",
  ],
  published: "2026-03-04",
  updated: "2026-09-18",
  readingMinutes: 14,
  excerpt:
    "A demo agent takes an afternoon. A production agent takes tool design, an evaluation harness and a budget ceiling. Here is the difference, in architecture terms.",
  related: ["ai-security", "ai-integration-in-business-workflows"],
  blocks: [
    {
      type: "p",
      text: "Anyone can build an agent that works once. The hard part of **agentic AI development** is the second hundred runs: the tool that returns an error string the model has never seen, the loop that spends forty dollars before anyone notices, the silent regression when a prompt changes. This is the architecture I use for agents that go to production and stay there.",
    },
    {
      type: "callout",
      title: "What makes a system 'agentic'",
      text: "An agent is a loop where a model decides which action to take next, takes it through a tool, observes the result, and repeats until a stopping condition. Everything else — memory, planning, multiple agents — is an optimisation on that loop. If your system does not choose its own next action, it is a pipeline, and a pipeline is usually the better answer.",
    },
    { type: "h2", text: "Start by asking whether you need an agent at all" },
    {
      type: "p",
      text: "The single biggest cost saving in agent work is noticing that a deterministic workflow would do. Use this test before you write a line of orchestration code:",
    },
    {
      type: "table",
      head: ["Signal", "Build a pipeline", "Build an agent"],
      rows: [
        [
          "Steps known in advance",
          "Yes — hard-code the sequence",
          "No — the model must choose",
        ],
        [
          "Branching",
          "A handful of known branches",
          "Open-ended, data-dependent",
        ],
        ["Tool count", "One to three", "Five or more, used selectively"],
        [
          "Failure cost",
          "High — determinism is a feature",
          "Recoverable, or gated by a human",
        ],
        ["Latency budget", "Sub-second", "Seconds to minutes acceptable"],
      ],
    },
    {
      type: "p",
      text: "Most business automation is a pipeline with one or two model calls in it. Agents earn their complexity when the input space is genuinely open — research, triage across many systems, or anything where the next step depends on what the last step returned.",
    },
    { type: "h2", text: "Tool design is the whole game" },
    {
      type: "p",
      text: "Agent quality tracks tool quality far more than it tracks model choice. A weaker model with sharp tools beats a frontier model with vague ones. Four rules:",
    },
    {
      type: "ol",
      items: [
        "**One tool, one job, one obvious name.** `search_invoices` and `create_credit_note`, not a `manage_billing` tool with a `mode` parameter.",
        "**Constrain inputs with the schema, not the prompt.** Enums, ranges and required fields in the JSON schema are enforced; the same rule in prose is a suggestion.",
        "**Return structured, actionable errors.** `{\"error\": \"customer_not_found\", \"hint\": \"search by email with find_customer first\"}` recovers. `Exception: KeyError` loops.",
        "**Make results small and dense.** Paginate, summarise, and never dump a thousand rows into context — you are paying for tokens and burying the signal.",
      ],
    },
    {
      type: "code",
      lang: "typescript",
      code: `import { z } from "zod";
import { tool } from "ai";

export const findInvoices = tool({
  description:
    "Find invoices for one customer. Returns at most 20 rows, newest first. " +
    "Use find_customer first if you only have a name or email.",
  inputSchema: z.object({
    customerId: z.string().describe("Exact customer ID, e.g. CUST-0042"),
    status: z.enum(["draft", "unpaid", "overdue", "paid"]).optional(),
    since: z.string().date().optional().describe("ISO date, inclusive"),
  }),
  execute: async ({ customerId, status, since }) => {
    const rows = await db.invoices.find({ customerId, status, since }, { limit: 20 });

    if (rows.length === 0) {
      // Structured, recoverable failure — not a thrown exception.
      return {
        error: "no_invoices_found",
        hint: "Confirm the customerId with find_customer, or widen the date range.",
      };
    }

    // Dense result: only the columns a decision needs.
    return {
      count: rows.length,
      invoices: rows.map((r) => ({
        id: r.id,
        total: r.total,
        currency: r.currency,
        status: r.status,
        dueDate: r.dueDate,
      })),
    };
  },
});`,
    },
    { type: "h2", text: "Orchestration patterns, from cheapest to most complex" },
    {
      type: "p",
      text: "Reach for the simplest pattern that fits. Every additional agent multiplies token cost, latency and the number of ways the system can fail.",
    },
    { type: "h3", text: "1. Single agent with a tool belt" },
    {
      type: "p",
      text: "One model, one loop, five to fifteen tools. This handles the overwhelming majority of real use cases: support triage, internal research, data lookup and drafting. Start here and only escalate when you have evidence you need to.",
    },
    { type: "h3", text: "2. Router plus specialists" },
    {
      type: "p",
      text: "A cheap, fast model classifies the request and hands it to one of several specialist agents, each with a narrow tool set and a focused system prompt. This keeps prompts short, keeps irrelevant tools out of context, and lets you use a small model for the easy 80 percent of traffic.",
    },
    { type: "h3", text: "3. Supervisor with worker agents" },
    {
      type: "p",
      text: "A supervisor decomposes a goal, dispatches workers (often in parallel), and synthesises the results. Use it when subtasks are genuinely independent — researching ten companies, reconciling five systems. The failure mode is a supervisor that re-dispatches forever, so cap depth and iterations explicitly.",
    },
    { type: "h3", text: "4. Plan-then-execute" },
    {
      type: "p",
      text: "The model writes an explicit plan, a human or a validator approves it, and only then does execution start. This is the pattern for anything irreversible — payments, deletions, outbound email — and it pairs naturally with the approval checkpoints described below.",
    },
    {
      type: "code",
      lang: "typescript",
      code: `// Router + specialists, with hard limits on every loop.
const route = await generateObject({
  model: "claude-haiku-4-5",           // cheap classifier
  schema: z.object({
    lane: z.enum(["billing", "technical", "sales", "handoff"]),
    confidence: z.number().min(0).max(1),
  }),
  prompt: classifyPrompt(userMessage),
});

if (route.object.confidence < 0.6 || route.object.lane === "handoff") {
  return escalateToHuman(userMessage, route.object);
}

const result = await generateText({
  model: "claude-sonnet-5",
  system: SPECIALISTS[route.object.lane].system,
  tools: SPECIALISTS[route.object.lane].tools,
  stopWhen: stepCountIs(8),            // never an unbounded loop
  messages,
});`,
    },
    {
      type: "callout",
      title: "Always bound the loop",
      text: "Every agent loop needs three ceilings: maximum steps, maximum wall-clock time, and maximum spend per conversation. An agent without a budget ceiling is an incident waiting for a trigger. Enforce them in code, outside the model's control.",
    },
    { type: "h2", text: "Memory and retrieval without the mess" },
    {
      type: "p",
      text: "Agents need three distinct kinds of memory, and conflating them is a common source of weird behaviour:",
    },
    {
      type: "ul",
      items: [
        "**Working context** — the current conversation. Bounded by the context window. Summarise or truncate the middle when it grows; keep the system prompt and the most recent turns intact.",
        "**Retrieved knowledge (RAG)** — documents fetched per query from a vector or hybrid index. This is not memory, it is search, and it should be a tool the agent calls rather than a blob prepended to every prompt.",
        "**Durable facts** — user preferences, entitlements, prior decisions. Store these in a real database with a schema, not in a vector store. An agent should look them up deterministically.",
      ],
    },
    {
      type: "p",
      text: "For retrieval, hybrid beats pure vector search in most business corpora: BM25 catches exact identifiers, part numbers and names that embeddings blur together, while vectors catch paraphrase. Chunk on document structure — headings, sections — rather than a fixed token count, and always return the source reference so the answer can cite it.",
    },
    {
      type: "code",
      lang: "python",
      code: `# Hybrid retrieval: lexical + semantic, fused by reciprocal rank.
def hybrid_search(query: str, k: int = 8) -> list[Chunk]:
    lexical = bm25_index.search(query, k=k * 3)
    semantic = vector_index.search(embed(query), k=k * 3)

    scores: dict[str, float] = {}
    for rank, chunk in enumerate(lexical):
        scores[chunk.id] = scores.get(chunk.id, 0) + 1 / (60 + rank)
    for rank, chunk in enumerate(semantic):
        scores[chunk.id] = scores.get(chunk.id, 0) + 1 / (60 + rank)

    top = sorted(scores, key=scores.get, reverse=True)[:k]
    return [store[chunk_id] for chunk_id in top]`,
    },
    { type: "h2", text: "Evaluation: the part everyone skips" },
    {
      type: "p",
      text: "You cannot improve an agent you cannot measure, and vibes do not survive contact with a prompt change. Build the evaluation harness before the second feature, not after the first incident.",
    },
    {
      type: "ol",
      items: [
        "**Golden set.** Thirty to a hundred real inputs with known-good outcomes. Harvest them from production traffic, not your imagination.",
        "**Assertions over judgements where possible.** Did it call the right tool? Did it produce valid JSON? Did it cite a real document ID? These are cheap, deterministic and catch most regressions.",
        "**LLM-as-judge for the rest.** Score helpfulness and faithfulness with a rubric and a strong model. Calibrate the judge against human labels once, then trust it for relative comparisons.",
        "**Trace everything.** Every step, tool call, token count and latency. When something goes wrong in production the trace is the only artefact that explains it.",
        "**Run the suite in CI.** A prompt is code. Changing it without a test run is deploying on a Friday, every time.",
      ],
    },
    { type: "h2", text: "Cost and latency control" },
    {
      type: "ul",
      items: [
        "**Cascade models.** Cheap model first, escalate on low confidence. Most traffic is easy; do not pay frontier prices for it.",
        "**Cache aggressively.** Prompt caching on a long, stable system prompt cuts both cost and time-to-first-token dramatically. Structure prompts so the stable part comes first.",
        "**Parallelise independent tool calls.** If three lookups do not depend on each other, do not serialise them.",
        "**Stream to the user.** Perceived latency is what people complain about. Stream tokens and show tool progress.",
        "**Trim tool results.** The cheapest token is the one you never send.",
      ],
    },
    { type: "h2", text: "Human-in-the-loop, designed rather than bolted on" },
    {
      type: "p",
      text: "Autonomy is a dial, not a switch. Classify every tool by blast radius and attach the right control:",
    },
    {
      type: "table",
      head: ["Tool class", "Example", "Control"],
      rows: [
        ["Read-only", "Search, fetch, summarise", "None — log it"],
        [
          "Reversible write",
          "Create draft, add internal note",
          "Log plus a visible undo",
        ],
        [
          "Externally visible",
          "Send email, post to a customer",
          "Approval queue before send",
        ],
        [
          "Irreversible or financial",
          "Refund, delete, transfer, deploy",
          "Explicit human approval, always",
        ],
      ],
    },
    {
      type: "p",
      text: "Build the approval queue as a first-class part of the product, not an afterthought. Reviewers need the proposed action, the reasoning, the evidence the agent used, and a one-click approve or reject. Done well, the queue also becomes your best source of training and evaluation data.",
    },
    {
      type: "callout",
      title: "Agents widen your attack surface",
      text: "An agent with tools is a confused-deputy risk: anything it reads — a web page, a PDF, an email — can contain instructions aimed at your system. Treat tool output as untrusted input, enforce permissions at the tool boundary rather than in the prompt, and read [AI security](/blog/ai-security) before you ship anything that touches customer data.",
    },
    { type: "h2", text: "A shipping checklist" },
    {
      type: "ul",
      items: [
        "Step, time and spend ceilings enforced in code.",
        "Every tool has a structured error path and a permission check.",
        "Golden-set evaluation running in CI, with tracing in production.",
        "Approval queue for every externally visible or irreversible action.",
        "Prompt and tool definitions versioned; rollback is a deploy, not an edit.",
        "A kill switch that disables the agent without a code change.",
        "Cost dashboard per conversation, with alerting on outliers.",
      ],
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "Prefer a pipeline until the input space is genuinely open-ended.",
        "Tool design beats model choice: narrow, well-typed, with recoverable errors.",
        "Escalate orchestration complexity only against evidence.",
        "Separate working context, retrieval and durable facts.",
        "Build the evaluation harness early; a prompt is code.",
        "Gate autonomy by blast radius, and make approval part of the product.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between an AI agent and an AI workflow?",
      answer:
        "A workflow executes steps you defined in advance; an agent chooses its next action at runtime based on what previous steps returned. Workflows are cheaper, faster and fully predictable, so they are the right answer whenever the steps are knowable. Agents earn their overhead only when the path genuinely depends on the data.",
    },
    {
      question: "How many tools should one agent have?",
      answer:
        "Five to fifteen is the practical sweet spot. Below five you usually do not need an agent at all. Beyond roughly twenty, tool selection accuracy degrades noticeably and prompts get long — that is the point to split into a router with specialist agents, each holding a narrow tool set.",
    },
    {
      question: "Do I need a vector database for an AI agent?",
      answer:
        "Only if the agent must answer from a document corpus. Structured lookups belong in your normal database, and durable user facts belong in a schema, not embeddings. When you do need retrieval, hybrid search — BM25 combined with vectors — outperforms pure vector search on most business content because it handles exact identifiers correctly.",
    },
    {
      question: "How do you stop an AI agent from looping or overspending?",
      answer:
        "Enforce three hard ceilings outside the model's control: maximum steps per run, maximum wall-clock time, and maximum spend per conversation. Add structured tool errors so the agent can recover instead of retrying blindly, and alert on any run that approaches a ceiling — those are almost always a tool design problem.",
    },
    {
      question: "How do you evaluate an agent before shipping it?",
      answer:
        "Collect thirty to a hundred real inputs with known-good outcomes, then assert on the deterministic parts — correct tool selected, valid output schema, real citations — and use a rubric-scored LLM judge for the subjective parts. Run the suite in CI on every prompt or tool change, and keep full traces in production so failures are diagnosable.",
    },
  ],
};
