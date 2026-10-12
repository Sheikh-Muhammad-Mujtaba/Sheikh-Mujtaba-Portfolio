import type { BlogPost } from "../../utils/blog-types";

export const aiAgentSecurity: BlogPost = {
  slug: "ai-agent-security",
  title: "AI Agent Security: Excessive Agency and Least Privilege",
  heading: "AI Agent Security: Designing Agents That Fail Safely",
  description:
    "An AI agent security guide for teams shipping autonomous agents: OWASP excessive agency, the lethal trifecta, memory poisoning, multi-agent trust boundaries, non-human identities, approval gates by blast radius, sandboxing, audit logs and kill switches.",
  focusKeyword: "AI agent security",
  keywords: [
    "AI agent security",
    "agentic AI security",
    "securing AI agents",
    "excessive agency",
    "lethal trifecta",
    "AI agent permissions",
    "human in the loop AI",
    "memory poisoning",
    "OWASP agentic AI",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 10,
  excerpt:
    "A chatbot that is tricked says something wrong. An agent that is tricked does something wrong. Here is how to size permissions, gates and sandboxes to the damage an agent can actually do.",
  related: ["mcp-security", "agentic-ai-development", "prompt-injection"],
  blocks: [
    {
      type: "p",
      text: "**AI agent security** is about one uncomfortable shift: the model is no longer just producing text for a human to read, it is choosing and executing actions. A chatbot that gets manipulated says something wrong. An agent that gets manipulated sends the email, merges the pull request, issues the refund or deletes the record. Every technique that makes an agent useful — tools, memory, credentials, autonomy, delegation to other agents — is also a way for an attacker or a plain mistake to cause damage. This guide is how I think about sizing those capabilities, and the controls that keep an agent's worst day survivable.",
    },
    {
      type: "callout",
      title: "Design for the bad day",
      text: "Assume the agent will, at some point, be convinced to do the wrong thing — through prompt injection, a poisoned memory, a misread instruction or a bug. The security question is not whether that happens. It is how much it can do when it does.",
    },
    { type: "h2", text: "Why agents change the threat model" },
    {
      type: "p",
      text: "Classic [AI security](/blog/ai-security) for a chat feature focuses on what the model might say: leaking a system prompt, producing harmful content, disclosing data from retrieval. Agents add three things that change the maths:",
    },
    {
      type: "ul",
      items: [
        "**Actions with side effects.** Tool calls touch real systems, and many of those effects cannot be undone.",
        "**Loops without a human between steps.** An agent may make dozens of decisions before anyone looks, so one bad input can compound.",
        "**Standing credentials.** The agent holds API keys, OAuth tokens or service accounts, which makes it a non-human identity with privileges of its own.",
      ],
    },
    {
      type: "p",
      text: "Put together, the model's inability to reliably separate instructions from data — the root of [prompt injection](/blog/prompt-injection) — stops being a content problem and becomes an authorisation problem.",
    },
    { type: "h2", text: "OWASP LLM06: Excessive Agency" },
    {
      type: "p",
      text: "The OWASP Top 10 for LLM Applications names this risk directly. [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) is the vulnerability that enables damaging actions to be performed in response to unexpected, ambiguous or manipulated outputs from an LLM. OWASP traces it to three root causes, and they make a useful audit checklist for any agent:",
    },
    {
      type: "table",
      head: ["Root cause", "What it looks like", "Fix"],
      rows: [
        [
          "Excessive functionality",
          "The agent has a shell tool when it only needs to read one log file; a mail plugin can send as well as read",
          "Narrow, purpose-built tools; remove what the workflow does not use",
        ],
        [
          "Excessive permissions",
          "The tool connects with an admin account or a token that can reach every repository",
          "Least-privilege identity per tool, ideally scoped to the end user",
        ],
        [
          "Excessive autonomy",
          "High-impact actions run without anyone confirming them",
          "Human approval for actions above a blast-radius threshold",
        ],
      ],
    },
    {
      type: "p",
      text: "OWASP's mitigations follow the same lines: minimise extensions and their functionality, avoid open-ended extensions such as arbitrary shell or URL access, execute actions in the user's own security context, require user approval for high-impact actions, and enforce authorisation in downstream systems rather than relying on the model to decide what is allowed. It also notes that logging, monitoring and rate limiting do not prevent excessive agency but do limit the damage. The full list is covered in my [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications) breakdown.",
    },
    { type: "h2", text: "The lethal trifecta" },
    {
      type: "p",
      text: "Simon Willison's [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) is the single most useful mental model for agent data exfiltration. An agent that combines all three of these capabilities can be tricked into sending your private data to an attacker:",
    },
    {
      type: "ol",
      items: [
        "**Access to private data** — your inbox, documents, database, repositories.",
        "**Exposure to untrusted content** — anything an outsider can write that the agent will read: web pages, emails, issues, uploaded files.",
        "**The ability to externally communicate** — sending email, making HTTP requests, posting comments, even rendering an image from a URL.",
      ],
    },
    {
      type: "p",
      text: "Willison's point is that nobody yet knows how to prevent this reliably with filters alone; a guardrail that catches 95% of attacks is, in his words, a failing grade by web security standards. The practical design rule follows: for any given agent session, **remove at least one leg of the trifecta**. A research agent that browses the open web should not hold your CRM token. An agent with access to private data and untrusted input should not have an unrestricted outbound channel; its outputs go to a human or to an allow-listed destination.",
    },
    { type: "h2", text: "Memory poisoning" },
    {
      type: "p",
      text: "Long-term memory turns a one-off injection into a persistent one. If an agent writes \"facts\" or \"preferences\" to a memory store based on content it read, an attacker who gets one instruction into that store influences every later session. OWASP's Top 10 for Agentic Applications lists this as **ASI06 Memory & Context Poisoning**. Controls that work:",
    },
    {
      type: "ul",
      items: [
        "Record the provenance of every memory entry: which session, which source, which user.",
        "Do not let content from untrusted sources write to shared memory without review. User-stated preferences and tool-derived observations belong in different stores.",
        "Scope memory per user and per tenant; one customer's conversation must never shape another's.",
        "Give memories an expiry and make them inspectable and deletable, so a poisoned entry can be found and removed.",
        "Treat anything recalled from memory as untrusted data at use time, exactly like a retrieved document in [RAG security](/blog/rag-security).",
      ],
    },
    { type: "h2", text: "Multi-agent trust boundaries" },
    {
      type: "p",
      text: "Splitting work across several agents is good engineering, but it is not a security boundary by default. If a planner agent reads an attacker's email and passes a summary to an executor agent that holds write permissions, the injection has simply travelled one hop. OWASP's agentic list calls this out as **ASI07 Insecure Inter-Agent Communication** and **ASI08 Cascading Failures**.",
    },
    {
      type: "ul",
      items: [
        "Treat messages from another agent as untrusted input unless that agent only ever sees trusted data.",
        "Pass structured, schema-validated messages between agents, not free text that can carry new instructions.",
        "Give each agent its own identity and credentials; never let an agent borrow a more privileged agent's token.",
        "Put the approval gate on the agent that acts, not the one that plans, because that is where the side effect happens.",
      ],
    },
    { type: "h2", text: "Non-human identities and credentials" },
    {
      type: "p",
      text: "Every agent is a non-human identity, and OWASP lists **ASI03 Identity & Privilege Abuse** among the top agentic risks. The common failure is a single long-lived service account with broad rights shared by every tool. Better patterns:",
    },
    {
      type: "ul",
      items: [
        "**Act on behalf of the user** wherever possible, with delegated OAuth tokens scoped to that user, so the downstream system enforces their real permissions.",
        "**One credential per tool and environment**, with the narrowest scope that works: read-only where the tool only reads.",
        "**Short-lived tokens** issued per task or session, rather than static keys in environment variables.",
        "**Keep secrets out of the context window.** The model needs a tool that uses the key, never the key itself.",
        "**Inventory and rotate** agent credentials like any other service account, and revoke them as part of the kill switch.",
      ],
    },
    { type: "h2", text: "Permission boundaries belong at the tool layer" },
    {
      type: "p",
      text: "The system prompt is not a security control. \"Never delete records\" in a prompt is a suggestion that a sufficiently clever input can override. The enforceable boundary is the tool: what it can reach, which identity it uses, what arguments it accepts and what checks run before it does anything. Every tool should validate its inputs against a strict schema, re-check authorisation using the real session identity rather than anything the model claims, enforce hard limits (amounts, recipients, row counts), and be idempotent so a retry cannot double an effect. The same principle applies to third-party tools loaded through MCP, which I cover in [MCP security](/blog/mcp-security).",
    },
    { type: "h2", text: "Approval gates sized by blast radius" },
    {
      type: "p",
      text: "Asking a human to approve everything produces approval fatigue, and fatigued reviewers click yes. Asking for nothing is excessive autonomy. The answer is to classify every action by how much damage it can do and how reversible it is, then match the control to that:",
    },
    {
      type: "table",
      head: ["Blast radius", "Examples", "Control"],
      rows: [
        [
          "Read-only, internal",
          "Search documents, read a ticket, query a report",
          "Autonomous; user-scoped credentials; logged",
        ],
        [
          "Reversible write, internal",
          "Draft a reply, add a label, create a draft record",
          "Autonomous with rate limits; easy undo; logged",
        ],
        [
          "External communication",
          "Send an email, post a comment, call an external API",
          "Human approval, or an allow-list of recipients and domains",
        ],
        [
          "Irreversible or financial",
          "Payments, refunds, deletions, permission changes",
          "Human approval showing full arguments; hard limits in the tool",
        ],
        [
          "Code or infrastructure",
          "Run commands, deploy, change configuration",
          "Sandbox only; approval for anything that leaves the sandbox",
        ],
      ],
    },
    {
      type: "p",
      text: "When I (Sheikh Mujtaba) built my \"AI Employee\", a Digital FTE made of nine orchestrated services, this table was effectively the design. The agents draft, research and prepare work autonomously, but actions with external or irreversible effects wait in a human-in-the-loop approval queue on a secured Next.js and FastAPI dashboard. The useful lesson was that the approval step has to show exactly what will happen — the full recipient list, the full body, the exact amount — or the human is approving a summary written by the system they are supposed to be checking.",
    },
    { type: "h2", text: "Example: an approval-gated tool executor" },
    {
      type: "p",
      text: "Here is the pattern in Python. Every tool declares its risk tier; the executor enforces the tier, the kill switch and the audit log, so no individual tool author can forget them.",
    },
    {
      type: "code",
      lang: "python",
      code: `from dataclasses import dataclass
from enum import IntEnum
from typing import Any, Callable


class Risk(IntEnum):
    READ = 0
    REVERSIBLE = 1
    EXTERNAL = 2
    IRREVERSIBLE = 3


@dataclass
class Tool:
    name: str
    risk: Risk
    schema: type            # e.g. a Pydantic model
    run: Callable[..., Any]


AUTO_APPROVE_MAX = Risk.REVERSIBLE


async def execute(tool: Tool, raw_args: dict, session) -> dict:
    # 1. Kill switch: checked on every call, flipped without a deploy.
    if await flags.is_disabled("agent") or await flags.is_disabled(tool.name):
        return {"status": "disabled"}

    # 2. Validate arguments strictly. The model's output is untrusted input.
    args = tool.schema.model_validate(raw_args)

    # 3. Authorise against the real user, not anything the model claims.
    if not await policy.allows(session.user_id, tool.name, args):
        await audit.log("denied", tool.name, args, session)
        return {"status": "not_authorised"}

    # 4. Gate by blast radius.
    if tool.risk > AUTO_APPROVE_MAX:
        approval = await approvals.create(
            tool=tool.name,
            args=args.model_dump(),       # full arguments, shown verbatim
            user_id=session.user_id,
            trace_id=session.trace_id,
        )
        await audit.log("pending_approval", tool.name, args, session)
        return {"status": "pending_approval", "approval_id": approval.id}

    # 5. Execute and record the outcome.
    result = await tool.run(args, session=session)
    await audit.log("executed", tool.name, args, session, result=result)
    return {"status": "ok", "result": result}`,
    },
    {
      type: "p",
      text: "The approved action is executed later by a separate worker that re-validates the stored arguments and re-checks authorisation, so approving a request cannot be turned into approving something the agent edited afterwards.",
    },
    { type: "h2", text: "Sandboxing, audit logs and kill switches" },
    { type: "h3", text: "Sandboxing" },
    {
      type: "ul",
      items: [
        "Run code execution and shell tools in a disposable container or VM with no access to host credentials, a read-only base image and a scratch working directory.",
        "Restrict network egress to an allow-list. An agent that cannot reach arbitrary hosts has lost the third leg of the lethal trifecta.",
        "Apply CPU, memory, time and cost limits per task. Runaway loops are an availability and billing risk.",
      ],
    },
    { type: "h3", text: "Audit logs" },
    {
      type: "ul",
      items: [
        "Log every model call, tool call, argument set, result, approval and denial with a trace ID and the acting user.",
        "Make logs append-only and store them outside the agent's reach; an agent should never be able to edit its own audit trail.",
        "Alert on patterns that matter: new tools in use, repeated denials, unusual outbound destinations, sudden spikes in cost or call volume.",
      ],
    },
    { type: "h3", text: "Kill switches" },
    {
      type: "ul",
      items: [
        "Have a switch per tool and one for the whole agent, checked at execution time, that does not require a deploy.",
        "Pair it with a credential revocation runbook, so stopping the agent also stops anyone holding its tokens.",
        "Test it. A kill switch that has never been flipped in staging is a hypothesis.",
      ],
    },
    {
      type: "callout",
      title: "Test the agent like an attacker would",
      text: "Before an agent goes live, plant injection payloads in every channel it reads, try to chain tools into effects none should allow alone, and confirm the approval gate holds. Keep those attacks as regression tests. My [AI red teaming](/blog/ai-red-teaming) guide covers the method, and [agentic AI development](/blog/agentic-ai-development) covers the architecture these controls sit in. If you want this done on your own system, see my [services](/services).",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "AI agent security is an authorisation problem: assume the agent will be manipulated and limit what it can do when it is.",
        "Audit every agent against OWASP's three causes of excessive agency: functionality, permissions and autonomy.",
        "Break the lethal trifecta — no session should combine private data, untrusted content and an open outbound channel.",
        "Treat memory and messages from other agents as untrusted input with provenance, scope and expiry.",
        "Enforce permissions in the tool with the user's real identity, and size approval gates by blast radius.",
        "Sandbox execution, keep append-only audit logs, and ship a kill switch you have actually tested.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is excessive agency in AI?",
      answer:
        "Excessive agency is OWASP's LLM06:2025 risk: an LLM-based system can perform damaging actions in response to unexpected, ambiguous or manipulated output. OWASP attributes it to excessive functionality, excessive permissions and excessive autonomy. The fixes are narrow tools, least-privilege credentials scoped to the user, authorisation enforced in downstream systems, and human approval for high-impact actions.",
    },
    {
      question: "What is the lethal trifecta for AI agents?",
      answer:
        "It is Simon Willison's term for the combination of access to private data, exposure to untrusted content and the ability to communicate externally. An agent with all three can be tricked by injected instructions into sending private data to an attacker. Because filters cannot reliably stop this, the safest design removes at least one of the three capabilities from any given session.",
    },
    {
      question: "Should every AI agent action require human approval?",
      answer:
        "No. Approving everything causes fatigue and rubber-stamping. Classify actions by blast radius and reversibility: let read-only and easily reversible internal actions run autonomously with logging, and require approval — showing the full arguments — for external communication, financial, destructive or infrastructure changes.",
    },
    {
      question: "How do I stop memory poisoning in an AI agent?",
      answer:
        "Record the source of every memory entry, keep memory scoped per user and tenant, prevent untrusted content from writing to shared memory without review, give entries an expiry, and make memory inspectable and deletable. Treat anything recalled from memory as untrusted data when it is used, the same way you would treat a retrieved document.",
    },
    {
      question: "Is a multi-agent system more secure than a single agent?",
      answer:
        "Only if the boundaries are enforced. Passing an injected instruction from one agent to another just moves it. Give each agent its own credentials, exchange schema-validated messages rather than free text, treat other agents' output as untrusted, and put the approval gate on the agent that actually performs the action.",
    },
  ],
};
