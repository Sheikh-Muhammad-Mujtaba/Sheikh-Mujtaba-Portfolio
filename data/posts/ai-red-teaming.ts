import type { BlogPost } from "../../utils/blog-types";

export const aiRedTeaming: BlogPost = {
  slug: "ai-red-teaming",
  title: "AI Red Teaming: A Step-by-Step Methodology for LLM Apps",
  heading: "AI Red Teaming: A Practical Methodology",
  description:
    "A step-by-step AI red teaming methodology for LLM applications and agents: scoping and rules of engagement, threat modelling the whole system, building an attack corpus, manual and automated testing with PyRIT, garak and promptfoo, measuring attack success rate, and regression testing in CI.",
  focusKeyword: "AI red teaming",
  keywords: [
    "AI red teaming",
    "LLM red teaming",
    "red teaming AI models",
    "AI red teaming tools",
    "AI penetration testing",
    "AI red teaming methodology",
    "attack success rate",
    "PyRIT",
    "garak LLM scanner",
    "promptfoo red teaming",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 11,
  excerpt:
    "Red teaming an LLM application is not a pile of jailbreak prompts. It is scoping, threat modelling, a curated attack corpus, measured results and regression tests.",
  related: [
    "owasp-top-10-for-llm-applications",
    "how-to-become-an-ai-security-engineer",
    "prompt-injection",
  ],
  blocks: [
    {
      type: "p",
      text: "**AI red teaming** is the practice of attacking an AI system the way a real adversary would, in order to find failures before someone else does. For LLM applications that means more than trying jailbreak prompts against a chatbot. The model is one component; the real targets are the tools it can call, the data it can reach and the systems that trust its output. This guide is the methodology I use, phase by phase, from scoping through to regression tests in CI.",
    },
    {
      type: "callout",
      title: "Red team the system, not just the model",
      text: "A model that says something rude is a content problem. A model that can be talked into refunding the wrong account, leaking another tenant's documents or running a shell command is a security problem. Prioritise findings by what the system can do, not by how embarrassing the text is.",
    },
    { type: "h2", text: "The methodology at a glance" },
    {
      type: "table",
      head: ["Phase", "Goal", "Key output"],
      rows: [
        ["1. Scope and rules of engagement", "Agree what is in bounds and how to stay safe", "Signed scope, test accounts, stop conditions"],
        ["2. Threat model the system", "Map assets, entry points, tools and trust boundaries", "Data-flow diagram and prioritised attack goals"],
        ["3. Build the attack corpus", "Assemble techniques and payloads mapped to goals", "Versioned corpus tagged by technique and risk"],
        ["4. Manual testing", "Find novel, chained and context-specific failures", "Reproducible findings with transcripts"],
        ["5. Automated testing", "Run breadth and variation at scale", "Scan results with attack success rates"],
        ["6. Agents and tools", "Test what the model can do, not just say", "Tool-abuse and data-boundary findings"],
        ["7. Measure and report", "Rate severity and reproducibility", "Findings report mapped to OWASP IDs"],
        ["8. Regress in CI", "Stop fixed issues coming back", "Automated suite on every prompt or model change"],
      ],
    },
    { type: "h2", text: "Phase 1: Scoping and rules of engagement" },
    {
      type: "p",
      text: "AI red teaming is an authorised security exercise like any penetration test. Before sending a single prompt, get the following agreed in writing:",
    },
    {
      type: "ul",
      items: [
        "**Targets:** which applications, endpoints, models and environments. Prefer staging with production-like data shapes but no real customer data.",
        "**Objectives:** what counts as a win. \"Exfiltrate another user's data\" and \"trigger an unapproved payment\" are better objectives than \"make it say bad things\".",
        "**Out of bounds:** third-party providers' infrastructure, real customers, volume that could breach the provider's terms or run up an unbounded bill.",
        "**Accounts and data:** dedicated test users at each privilege level, plus seeded canary records so data leaks are easy to detect.",
        "**Stop conditions and contacts:** who to call if you find something critical, and when testing must pause.",
        "**Harm-content handling:** if the scope includes harmful-content testing, agree how transcripts are stored and who may see them.",
      ],
    },
    { type: "h2", text: "Phase 2: Threat model the system" },
    {
      type: "p",
      text: "Draw the data flow before you attack it. For each component, ask who can write to it, what the model can do with it, and what trusts the model's output. The [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications) is the coverage checklist I map against at this stage.",
    },
    {
      type: "ol",
      items: [
        "**Entry points:** chat, API, file uploads, email or ticket ingestion, web pages the system fetches, webhooks, memory.",
        "**Data sources:** vector stores, databases, document shares, and whose permissions are used to read them.",
        "**Tools and actions:** every function the model can call, the credentials behind it, and whether any action runs without a human.",
        "**Output sinks:** where responses are rendered or executed: browsers, SQL, shells, emails, other agents.",
        "**Trust boundaries:** every point where untrusted content can reach the context window of a call that holds privileged tools.",
      ],
    },
    {
      type: "p",
      text: "The output is a short list of attack goals ranked by impact. An agent with a refund tool and an inbox it reads automatically will usually top the list, because it combines untrusted input with real-world effect.",
    },
    { type: "h2", text: "Phase 3: Build the attack corpus" },
    {
      type: "p",
      text: "A corpus is a versioned set of attack cases, each tagged with technique, target goal and the OWASP risk it exercises. Organise it by technique rather than by individual prompt, because single prompts go stale as models change while techniques persist.",
    },
    {
      type: "table",
      head: ["Technique family", "What it tries"],
      rows: [
        ["Instruction override", "Direct attempts to replace or append to the system instructions"],
        ["Role-play and framing", "Fiction, hypotheticals, personas and authority claims"],
        ["Obfuscation", "Base64, ciphers, homoglyphs, zero-width characters, other languages"],
        ["Multi-turn escalation", "Building context across several benign-looking turns"],
        ["Indirect injection", "Payloads planted in documents, web pages, tickets, filenames and metadata"],
        ["Delimiter and format escape", "Breaking out of the quoting or structure that wraps untrusted content"],
        ["Tool and data abuse", "Reaching tools, records or tenants outside the user's entitlement"],
        ["Output weaponisation", "Making the model emit markup, SQL, shell or exfiltration URLs"],
        ["Resource exhaustion", "Long outputs, recursive tool calls and oversized inputs"],
      ],
    },
    {
      type: "p",
      text: "Add the canary values from Phase 1 to your detection logic: if a canary string from another test tenant ever appears in a response, you have a data-boundary finding without needing to judge the text.",
    },
    { type: "h2", text: "Phase 4: Manual testing" },
    {
      type: "p",
      text: "Manual testing finds the failures that matter most: the ones specific to this application's tools, data and business logic. A scanner does not know that an order ID in a support ticket is enough to trigger a refund. A human reading the tool list does.",
    },
    {
      type: "p",
      text: "In my own red-teaming work (Sheikh Mujtaba), including Gray Swan ethical red-teaming engagements, the pattern I see most often is that persistence and adaptation beat any single clever prompt. You read the refusal, work out which part of the request triggered it, change one variable and try again. Keep notes on every attempt, including failures, because the path to a working attack is part of the finding.",
    },
    {
      type: "ul",
      items: [
        "Establish a baseline first: what does correct behaviour look like for each feature?",
        "Change one variable at a time so you know what actually caused a bypass.",
        "Re-run every success several times; LLM outputs are non-deterministic, and a one-in-twenty success is still a finding.",
        "Chain small weaknesses. A leaked system prompt reveals tool names; tool names make injection payloads precise.",
      ],
    },
    { type: "h2", text: "Phase 5: Automated testing and AI red teaming tools" },
    {
      type: "p",
      text: "Automation gives breadth: hundreds of variants, every technique family, every release. Three open-source tools are worth knowing, and they suit different jobs.",
    },
    {
      type: "table",
      head: ["Tool", "What it is", "Best used for"],
      rows: [
        [
          "[PyRIT](https://github.com/microsoft/PyRIT)",
          "Microsoft's open-source Python Risk Identification Tool for generative AI. Built from targets, converters, scorers and attacks, with conversation memory",
          "Scripted and multi-turn attack campaigns where an attacker LLM adapts to the target, such as the Crescendo technique",
        ],
        [
          "[garak](https://github.com/NVIDIA/garak)",
          "NVIDIA's Generative AI Red-teaming and Assessment Kit, a command-line LLM vulnerability scanner using probes, detectors and generators",
          "Broad scans of a model or endpoint for prompt injection, jailbreaks, data leakage, toxicity and hallucination",
        ],
        [
          "[promptfoo](https://github.com/promptfoo/promptfoo)",
          "An MIT-licensed CLI and library for evaluating and red teaming LLM applications",
          "Application-level red team configs, generated attack sets and CI/CD checks",
        ],
      ],
    },
    {
      type: "p",
      text: "Two cautions. First, automated scorers make mistakes in both directions, so sample and manually review results, especially anything scored as a pass on a high-risk goal. Second, point scanners at your application endpoint, not only at the bare model. The bare model has no tools, no retrieval and no output sinks, so it cannot show you most of the risks that matter.",
    },
    { type: "h2", text: "Phase 6: Testing agents and tools" },
    {
      type: "p",
      text: "Agents raise the stakes because a successful injection becomes an action. The question shifts from \"what will it say?\" to \"what will it do, and with whose permissions?\" I cover the defensive side in [AI agent security](/blog/ai-agent-security) and [MCP security](/blog/mcp-security); the offensive checklist is:",
    },
    {
      type: "ol",
      items: [
        "**Unauthorised tool reach:** can a low-privilege user cause a tool call that should require higher privilege?",
        "**Indirect injection to action:** plant instructions in content the agent reads (a ticket, a fetched page, a calendar invite) and see whether any tool fires.",
        "**Tool chaining:** combine two allowed actions into a forbidden effect, such as reading a private record and then emailing it externally.",
        "**Parameter tampering:** coax the model into passing another user's ID, an oversized amount or a path traversal string to a tool.",
        "**Approval bypass:** check that human-approval gates cannot be skipped by rephrasing, splitting an action or retrying.",
        "**Runaway loops:** trigger failing tool calls and confirm step limits and budgets actually stop the agent.",
      ],
    },
    {
      type: "p",
      text: "Assert on tool calls, not on text. The model may refuse politely in its reply while having already called the tool in the same turn, so instrument the tool layer and treat any unexpected call as the finding.",
    },
    { type: "h2", text: "Phase 7: Measuring and reporting" },
    {
      type: "p",
      text: "Because LLM behaviour is probabilistic, a finding needs a rate as well as a reproduction. Run each successful attack a fixed number of times (for example, twenty) and report the attack success rate: successful attempts divided by total attempts. Report the model version, temperature and system prompt version alongside it, because any of these can change the number.",
    },
    {
      type: "ul",
      items: [
        "**Severity** comes from impact and reachability: who can trigger it, what they gain, and whether user interaction is needed. A low success rate does not make a critical impact low severity; attackers can retry.",
        "**Reproducibility** comes from complete transcripts, exact payloads, environment details and the success rate.",
        "**Mapping** to OWASP LLM IDs gives developers and auditors a shared reference.",
        "**Remediation** should name an architectural control, not just a prompt edit. Prompt edits are the weakest fix and the easiest to regress.",
      ],
    },
    {
      type: "code",
      lang: "markdown",
      code: `## Finding: Indirect prompt injection triggers refund tool

**ID:** AIRT-007
**Severity:** High
**OWASP mapping:** LLM01:2025 Prompt Injection, LLM06:2025 Excessive Agency
**Component:** Support triage agent, issue_refund tool
**Environment:** staging, model <name/version>, temperature <x>, system prompt v<n>

### Summary
Instructions placed in a customer support ticket cause the triage agent
to call issue_refund for an order the ticket author does not own.

### Preconditions
- Attacker can submit a support ticket (any unauthenticated user).
- Agent processes new tickets automatically.

### Steps to reproduce
1. Submit a ticket whose body contains the payload in Appendix A.
2. Wait for the triage agent to process the ticket.
3. Observe the tool-call log for issue_refund with order <canary order ID>.

### Attack success rate
<successes>/<attempts> runs on <date>.

### Impact
Unauthenticated users can trigger refunds against arbitrary orders up to
the auto-approve ceiling.

### Root cause
issue_refund authorises against the agent's service account, not the
ticket author's identity. Untrusted ticket text shares a context with the
privileged tool.

### Recommended fix
- Authorise refunds against the ticket author's identity inside the tool.
- Split summarisation of untrusted tickets into a tool-less call.
- Require human approval for all refunds initiated from ticket content.

### Retest
Add the Appendix A payload and its variants to the CI regression suite.

### Appendix A: payload and full transcript
<redacted payload and transcript>`,
    },
    { type: "h2", text: "Phase 8: Regression testing in CI" },
    {
      type: "p",
      text: "Every confirmed finding becomes a test. LLM applications regress silently: a one-line prompt change, a new tool or a model upgrade can reopen something that was fixed months ago. Run the suite on every change to prompts, tools, retrieval configuration or model version.",
    },
    {
      type: "code",
      lang: "yaml",
      code: `# Example CI job: run the red-team regression suite on relevant changes.
name: llm-red-team-regression
on:
  pull_request:
    paths:
      - "prompts/**"
      - "agents/tools/**"
      - "config/model.yaml"
jobs:
  regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements-dev.txt
      # Each case replays a confirmed finding N times against staging
      # and fails if any privileged tool fires or a canary value leaks.
      - run: pytest tests/redteam --runs-per-case 10`,
    },
    {
      type: "p",
      text: "Gate on tool calls and canary leaks, which are deterministic to detect, rather than on judging response text. Track attack success rate per case over time so you notice a fix weakening before it fails outright.",
    },
    { type: "h2", text: "Lessons from competitive red-teaming arenas" },
    {
      type: "p",
      text: "Competitive arenas such as Gray Swan's, where many researchers attack the same models against defined objectives, teach habits that transfer directly to client work:",
    },
    {
      type: "ul",
      items: [
        "**Objectives must be precise.** A clear success condition, such as a specific tool call with specific arguments, prevents arguments about whether a borderline output counts. Write your own scope this way.",
        "**Defences that look strong in isolation often fall to combined techniques.** Framing plus obfuscation plus multi-turn setup is the norm, not the exception.",
        "**Indirect injection through tool output is a rich attack surface.** Content the agent fetches is often treated with less suspicion than the user's own message.",
        "**Refusals are signal.** How a model refuses tells you which part of the request it reacted to.",
        "**Document as you go.** A success you cannot reproduce is not a finding.",
      ],
    },
    {
      type: "callout",
      title: "Getting into this work",
      text: "If you want to do this professionally, arenas, CTFs and a home lab are a practical route in. I cover the path in [how to become an AI security engineer](/blog/how-to-become-an-ai-security-engineer). If you need an LLM application or agent tested, see my [security services](/services).",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "AI red teaming targets the whole system: tools, data, output sinks and permissions, not just the model's words.",
        "Start with written scope, test accounts and canary data, then threat model before attacking.",
        "Organise the attack corpus by technique and map it to the OWASP LLM Top 10.",
        "Use manual testing for depth and tools such as PyRIT, garak and promptfoo for breadth.",
        "For agents, assert on tool calls and canary leaks rather than response text.",
        "Report severity, reproduction steps and attack success rate, and turn every finding into a CI regression test.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is AI red teaming?",
      answer:
        "AI red teaming is authorised adversarial testing of an AI system to find security, safety and misuse failures before real attackers do. For LLM applications it covers prompt injection, data leakage, tool and agent abuse, unsafe output handling and resource exhaustion, tested against the whole application rather than the model alone.",
    },
    {
      question: "How is AI red teaming different from traditional penetration testing?",
      answer:
        "The process is similar: scope, threat model, test, report, retest. The differences are that the target behaves probabilistically, so findings need success rates as well as reproductions; that natural language is an attack vector; and that a model's mistakes can become actions when it holds tools. Traditional web testing skills still apply to the surrounding APIs and output handling.",
    },
    {
      question: "What are the best AI red teaming tools?",
      answer:
        "Three widely used open-source options are Microsoft PyRIT for scripted and multi-turn attack campaigns, NVIDIA garak for broad vulnerability scanning of models and endpoints, and promptfoo for application-level evaluation, red teaming and CI checks. None replaces manual testing of your application's specific tools and business logic.",
    },
    {
      question: "What is attack success rate in LLM red teaming?",
      answer:
        "It is the proportion of attempts at a given attack that succeed, measured over a fixed number of runs under recorded conditions such as model version, temperature and prompt version. Because LLM outputs vary between runs, it is a more honest measure than a single success, and tracking it over time shows whether a fix is holding.",
    },
    {
      question: "How often should an LLM application be red teamed?",
      answer:
        "Run a full exercise before launch and after significant changes such as new tools, new data sources or a new model. In between, keep every confirmed finding as an automated regression test that runs whenever prompts, tools, retrieval settings or the model version change.",
    },
  ],
};
