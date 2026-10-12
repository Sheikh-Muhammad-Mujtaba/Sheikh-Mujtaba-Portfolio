import type { BlogPost } from "../../utils/blog-types";

export const mcpSecurity: BlogPost = {
  slug: "mcp-security",
  title: "MCP Security: How to Secure Model Context Protocol Servers",
  heading: "MCP Security: Securing Model Context Protocol Servers",
  description:
    "A practical MCP security guide: the Model Context Protocol trust model, tool poisoning, rug pulls, indirect prompt injection, token passthrough, confused deputy and local server risks, plus a hardening checklist and an allow-list wrapper for tool calls.",
  focusKeyword: "MCP security",
  keywords: [
    "MCP security",
    "Model Context Protocol security",
    "MCP server security",
    "MCP tool poisoning",
    "secure MCP server",
    "MCP rug pull",
    "MCP token passthrough",
    "MCP authorization",
    "AI agent tool security",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 11,
  excerpt:
    "Every MCP server you connect is code you run and text your model reads. Here is the trust model, the attacks that exploit it, and the controls that keep an MCP deployment from becoming a backdoor.",
  related: ["ai-agent-security", "prompt-injection", "agentic-ai-development"],
  blocks: [
    {
      type: "p",
      text: "**MCP security** is the discipline of deciding which Model Context Protocol servers your AI application may talk to, what those servers may do, and what happens when one of them lies. MCP has made it trivially easy to give a model new tools — a file system, a database, a ticketing system, a browser — and that ease is exactly the problem. Each server you add is both code that executes with real credentials and text that your model reads and may obey. This guide covers the protocol's trust model, the attack classes that are documented against it, and the hardening checklist I apply before an MCP server goes anywhere near production data.",
    },
    {
      type: "callout",
      title: "The short version",
      text: "An MCP server is a third-party dependency that also gets to write part of your prompt. Treat its code like any untrusted package and its tool descriptions and results like any untrusted input. The protocol itself says this: tool annotations are to be considered untrusted unless they come from a trusted server.",
    },
    { type: "h2", text: "What MCP is, in one paragraph" },
    {
      type: "p",
      text: "The [Model Context Protocol](https://modelcontextprotocol.io/specification/latest) is an open protocol, built on JSON-RPC 2.0 messages, that standardises how LLM applications connect to external data and tools. The specification defines three roles. A **host** is the LLM application the user interacts with — an IDE, a chat app, an agent runtime. Inside the host, each **client** is a connector that holds a connection to one **server**. Servers expose three kinds of capability: **tools** (functions the model can call), **resources** (context and data) and **prompts** (templated messages for users). Clients can in turn offer servers features such as sampling, roots and elicitation. Servers run either locally, typically launched as a subprocess over the `stdio` transport, or remotely over HTTP.",
    },
    { type: "h2", text: "The MCP trust model" },
    {
      type: "p",
      text: "Security problems in MCP almost always come from someone trusting the wrong party. It helps to be explicit about who is trusted with what:",
    },
    {
      type: "table",
      head: ["Component", "What it controls", "What you should assume"],
      rows: [
        [
          "Host",
          "Which servers are connected, what the model sees, whether a tool call runs",
          "This is your enforcement point. Consent, allow-lists and logging live here.",
        ],
        [
          "Client",
          "One connection to one server; forwards tool lists and calls",
          "Must validate everything the server sends, including URLs during auth discovery.",
        ],
        [
          "Server",
          "Tool names, descriptions, schemas, results; local servers also run code on your machine",
          "Untrusted until reviewed and pinned. Even a reviewed server returns untrusted data.",
        ],
        [
          "Tool description",
          "Text injected into the model's context so it knows when to call the tool",
          "Effectively part of your prompt, written by the server author.",
        ],
        [
          "Tool result",
          "Data returned from the downstream system (emails, issues, web pages, files)",
          "May contain instructions written by anyone who can write to that system.",
        ],
      ],
    },
    {
      type: "p",
      text: "The specification is clear about where responsibility lands. Its security principles say users must explicitly consent to data access and operations, hosts must obtain explicit consent before invoking any tool, and tools represent arbitrary code execution and must be treated with appropriate caution. The tools page adds that there **should always be a human in the loop with the ability to deny tool invocations**. MCP itself cannot enforce these principles at the protocol level — the host has to.",
    },
    { type: "h2", text: "The MCP risk classes that actually matter" },
    {
      type: "table",
      head: ["Risk", "How it works", "Primary control"],
      rows: [
        [
          "Tool poisoning",
          "Hidden instructions in a tool description steer the model, e.g. to read secrets and pass them in a parameter",
          "Review and pin tool definitions; show full descriptions; allow-list tools",
        ],
        [
          "Rug pull",
          "A server changes a tool's definition after you approved it",
          "Hash-pin definitions; re-approve on any change",
        ],
        [
          "Tool shadowing",
          "One server's description changes how the model uses another server's trusted tool",
          "Isolate servers; namespace tools; limit which servers share a session",
        ],
        [
          "Indirect prompt injection",
          "A tool result (issue, email, web page) carries attacker instructions",
          "Treat results as data; least privilege; approval for sensitive calls",
        ],
        [
          "Token passthrough",
          "Server accepts tokens not issued for it and forwards them downstream",
          "Validate audience; never forward client tokens",
        ],
        [
          "Confused deputy (OAuth proxy)",
          "Proxy server with a static client ID lets an attacker skip user consent",
          "Per-client consent, exact redirect URI matching, state validation",
        ],
        [
          "Over-broad scopes",
          "One stolen token unlocks every tool and resource",
          "Minimal initial scopes; step-up authorisation",
        ],
        [
          "Local server compromise",
          "Malicious startup command or payload runs with your user's privileges",
          "Show the exact command; sandbox; least-privilege file and network access",
        ],
        [
          "Unauthenticated remote server",
          "An HTTP server left open lets anyone call its tools",
          "OAuth per the spec, or a token; never expose without auth",
        ],
      ],
    },
    { type: "h3", text: "Tool poisoning" },
    {
      type: "p",
      text: "In April 2025 Invariant Labs published the attack that put **MCP tool poisoning** on the map. A malicious server offered an innocent-looking `add` tool. Its description, which the model reads but most users never see in full, contained hidden instructions telling the model to read a local config file and an SSH private key, pass the contents through an extra `sidenote` parameter, and explain the maths to the user as if nothing else had happened. In their test the agent complied, and the confirmation dialog showed only a simplified view of the arguments. Nothing about the attack requires the tool to do anything harmful itself: the payload is the description.",
    },
    { type: "h3", text: "Rug pulls and shadowing" },
    {
      type: "p",
      text: "The same research described two variations. In a **rug pull**, a server you reviewed and approved later changes its tool definitions — MCP explicitly supports tool lists that change over time, signalled through a `list_changed` notification. Approval at install time therefore says nothing about what the tool says next week. In **tool shadowing**, a malicious server's description instructs the model about a different, trusted tool: in Invariant's example, every email sent through a legitimate `send_email` tool was redirected to the attacker, even though the malicious tool was never called. This is why connecting one bad server can compromise the behaviour of all the good ones in the same session.",
    },
    { type: "h3", text: "Indirect prompt injection through tool results" },
    {
      type: "p",
      text: "Even a perfectly honest server returns data written by other people. A GitHub server returns issue bodies; an email server returns inbound messages; a browser server returns web pages. Any of those can contain text addressed to the model. Simon Willison's [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) explains why MCP makes this worse: the protocol encourages users to mix and match tools from different sources, so one session easily ends up with access to private data, exposure to untrusted content and a way to send data out. I cover the general mechanics in [prompt injection](/blog/prompt-injection); the MCP-specific point is that every tool result is an injection channel.",
    },
    { type: "h3", text: "Token passthrough, confused deputy and scope creep" },
    {
      type: "p",
      text: "The MCP [security best practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) page documents several authorisation failures. **Token passthrough** is an anti-pattern where a server accepts a token from the client without checking it was issued for that server, then forwards it to a downstream API. It bypasses rate limits and audit controls and is explicitly forbidden: MCP servers must not accept any tokens that were not issued for them. The **confused deputy** case is narrower than the general term: an MCP proxy server that uses a static OAuth client ID with a third-party API, combined with dynamic client registration and a consent cookie, can let an attacker obtain an authorisation code without the user seeing a consent screen. The fix is per-client consent at the proxy, exact redirect URI matching and single-use `state` values. Finally, **scope minimisation**: a server that grants omnibus scopes up front turns one leaked token into access to everything.",
    },
    { type: "h3", text: "Malicious servers and local command execution" },
    {
      type: "p",
      text: "A local MCP server is a program you download and run with your own privileges. The spec's local server section lists the obvious attacks: a malicious startup command embedded in a client configuration, a malicious payload inside the server itself, and a server left listening on localhost that other processes can reach. Installing servers by copying a config snippet from a README is the agentic equivalent of `curl | sh`. Lookalike package names, abandoned repositories and unsigned binaries carry the same supply-chain risk here as anywhere else, which is why OWASP's agentic list includes agentic supply chain vulnerabilities as a category of its own.",
    },
    {
      type: "callout",
      title: "Remote servers need authentication",
      text: "Authorisation is optional in the MCP specification, which means it is easy to ship a remote server with none. If a server is reachable over HTTP and exposes anything more sensitive than public data, it needs the spec's OAuth flow or at minimum a token check. For local HTTP servers the spec recommends `stdio` instead, or restricting access with a token or a Unix domain socket.",
    },
    { type: "h2", text: "A hardening checklist for MCP deployments" },
    { type: "h3", text: "Before you connect a server" },
    {
      type: "ol",
      items: [
        "**Know who wrote it.** Prefer servers published by the vendor of the underlying system. Read the source of anything you run locally.",
        "**Pin the version and the definitions.** Install a fixed version, record a hash of every tool's name, description and schema, and refuse to proceed if the hash changes until a human re-reviews it.",
        "**Read the full tool descriptions.** Not the summary in a UI — the raw text the model will see. Look for instructions addressed to the model, references to other tools, and requests for files or credentials.",
        "**Decide which tools you actually need.** Most servers expose far more than one workflow requires. Disable the rest.",
      ],
    },
    { type: "h3", text: "Credentials and authorisation" },
    {
      type: "ul",
      items: [
        "**Use scoped, least-privilege tokens per server.** A read-only token for a reporting server; a write token only where a workflow writes. Never reuse one powerful personal token across servers.",
        "**Follow the spec's [authorization](https://modelcontextprotocol.io/specification/latest/basic/authorization) guidance for remote servers:** OAuth 2.1 with PKCE, resource indicators so tokens are bound to the specific server, and audience validation on every request.",
        "**Never pass client tokens through.** If the server calls a downstream API, it uses its own credential for that API, scoped to the user it is acting for.",
        "**Request minimal scopes first** and step up only when a privileged operation is actually attempted.",
        "**Keep secrets out of tool parameters and logs.** A model that can see a secret can be talked into repeating it.",
      ],
    },
    { type: "h3", text: "Runtime controls in the host" },
    {
      type: "ul",
      items: [
        "**Allow-list tools by server and name.** Anything not on the list is never offered to the model.",
        "**Sandbox local servers** in a container or OS sandbox with no access to your home directory, SSH keys or cloud credentials unless explicitly granted, and with network egress restricted to the hosts the server needs.",
        "**Require human approval for sensitive calls** — anything that writes, sends, deletes, pays or deploys — and show the full arguments, not a summary.",
        "**Validate tool results** against the tool's output schema before they reach the model, and cap their size.",
        "**Separate sessions by trust level.** Do not load a server that reads untrusted content into the same session as one that holds write access to sensitive systems unless you can gate every write.",
        "**Log everything:** server, tool, arguments, result hash, approving user and a trace ID. This is your only forensic record after an incident.",
      ],
    },
    { type: "h2", text: "Example: an allow-list and pinning wrapper for tool calls" },
    {
      type: "p",
      text: "The controls above are easiest to enforce in one place: a policy layer between the MCP client and the model. The sketch below is TypeScript, independent of any particular SDK. It pins each allowed tool's definition by hash, drops anything unknown or changed, and routes sensitive calls through an approval step.",
    },
    {
      type: "code",
      lang: "typescript",
      code: `import { createHash } from "node:crypto";

type ToolDef = { name: string; description: string; inputSchema: unknown };
type Policy = { sha256: string; sensitive: boolean };

// Reviewed and pinned by a human. Key is "server/tool".
const ALLOWED: Record<string, Policy> = {
  "github/search_issues": { sha256: "9f2c…", sensitive: false },
  "github/create_issue_comment": { sha256: "41ab…", sensitive: true },
};

const fingerprint = (t: ToolDef) =>
  createHash("sha256")
    .update(JSON.stringify([t.name, t.description, t.inputSchema]))
    .digest("hex");

// 1. Filter what the model is allowed to see.
export function exposeTools(server: string, tools: ToolDef[]): ToolDef[] {
  return tools.filter((t) => {
    const policy = ALLOWED[\`\${server}/\${t.name}\`];
    if (!policy) return false; // not allow-listed
    if (fingerprint(t) !== policy.sha256) {
      audit.warn("tool_definition_changed", { server, tool: t.name });
      return false; // possible rug pull: block until re-reviewed
    }
    return true;
  });
}

// 2. Gate every call the model makes.
export async function callTool(
  server: string,
  name: string,
  args: Record<string, unknown>,
  ctx: { userId: string; traceId: string },
) {
  const key = \`\${server}/\${name}\`;
  const policy = ALLOWED[key];
  if (!policy) throw new Error(\`Tool not allowed: \${key}\`);

  if (policy.sensitive) {
    // Show the full arguments to a human, not a summary.
    const ok = await approvals.request({ key, args, userId: ctx.userId });
    if (!ok) return { isError: true, content: [{ type: "text", text: "Denied by user." }] };
  }

  audit.info("tool_call", { key, args, ...ctx });
  const result = await clients[server].callTool({ name, arguments: args });
  audit.info("tool_result", { key, traceId: ctx.traceId, bytes: JSON.stringify(result).length });
  return result; // still untrusted data when it reaches the model
}`,
    },
    {
      type: "p",
      text: "Two details matter. The hash covers the description, not just the name, because the description is where poisoning lives. And the approval prompt shows full arguments, because the documented poisoning attack worked partly by hiding the exfiltrated data in a parameter the confirmation dialog did not display in full.",
    },
    { type: "h2", text: "Where MCP security fits in the wider picture" },
    {
      type: "p",
      text: "None of this replaces the fundamentals of [AI security](/blog/ai-security). MCP is a transport for tools; the hard problems are still that the model cannot distinguish instructions from data and that any tool it can call, an attacker can try to make it call. When I (Sheikh Mujtaba) build agents with tool access, the rule I start from is the one in my [AI agent security](/blog/ai-agent-security) guide: authorise at the tool layer with the end user's identity, and gate anything irreversible behind a human. MCP just makes it faster to forget that rule, because adding a server takes one line of config. If you are designing an agent architecture from scratch, [agentic AI development](/blog/agentic-ai-development) covers how these controls fit into the orchestration layer, and the [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications) maps them to a standard taxonomy.",
    },
    {
      type: "p",
      text: "If you want a second pair of eyes on an MCP deployment, I review server configurations and test agent tool chains for injection paths as part of my [services](/services).",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "MCP security starts with the host: it is the only place consent, allow-lists and logging can be enforced.",
        "Tool descriptions are prompt text written by the server author; tool poisoning hides instructions there.",
        "Approval at install time is not enough — pin tool definitions by hash and re-review on any change to catch rug pulls.",
        "Every tool result is an indirect prompt injection channel, even from an honest server.",
        "MCP servers must not accept or forward tokens that were not issued for them; use scoped, per-server credentials.",
        "Sandbox local servers, authenticate remote ones, and require human approval with full arguments for sensitive calls.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is MCP tool poisoning?",
      answer:
        "Tool poisoning is an attack where a malicious MCP server hides instructions in a tool's description. The model reads the full description to decide how to use the tool, so it may follow those hidden instructions — for example reading a private key and passing it in a parameter — while the user sees only a short summary. The defence is to review and hash-pin tool definitions, show full descriptions, and allow-list only the tools a workflow needs.",
    },
    {
      question: "What is an MCP rug pull?",
      answer:
        "A rug pull is when a server changes its tool definitions after you have approved it. MCP supports tool lists that change over time, so a server that looked safe at install can later add malicious instructions. Hashing each approved tool's name, description and schema, and blocking the tool until a human re-reviews any change, closes this gap.",
    },
    {
      question: "Is authentication required for MCP servers?",
      answer:
        "Authorisation is optional in the MCP specification, but any remote server exposing non-public data or write actions should use it. For HTTP transports the spec defines an OAuth 2.1 flow with resource indicators and requires servers to validate that tokens were issued for them. Local servers should prefer the stdio transport, or restrict HTTP access with a token or Unix domain socket.",
    },
    {
      question: "What is token passthrough in MCP and why is it forbidden?",
      answer:
        "Token passthrough is when an MCP server accepts a token from the client without checking it was issued for that server and forwards it to a downstream API. It bypasses the server's own controls, breaks audit trails and lets a stolen token be used through the server as a proxy. The specification states that MCP servers must not accept any tokens that were not explicitly issued for them.",
    },
    {
      question: "Are official or popular MCP servers safe to use?",
      answer:
        "They reduce supply-chain risk but not injection risk. An honest server still returns data written by other people — issues, emails, web pages — and that data can carry instructions to the model. Use vendor-published servers where possible, scope their credentials tightly, and keep human approval on any action that writes, sends or deletes.",
    },
  ],
};
