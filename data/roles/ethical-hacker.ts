import type { RolePage } from "../../utils/role-types";

export const ethicalHacker: RolePage = {
  slug: "ethical-hacker",
  role: "Ethical Hacker & Penetration Tester",
  title: "Sheikh Mujtaba | Ethical Hacker & Penetration Tester in Pakistan",
  heading: "Sheikh Mujtaba — Ethical Hacker & Penetration Tester",
  description:
    "Sheikh Mujtaba (Mujtaba Javed) is an ethical hacker and penetration tester from Pakistan: web application pentesting, AI red teaming, CTFs, malware analysis and WAF bypass research, reported with fixes.",
  focusKeyword: "ethical hacker",
  keywords: [
    "Sheikh Mujtaba ethical hacker",
    "Mujtaba Javed ethical hacker",
    "ethical hacker in Pakistan",
    "penetration tester Pakistan",
    "web application penetration testing",
    "white hat hacker",
    "security researcher",
    "CTF player",
    "AI red teaming",
  ],
  tags: ["Pentesting", "AI Red Teaming", "CTF"],
  skills: [
    "Web application penetration testing",
    "AI red teaming and prompt injection testing",
    "Fuzzing and WAF bypass research",
    "PHP malware deobfuscation",
    "Capture The Flag (CTF) challenges",
    "Vulnerability reporting with remediation",
  ],
  summary:
    "I am Sheikh Mujtaba, also known as Mujtaba Javed — an ethical hacker who breaks web applications and AI systems with permission, then shows the owner exactly how to fix what I found. My offensive work spans web app pentesting, AI red teaming, malware analysis and WAF bypass research.",
  blocks: [
    { type: "h2", text: "What ethical hacking means in my work" },
    {
      type: "p",
      text: "An **ethical hacker** uses the same techniques as an attacker, under written authorisation and a defined scope, so the weaknesses get found by someone who reports them instead of someone who sells them. The value is not the exploit — it is the report: what is exposed, how bad it is, and the smallest change that closes it.",
    },
    {
      type: "p",
      text: "I came to security from the engineering side. I build web apps and AI agents for a living, which means I know where developers cut corners under deadline pressure — and that is usually where the vulnerabilities are.",
    },
    { type: "h2", text: "Web application penetration testing" },
    {
      type: "p",
      text: "Most of my offensive work targets web applications built on stacks I also develop with: Next.js, FastAPI, Laravel, WordPress and Frappe/ERPNext. A typical engagement walks the OWASP categories against the real business logic rather than running a scanner and forwarding its output.",
    },
    {
      type: "ul",
      items: [
        "**Access control** — horizontal and vertical privilege escalation, IDOR and broken object-level authorisation.",
        "**Injection** — SQL, command and template injection, plus server-side request forgery.",
        "**Authentication and sessions** — token handling, password reset flows and session fixation.",
        "**Business logic** — the flaws no scanner finds, like skipping a payment step or replaying an approval.",
      ],
    },
    { type: "h2", text: "AI red teaming: hacking LLM applications" },
    {
      type: "p",
      text: "Large language model apps add a new attack surface: the prompt. I take part in **Gray Swan** ethical red teaming arenas, where the goal is to make frontier models and agents break their own rules, and I apply the same playbook to client chatbots and agents — direct and indirect prompt injection, data exfiltration through tools, and excessive agency. My [AI red teaming methodology](/blog/ai-red-teaming) and [prompt injection guide](/blog/prompt-injection) document the process.",
    },
    { type: "h2", text: "Research: fuzzing, WAF bypass and malware" },
    {
      type: "p",
      text: "Some of my work is closer to research than testing. I have studied fuzzing techniques for getting payloads past Web Application Firewalls, deobfuscated layered PHP malware to recover the real payload and its command channel, and investigated DNS anomalies tied to payload delivery. Understanding how real malware hides is what makes the defensive recommendations credible.",
    },
    {
      type: "callout",
      title: "Scope comes first",
      text: "I only test systems I am authorised to test, under a written scope. If you are not the owner of a system, I cannot help you get into it.",
    },
    { type: "h2", text: "CTFs and a home lab" },
    {
      type: "p",
      text: "Capture The Flag challenges keep the fundamentals sharp — web exploitation, cryptography, forensics and reverse engineering under time pressure. I also maintain a documented cybersecurity lab with deliberately vulnerable targets, which is where new techniques get tried before they go anywhere near a client system.",
    },
    { type: "h2", text: "What you get from an engagement" },
    {
      type: "ol",
      items: [
        "A written scope and rules of engagement before any testing starts.",
        "Manual testing of the agreed targets, with evidence for every finding.",
        "A report ranked by real-world impact, each finding paired with a concrete fix.",
        "A retest of the fixes, so you know they actually hold.",
      ],
    },
  ],
  projects: [
    "gray-swan-ethical-red-teaming",
    "ctf-challenges",
    "sidebar-fuzzing-waf-bypass-research",
    "obfuscated-php-malware-analysis",
    "cybersecurity-lab-setup",
  ],
  guides: ["ai-red-teaming", "prompt-injection", "owasp-top-10-for-llm-applications"],
  faqs: [
    {
      question: "Is Sheikh Mujtaba an ethical hacker?",
      answer:
        "Yes. Sheikh Mujtaba (Mujtaba Javed) is an ethical hacker and penetration tester from Pakistan who tests web applications and AI systems with the owner's written permission and reports each finding with a fix.",
    },
    {
      question: "What is the difference between an ethical hacker and a hacker?",
      answer:
        "Authorisation and intent. An ethical hacker tests only systems they have permission to test, within an agreed scope, and reports what they find to the owner so it can be fixed.",
    },
    {
      question: "Do you test AI chatbots and agents as well as websites?",
      answer:
        "Yes. AI red teaming is a core part of my work: prompt injection, jailbreaks, data leakage through tools and excessive agency in LLM agents, alongside classic web application testing.",
    },
    {
      question: "Can you help me recover a hacked account or get into someone's system?",
      answer:
        "No. I only work on systems the client owns or is authorised to test. For a compromised site you own, I can help with cleanup and hardening.",
    },
  ],
  updated: "2026-11-18",
};
