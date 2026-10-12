import type { BlogPost } from "../../utils/blog-types";

export const llmGuardrails: BlogPost = {
  slug: "llm-guardrails",
  title: "LLM Guardrails: Input and Output Controls That Actually Hold",
  heading: "LLM Guardrails That Actually Hold",
  description:
    "A practical engineering guide to LLM guardrails as a layered system: input, context, tool and output controls, schema validation, PII and secret redaction, runtime monitoring, what classifiers can and cannot do, and how to test guardrails in CI.",
  focusKeyword: "LLM guardrails",
  keywords: [
    "LLM guardrails",
    "AI guardrails",
    "guardrails for LLM applications",
    "LLM output validation",
    "LLM input validation",
    "structured output validation",
    "NeMo Guardrails",
    "Guardrails AI",
    "PII redaction LLM",
    "LLM security controls",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 10,
  excerpt:
    "A guardrail is not a classifier you bolt on. It is a stack of input, context, tool and output controls, and the deterministic ones do most of the work.",
  related: ["prompt-injection", "ai-security", "rag-security"],
  blocks: [
    {
      type: "p",
      text: "**LLM guardrails** are the controls that sit around a language model and decide what goes in, what the model is allowed to touch, and what comes out. The word has been stretched to mean anything from a one-line system prompt to a commercial moderation API, which is why so many teams believe they have guardrails when they have a suggestion. This guide treats guardrails as an engineering system: a set of layers, each with a clear job, most of them deterministic code, and all of them tested in CI like any other security control.",
    },
    {
      type: "callout",
      title: "The principle",
      text: "A guardrail that depends on the model behaving well is not a guardrail. The controls that hold are the ones that still work when the model has been fully persuaded by an attacker: schema validation, authorisation in code, encoding, and human approval.",
    },
    { type: "h2", text: "What LLM guardrails are, and are not" },
    {
      type: "p",
      text: "There are two families of guardrail, and mixing them up causes most of the failures I see. **Deterministic guardrails** are ordinary code: a JSON schema, an allow-list, an authorisation check, a regex for card numbers, a length limit. They are cheap, fast, explainable and they either pass or fail. **Probabilistic guardrails** are models: injection classifiers, toxicity detectors, an LLM acting as a judge. They handle fuzzy questions that code cannot, but they have error rates and they can be attacked.",
    },
    {
      type: "p",
      text: "A sound design uses probabilistic guardrails to catch and flag, and deterministic guardrails to enforce. If the only thing preventing a bad outcome is a classifier's score, you have a detection system, not a control. The [AI security guide](/blog/ai-security) explains why: the model has no privileged channel, so any text it reads can influence it, including text aimed at your classifier.",
    },
    { type: "h2", text: "The guardrail stack" },
    {
      type: "p",
      text: "Think of guardrails as five layers that a request passes through. Each layer limits what the next one has to worry about.",
    },
    {
      type: "table",
      head: ["Layer", "Job", "Typical controls", "Deterministic?"],
      rows: [
        [
          "Input",
          "Shape and screen what users send",
          "Length caps, normalisation, topic scope, injection and abuse classifiers, rate limits",
          "Mixed",
        ],
        [
          "Retrieval / context",
          "Control what the model is allowed to see",
          "Entitlement filters, hidden-text stripping, source labelling, size caps",
          "Mostly yes",
        ],
        [
          "Tools",
          "Control what the model is allowed to do",
          "Argument schemas, authorisation with user identity, allow-lists, approval gates",
          "Yes",
        ],
        [
          "Output",
          "Control what leaves the system",
          "Schema validation, encoding, PII and secret redaction, grounding checks",
          "Mostly yes",
        ],
        [
          "Runtime monitoring",
          "Notice what the other layers missed",
          "Traces, anomaly alerts, cost limits, kill switches",
          "Yes",
        ],
      ],
    },
    { type: "h2", text: "Input controls" },
    {
      type: "p",
      text: "Input guardrails are the most visible layer and the least reliable one on their own. They are still worth building, because they remove cheap attacks and lower cost.",
    },
    {
      type: "ul",
      items: [
        "**Hard limits first.** Maximum message length, maximum conversation length, maximum attachments, rate limits per user and per IP. These defeat denial-of-wallet attempts and many obfuscated payloads that rely on volume.",
        "**Normalise before inspecting.** Unicode normalisation, removal of zero-width and control characters, and decoding of obvious encodings. A filter that inspects raw input is inspecting the attacker's chosen representation.",
        "**Scope the task.** If the assistant answers questions about your product, a lightweight topic check can decline off-topic requests early. On this portfolio's chat assistant I use a context-restricted prompt and a basic input sanitiser; it is a scope control, and I do not pretend it is a security boundary.",
        "**Classify for abuse and injection.** Run a small classifier on input and treat its score as a signal for logging, step-up friction or refusal on sensitive flows. Do not treat a pass as proof of safety.",
      ],
    },
    { type: "h2", text: "Retrieval and context controls" },
    {
      type: "p",
      text: "Most of what an LLM application reads does not come from the user. It comes from retrieval, tool results and documents, and that is where [indirect prompt injection](/blog/prompt-injection) lives. Context guardrails decide what reaches the model's context window at all.",
    },
    {
      type: "ul",
      items: [
        "**Filter by entitlement inside the query.** Store access-control metadata on every chunk and pass the caller's groups as a filter to the vector search. Post-filtering results after retrieval leaks through ranking and through bugs. The [RAG security guide](/blog/rag-security) covers the details.",
        "**Strip hidden content at ingestion.** HTML comments, white-on-white text, zero-width characters, off-page PDF text and suspicious metadata should be removed or flagged before indexing, not at query time.",
        "**Label the source.** Wrap retrieved content in clear delimiters with a source identifier and an instruction that the content is reference material. This reduces, but does not remove, the chance the model follows instructions inside it.",
        "**Cap context size per source.** One enormous document should not be able to crowd out the system prompt or inflate cost.",
        "**Require grounding where it matters.** For the RAG documentation chatbot I built, the model is instructed to answer only from retrieved context and to say so when the context does not contain the answer. That is a behavioural control, so the output layer checks that cited sources were actually retrieved.",
      ],
    },
    { type: "h2", text: "Tool controls" },
    {
      type: "p",
      text: "Tool guardrails are where the real security boundary sits for any agent. The model proposes; your code disposes.",
    },
    {
      type: "ol",
      items: [
        "**Validate arguments against a strict schema** with types, ranges, lengths and enums. Reject unknown fields.",
        "**Authorise with the end user's identity,** never a broad service account. The downstream system should be able to say no on its own.",
        "**Allow-list destinations.** URLs to fetch, domains to email, repositories to write to. Anything outside the list needs approval.",
        "**Gate high-impact actions behind a human.** Payments, deletions, outbound messages and deployments should produce an approval request, not an action.",
        "**Make writes idempotent** so a retried or replayed call cannot double-execute.",
      ],
    },
    { type: "h2", text: "Output controls and LLM output validation" },
    {
      type: "p",
      text: "Output guardrails decide what the rest of your system, and your users, receive. This is the most underrated layer, and it is mostly plain engineering.",
    },
    { type: "h3", text: "Schema enforcement" },
    {
      type: "p",
      text: "Whenever model output feeds code, require structured output and validate it strictly. Native structured-output modes from model providers help the model produce valid JSON, but you still validate on your side: the provider guarantees shape at best, never business rules. Reject on failure, retry once with the validation error if you like, and fall back to a safe default rather than passing through something half-valid.",
    },
    {
      type: "code",
      lang: "python",
      code: `from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError, field_validator


class TicketTriage(BaseModel):
    # Reject any field the model invents, including injected ones.
    model_config = ConfigDict(extra="forbid", strict=True)

    category: Literal["billing", "bug", "account", "other"]
    priority: Literal["low", "normal", "high"]
    summary: str = Field(min_length=10, max_length=400)
    cited_doc_ids: list[str] = Field(max_length=5)

    @field_validator("summary")
    @classmethod
    def no_links_or_markup(cls, v: str) -> str:
        if "http://" in v or "https://" in v or "<" in v:
            raise ValueError("summary must be plain text without links or markup")
        return v


SAFE_DEFAULT = {"category": "other", "priority": "normal", "needs_human": True}


def parse_triage(raw_json: str, retrieved_ids: set[str]) -> dict:
    try:
        result = TicketTriage.model_validate_json(raw_json)
    except ValidationError as exc:
        log_guardrail_event("schema_reject", errors=exc.errors())
        return SAFE_DEFAULT

    # Business rule the schema cannot express: citations must be real retrievals.
    if not set(result.cited_doc_ids) <= retrieved_ids:
        log_guardrail_event("ungrounded_citation", ids=result.cited_doc_ids)
        return SAFE_DEFAULT

    return result.model_dump()`,
    },
    {
      type: "p",
      text: "Two details matter here. `extra=\"forbid\"` means a model that has been talked into adding an `approved: true` field fails validation instead of smuggling it downstream. And the grounding check is code, not another model call: it compares citations against what retrieval actually returned.",
    },
    { type: "h3", text: "Encoding" },
    {
      type: "p",
      text: "Treat model output as untrusted input to whatever consumes it. Escape it for HTML, never render raw markup, allow-list markdown features and image domains, and parameterise anything that touches SQL or a shell. OWASP lists this as [LLM05 Improper Output Handling](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/), and it is also the control that closes the markdown-image data exfiltration channel used in prompt injection attacks.",
    },
    { type: "h3", text: "PII and secret redaction" },
    {
      type: "p",
      text: "Models repeat what they have seen in context. Scan outputs for API keys, tokens, connection strings, card numbers and personal data before they reach the user or a log. Pattern-based detectors for well-formed secrets are fast and reliable; named-entity detection for names and addresses is fuzzier and should be tuned against your own data. The best redaction is upstream: if a secret never enters the context, it cannot leave.",
    },
    { type: "h2", text: "Runtime monitoring" },
    {
      type: "p",
      text: "Every guardrail decision is a log line. Record which layer fired, on which request, for which user, with a trace ID that links input, retrieval, tool calls and output. Then alert on the patterns that indicate an attack or a regression: spikes in schema rejections, repeated authorisation denials, unusual tool sequences, outputs containing external URLs, and per-user cost outliers. A kill switch that disables a specific tool without a deploy is part of this layer, and it should be tested before you need it.",
    },
    { type: "h2", text: "What guardrail classifiers can and cannot do" },
    {
      type: "p",
      text: "Classifier-based guardrails are useful, and the ecosystem is real. [NVIDIA NeMo Guardrails](https://docs.nvidia.com/nemo/guardrails/latest/index.html) is an open-source toolkit for programmable rails that run at different stages of an interaction: input, retrieval, dialog, execution and output. [Guardrails AI](https://www.guardrailsai.com/docs) is a Python framework that combines validators into input and output guards and helps with structured output. Meta publishes Llama Guard models for classifying prompts and responses against a hazard taxonomy, and Prompt Guard models aimed at detecting jailbreak attempts. The OpenAI moderation endpoint classifies text and images for categories such as harassment, hate, self-harm, sexual content and violence; its documentation does not list prompt injection as a category.",
    },
    {
      type: "p",
      text: "That last point generalises. Each tool detects what it was built and trained to detect, and nothing else. A content-safety classifier will not notice a polite instruction to email a customer list to an outside address, because that text is not harmful content. An injection classifier can be evaded by rephrasing, encoding or splitting a payload across turns. Benchmarks report performance on known attacks, not on an adversary iterating against your deployment. Use these tools for what they are: good detectors for specific risk categories, useful monitoring signals, and a way to raise attacker cost. Do not use any of them as the only thing protecting an action with real-world impact.",
    },
    { type: "h2", text: "Latency and cost trade-offs" },
    {
      type: "p",
      text: "Every model-based guardrail adds a network hop or an inference pass. Stack three of them in series and your chat feels sluggish. A few practical rules:",
    },
    {
      type: "ul",
      items: [
        "**Put deterministic checks first.** Length limits, schemas and allow-lists cost microseconds and remove work for everything after them.",
        "**Run input classification in parallel with generation** where possible, and cancel or withhold the response if the classifier flags. Users see no added latency on the common path.",
        "**Use small models for classification.** A compact classifier is usually adequate for a yes-or-no question; a frontier model as a judge on every message is expensive and slow.",
        "**Spend latency in proportion to risk.** A read-only FAQ answer needs less checking than a tool call that moves money. Apply the heavy guardrails at the tool boundary, where the stakes are.",
        "**Stream carefully.** Streaming output before output checks complete means users can see content you later retract. For high-risk outputs, buffer; for low-risk chat, stream and check incrementally.",
      ],
    },
    { type: "h2", text: "How to test LLM guardrails" },
    {
      type: "p",
      text: "Guardrails regress silently. A prompt edit, a model upgrade or a new tool can reopen a hole that was closed months ago, and nothing crashes. The answer is a regression suite that runs in CI on every change to prompts, models, tools or guardrail configuration.",
    },
    {
      type: "ol",
      items: [
        "**Collect cases from real attempts.** Every red-team finding, every flagged production input and every bug report becomes a test case.",
        "**Test each layer in isolation.** Unit-test schemas, allow-lists and redaction patterns with fixed inputs. These tests are deterministic and should never flake.",
        "**Test the system end to end.** Run attack payloads through the full pipeline and assert on outcomes: no privileged tool fired, no secret in the output, no external URL rendered.",
        "**Test for false positives too.** Keep a set of legitimate inputs that look suspicious, such as security documentation or support tickets quoting error messages, and assert they still work.",
        "**Track rates, not just pass or fail,** for the probabilistic layers. A classifier whose catch rate drops noticeably after a model change is a regression even if no single test fails.",
      ],
    },
    {
      type: "p",
      text: "When I (Sheikh Mujtaba) test an LLM application, the deliverable is not just a findings report but the payloads themselves, packaged so the team can keep running them. That is the bridge between a one-off assessment and lasting protection. The method behind those payloads is covered in the [AI red teaming guide](/blog/ai-red-teaming).",
    },
    {
      type: "callout",
      title: "A minimal guardrail stack to ship this month",
      text: "Length and rate limits on input. Entitlement filtering in retrieval. Strict schemas and user-scoped authorisation on every tool. Schema validation, encoding and secret scanning on output. Traces with alerts on rejections and denials. Then add classifiers on top. If you want help designing or reviewing that stack, see [services](/services).",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "LLM guardrails are a layered system across input, context, tools, output and monitoring, not a single filter.",
        "Deterministic guardrails enforce; probabilistic guardrails detect. Do not confuse the two.",
        "The tool boundary is where the real security control sits for any agent.",
        "Strict output schemas with forbidden extra fields and code-based grounding checks stop a lot of quiet failures.",
        "Classifier tools detect specific risk categories and nothing more; none of them replaces authorisation in code.",
        "Keep guardrail regression suites in CI and test for false positives as well as attacks.",
      ],
    },
  ],
  faqs: [
    {
      question: "What are LLM guardrails?",
      answer:
        "LLM guardrails are the controls around a language model that govern what it receives, what it can access or do, and what it returns. They include input limits and classifiers, retrieval filters, tool authorisation and approval gates, output schema validation, encoding and redaction, and runtime monitoring.",
    },
    {
      question: "Are guardrails enough to stop prompt injection?",
      answer:
        "Input classifiers alone are not. They catch known patterns but can be evaded. Prompt injection is contained by the deterministic guardrails: least-privilege tools authorised with the user's identity, strict output schemas, output encoding and human approval for high-impact actions. Those still work when the model has been persuaded.",
    },
    {
      question: "What is LLM output validation?",
      answer:
        "It is checking model output in code before anything consumes it: parsing it against a strict schema, rejecting unexpected fields, enforcing business rules such as valid citations, encoding it for its destination, and scanning it for secrets and personal data. On failure the system falls back to a safe default rather than passing partial output through.",
    },
    {
      question: "Which guardrail tools should I use?",
      answer:
        "Start with your own deterministic code: schemas, allow-lists and authorisation. Then evaluate tools such as NVIDIA NeMo Guardrails, Guardrails AI, Meta's Llama Guard and Prompt Guard models or a provider moderation endpoint against your own test cases, choosing based on the specific risks you need to detect and the latency you can afford.",
    },
    {
      question: "How much latency do guardrails add?",
      answer:
        "Deterministic checks add almost nothing. Each model-based check adds an inference pass, so running several in series can be noticeable. Put cheap checks first, run classifiers in parallel with generation where you can, use small models, and reserve the heaviest checks for high-risk actions such as tool calls.",
    },
  ],
};
