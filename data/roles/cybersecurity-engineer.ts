import type { RolePage } from "../../utils/role-types";

export const cybersecurityEngineer: RolePage = {
  slug: "cybersecurity-engineer",
  role: "Cybersecurity Engineer",
  title: "Sheikh Mujtaba | AI & Cybersecurity Engineer in Pakistan",
  heading: "Sheikh Mujtaba — AI & Cybersecurity Engineer",
  description:
    "Sheikh Mujtaba (Mujtaba Javed) is an AI and cybersecurity engineer in Pakistan who hardens web apps, servers and AI systems: secure-by-design architecture, backdoor removal, hosting hardening and LLM guardrails.",
  focusKeyword: "cybersecurity engineer",
  keywords: [
    "Sheikh Mujtaba cybersecurity engineer",
    "Mujtaba Javed cyber security",
    "AI and cyber security engineer in Pakistan",
    "cyber security engineer Pakistan",
    "cybersecurity expert Pakistan",
    "website malware removal",
    "server hardening",
    "secure-by-design",
    "LLM guardrails",
  ],
  tags: ["AI Security", "Hardening", "Incident Cleanup"],
  skills: [
    "Secure-by-design architecture",
    "Backdoor and malware removal",
    "Hosting and server hardening",
    "LLM guardrails and AI security controls",
    "Security headers and HTTPS configuration",
    "Security guidance and team training",
  ],
  summary:
    "I am Sheikh Mujtaba (Mujtaba Javed), a cybersecurity engineer focused on the defensive side: designing systems that are hard to break, cleaning up the ones that already were, and putting guardrails around AI before it reaches production.",
  blocks: [
    { type: "h2", text: "Defence, not just detection" },
    {
      type: "p",
      text: "Where my [ethical hacking](/ethical-hacker) work finds holes, my **cybersecurity engineering** work closes them and keeps them closed. That means architecture decisions, configuration, and the boring controls — least privilege, patching, logging, backups — that stop most real attacks long before anything clever is needed.",
    },
    { type: "h2", text: "Incident cleanup: backdoors and compromised hosting" },
    {
      type: "p",
      text: "A large share of real-world compromises are small business websites with a backdoor nobody noticed. I have removed backdoors and web shells from compromised hosting, traced how the attacker got in, and hardened the environment so the same door does not reopen — file permissions, outdated plugins, exposed admin panels and credential hygiene.",
    },
    {
      type: "ol",
      items: [
        "Contain: take a snapshot, rotate credentials and cut the attacker's access.",
        "Investigate: find the entry point and every persistence mechanism, not just the obvious file.",
        "Clean: remove malicious code and restore from known-good sources.",
        "Harden: patch, lock down permissions and add monitoring so a repeat gets caught early.",
      ],
    },
    { type: "h2", text: "Securing AI systems" },
    {
      type: "p",
      text: "Combining AI and cybersecurity is the centre of my work. LLM apps and agents need controls traditional security never had to think about: input and output filtering, tool permissions, human approval for risky actions, and isolation of untrusted retrieved content. I write about these in depth in my guides on [LLM guardrails](/blog/llm-guardrails), [AI agent security](/blog/ai-agent-security) and [RAG security](/blog/rag-security).",
    },
    { type: "h2", text: "Secure-by-design for web applications" },
    {
      type: "p",
      text: "Because I also build applications, I can fix security at the design stage rather than bolting it on. In practice that is server-side authorisation on every request, secrets kept out of client bundles, strict security headers and a Content Security Policy, parameterised queries, and dependency auditing in the build pipeline. This very site ships with HSTS, a CSP and a locked-down permissions policy.",
    },
    { type: "h2", text: "ERP and business systems" },
    {
      type: "p",
      text: "Business systems hold the data attackers want most. My [ERPNext security hardening checklist](/blog/erpnext-security) covers roles and permissions, API key hygiene and server configuration for Frappe deployments — the same thinking applies to any ERP or CRM.",
    },
    {
      type: "callout",
      title: "Security guidance for teams",
      text: "I also prepare practical security guidance and training material, so the people using a system understand phishing, password managers and safe handling of data — technology alone never closes every gap.",
    },
  ],
  projects: [
    "backdoor-removal-hosting-hardening",
    "firestartercloud-dns-payload-investigation",
    "cybersecurity-guidance-training",
    "cybersecurity-lab-setup",
  ],
  guides: ["llm-guardrails", "ai-agent-security", "erpnext-security", "rag-security"],
  faqs: [
    {
      question: "Who is Sheikh Mujtaba in cybersecurity?",
      answer:
        "Sheikh Mujtaba (Mujtaba Javed) is an AI and cybersecurity engineer from Pakistan who secures web applications, hosting environments and AI systems, from secure-by-design architecture to incident cleanup.",
    },
    {
      question: "Can you clean a hacked website?",
      answer:
        "Yes. I remove backdoors and malicious code, find how the attacker got in, rotate credentials and harden the hosting so the compromise does not repeat.",
    },
    {
      question: "What does an AI and cybersecurity engineer do?",
      answer:
        "They apply classic security engineering to AI systems: guarding LLM inputs and outputs, limiting what agents and tools can do, protecting retrieval pipelines, and testing for prompt injection and data leakage.",
    },
    {
      question: "Do you work with clients outside Pakistan?",
      answer:
        "Yes. I am based in Pakistan and work remotely with clients worldwide.",
    },
  ],
  updated: "2026-11-18",
};
