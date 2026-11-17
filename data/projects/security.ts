import type { ProjectDetail } from "../../utils/project-detail-types";

/*
 * Security projects have no public repositories (client systems and research
 * targets stay private). Each page states what the project covered, then
 * explains the technique in general terms — no client names, targets or
 * invented findings.
 */
export const securityProjects: ProjectDetail[] = [
  {
    slug: "gray-swan-ethical-red-teaming",
    focusKeyword: "ethical AI red teaming",
    summary:
      "Gray Swan ethical red teaming is Sheikh Mujtaba's work in Gray Swan's AI red teaming arenas: authorised attempts to make AI models and agents break their own safety rules, so the weaknesses get fixed before attackers find them.",
    stack: ["AI red teaming", "Prompt injection", "Jailbreak testing", "Agent security testing"],
    blocks: [
      { type: "h2", text: "What AI red teaming is" },
      {
        type: "p",
        text: "AI red teaming means attacking an AI system the way an adversary would, with permission, to find where its safeguards fail. For language models and agents that includes jailbreaks that bypass content rules, prompt injection that hijacks instructions, and tricks that make an agent misuse its tools or leak data.",
      },
      { type: "h2", text: "The Gray Swan arenas" },
      {
        type: "p",
        text: "Gray Swan runs ethical red teaming competitions where participants probe models and agents against defined goals — for example, getting an agent to take an action it should refuse. These engagements simulate advanced threats in a controlled setting, and the results help model builders strengthen their defences.",
      },
      { type: "h2", text: "Techniques involved" },
      {
        type: "ul",
        items: [
          "**Direct prompt injection** — instructions that try to override the system prompt.",
          "**Indirect injection** — malicious instructions hidden in content the model reads, such as documents or web pages.",
          "**Role-play and framing attacks** that wrap a forbidden request in a harmless-looking scenario.",
          "**Tool misuse** — steering an agent to call tools with harmful arguments.",
          "**Multi-turn escalation** — building up to a violation over several messages.",
        ],
      },
      { type: "h2", text: "Turning findings into defences" },
      {
        type: "p",
        text: "Breaking a model is only half the job. The value for a client is knowing which defences would have stopped each attack: input and output filtering, least-privilege tools, isolation of untrusted content and human approval for risky actions. My [AI red teaming methodology](/blog/ai-red-teaming) and [prompt injection guide](/blog/prompt-injection) explain the full process.",
      },
    ],
    role: "ethical-hacker",
    guides: ["ai-red-teaming", "prompt-injection", "owasp-top-10-for-llm-applications"],
    faqs: [
      {
        question: "What is Gray Swan?",
        answer: "An AI security organisation that runs ethical red teaming arenas for testing AI models and agents.",
      },
      {
        question: "Is AI red teaming legal?",
        answer: "Yes, when it is authorised — inside sanctioned arenas or against systems the owner has asked you to test.",
      },
      {
        question: "Can you red team my AI chatbot or agent?",
        answer: "Yes. I test for prompt injection, jailbreaks, data leakage and tool misuse, and report each finding with a fix.",
      },
    ],
  },
  {
    slug: "ctf-challenges",
    focusKeyword: "CTF challenges",
    summary:
      "These CTF challenges are Sheikh Mujtaba's Capture The Flag solutions and write-ups: timed hacking puzzles across web exploitation, cryptography, forensics and more, used to keep offensive security skills sharp.",
    stack: ["Web exploitation", "Cryptography", "Forensics", "Linux", "Python", "Burp Suite"],
    blocks: [
      { type: "h2", text: "What a CTF is" },
      {
        type: "p",
        text: "Capture The Flag competitions are legal hacking challenges. Each puzzle hides a “flag” — a secret string — behind a vulnerability or a riddle. Solving it means finding and exploiting the weakness, then submitting the flag for points. Platforms such as TryHackMe and competition events provide the targets.",
      },
      { type: "h2", text: "Common categories" },
      {
        type: "table",
        head: ["Category", "What it tests"],
        rows: [
          ["Web", "Injection, broken access control, authentication flaws"],
          ["Crypto", "Weak or misused encryption and encoding"],
          ["Forensics", "Recovering evidence from files, memory or network captures"],
          ["Reverse engineering", "Understanding compiled programs without source"],
          ["Privilege escalation", "Moving from a low-privilege user to root"],
        ],
      },
      { type: "h2", text: "Why write-ups matter" },
      {
        type: "p",
        text: "A solved challenge teaches once; a write-up teaches twice. Documenting the reasoning — what was tried, what failed, what finally worked — turns a puzzle into a repeatable technique and shows how a problem was approached, not just that it was solved.",
      },
      { type: "h2", text: "From CTF to client work" },
      {
        type: "p",
        text: "CTFs sharpen the same instincts used in real assessments: noticing the odd parameter, chaining small weaknesses into a serious one and working methodically under time pressure. I also build small Python tools for scanning and enumeration as part of this practice. See my [ethical hacker](/ethical-hacker) page for how that translates into engagements.",
      },
    ],
    role: "ethical-hacker",
    guides: ["ai-red-teaming", "how-to-become-an-ai-security-engineer"],
    faqs: [
      {
        question: "What does CTF stand for?",
        answer: "Capture The Flag — legal security challenges where you exploit a weakness to find a hidden flag.",
      },
      {
        question: "Are CTFs useful for real security work?",
        answer: "Yes. They train the methodical, creative thinking used in penetration tests and red team engagements.",
      },
    ],
  },
  {
    slug: "cybersecurity-lab-setup",
    focusKeyword: "cybersecurity home lab",
    summary:
      "This cybersecurity home lab is Sheikh Mujtaba's documented environment for safe security testing and research: isolated virtual machines, attacker and target systems, and the tooling to practise techniques without touching real networks.",
    stack: ["Virtualisation", "Kali Linux", "Vulnerable target VMs", "Isolated networking", "Packet capture"],
    blocks: [
      { type: "h2", text: "Why a lab comes first" },
      {
        type: "p",
        text: "Testing techniques on systems you do not own is illegal, and testing on production is reckless. A lab gives you deliberately vulnerable machines to attack and defend, safely, as often as you like. Every new tool or technique is tried here before it goes near a client engagement.",
      },
      { type: "h2", text: "Typical building blocks" },
      {
        type: "ul",
        items: [
          "**A hypervisor** to run several virtual machines on one computer.",
          "**An attacker machine** such as Kali Linux with standard testing tools.",
          "**Vulnerable targets** — intentionally weak web apps and operating systems.",
          "**An isolated network** so nothing escapes to the home or office LAN.",
          "**Monitoring** — packet capture and logs to see attacks from the defender's side.",
        ],
      },
      { type: "h2", text: "Isolation is non-negotiable" },
      {
        type: "p",
        text: "Vulnerable machines and malware samples must never reach the real network. Host-only or internal virtual networks, snapshots to roll back after each exercise, and no shared folders with the host are the minimum precautions.",
      },
      { type: "h2", text: "Documentation" },
      {
        type: "p",
        text: "Documenting the setup — network layout, machine roles, snapshots and reset steps — makes the lab reproducible, and makes it useful as a teaching resource for others starting out. If you are on that path, my guide on [how to become an AI security engineer](/blog/how-to-become-an-ai-security-engineer) covers what to practise.",
      },
    ],
    role: "ethical-hacker",
    guides: ["how-to-become-an-ai-security-engineer", "ai-red-teaming"],
    faqs: [
      {
        question: "Why build a cybersecurity lab?",
        answer: "To practise attacks and defences legally and safely on machines you own, isolated from real networks.",
      },
      {
        question: "What do I need to start a home lab?",
        answer: "A computer with enough memory for virtual machines, a hypervisor, an attacker VM and a few intentionally vulnerable targets.",
      },
    ],
  },
  {
    slug: "cybersecurity-guidance-training",
    focusKeyword: "cybersecurity awareness training",
    summary:
      "Cybersecurity guidance and training is Sheikh Mujtaba's work preparing practical security resources and best-practice guides so teams can recognise threats and handle data safely.",
    stack: ["Security awareness", "Phishing defence", "Password management", "MFA", "Data handling"],
    blocks: [
      { type: "h2", text: "People are part of the attack surface" },
      {
        type: "p",
        text: "Most breaches involve a human step: a phishing email clicked, a password reused, a file shared with the wrong person. Technical controls reduce the risk, but they cannot stop every mistake. Training gives people the habits to notice and stop attacks themselves.",
      },
      { type: "h2", text: "What good training covers" },
      {
        type: "ul",
        items: [
          "**Phishing** — spotting suspicious senders, links and urgent requests.",
          "**Passwords** — unique passwords for every account, kept in a password manager.",
          "**Multi-factor authentication** — turning it on everywhere it is offered.",
          "**Data handling** — what is sensitive, where it may be stored and who can see it.",
          "**Reporting** — making it easy and blame-free to report a mistake quickly.",
        ],
      },
      { type: "h2", text: "Practical, not theoretical" },
      {
        type: "p",
        text: "Guidance works when it fits people's real day. Short, specific rules (“never approve an MFA prompt you did not start”) beat long policy documents nobody reads. Examples drawn from the tools the team actually uses make the lessons stick.",
      },
      { type: "h2", text: "Part of a wider security programme" },
      {
        type: "p",
        text: "Training is most effective alongside hardening and monitoring. As an [IT consultant](/it-consultant) I combine both: fix the systems, then teach the people using them. New risks such as AI tools are covered too — see [AI security for LLM applications](/blog/ai-security).",
      },
    ],
    role: "cybersecurity-engineer",
    guides: ["ai-security", "erpnext-security"],
    faqs: [
      {
        question: "Why is security awareness training important?",
        answer: "Because many attacks rely on a human step, such as clicking a phishing link or reusing a password.",
      },
      {
        question: "What should training cover first?",
        answer: "Phishing, password managers, multi-factor authentication and how to report mistakes.",
      },
    ],
  },
  {
    slug: "backdoor-removal-hosting-hardening",
    focusKeyword: "website backdoor removal",
    summary:
      "Backdoor removal and hosting hardening is Sheikh Mujtaba's incident work on compromised websites: finding and removing backdoors, tracing how attackers got in, and hardening the hosting so they cannot return.",
    stack: ["Incident response", "Web shells", "Linux", "PHP", "File integrity", "Server hardening"],
    blocks: [
      { type: "h2", text: "What a backdoor is" },
      {
        type: "p",
        text: "A backdoor is code an attacker leaves behind so they can come back — often a small PHP web shell hidden among legitimate files, a rogue admin account or a modified plugin. Deleting the obvious infected file rarely ends the compromise, because attackers plant several ways back in.",
      },
      { type: "h2", text: "The clean-up process" },
      {
        type: "ol",
        items: [
          "**Contain** — take a backup snapshot for evidence, change all credentials and cut off active access.",
          "**Investigate** — find the entry point and every persistence mechanism: web shells, cron jobs, rogue users, modified core files.",
          "**Clean** — remove malicious code and restore files from known-good sources.",
          "**Harden** — patch, fix permissions and close the hole that let the attacker in.",
          "**Monitor** — watch for signs of a return.",
        ],
      },
      { type: "h2", text: "Hardening the hosting" },
      {
        type: "ul",
        items: [
          "Update the CMS, themes and plugins; remove anything unused.",
          "Set file permissions so the web server cannot write where it does not need to.",
          "Disable PHP execution in upload directories.",
          "Restrict admin panels and use strong, unique credentials with MFA.",
          "Keep off-site backups and file integrity monitoring.",
        ],
      },
      { type: "h2", text: "Why the entry point matters" },
      {
        type: "p",
        text: "If the vulnerability that let the attacker in stays open, the site will be reinfected within days. Finding and closing it is the difference between a clean-up and a cure. My [cybersecurity engineer](/cybersecurity-engineer) page covers this incident work in more depth.",
      },
    ],
    role: "cybersecurity-engineer",
    guides: ["erpnext-security", "ai-security"],
    faqs: [
      {
        question: "How do I know if my website has a backdoor?",
        answer:
          "Warning signs include unknown admin users, unfamiliar PHP files, redirects you did not add, spam pages and unexpected outbound traffic. A proper scan and file review confirms it.",
      },
      {
        question: "Is deleting the infected file enough?",
        answer: "Usually not. Attackers plant several ways back in, and the original vulnerability must be closed too.",
      },
    ],
  },
  {
    slug: "obfuscated-php-malware-analysis",
    focusKeyword: "PHP malware analysis",
    summary:
      "This PHP malware analysis project is Sheikh Mujtaba's in-depth deobfuscation of obfuscated PHP malware, peeling back its layers to recover the real payload and understand how it attacks a server.",
    stack: ["PHP", "Static analysis", "Deobfuscation", "Base64 / gzip decoding", "Indicators of compromise"],
    blocks: [
      { type: "h2", text: "Why attackers obfuscate PHP" },
      {
        type: "p",
        text: "Malicious PHP is usually disguised so that site owners, scanners and hosting providers miss it. Obfuscation turns a readable backdoor into a wall of encoded text that looks like noise, while still running perfectly when the server executes it.",
      },
      { type: "h2", text: "Common obfuscation layers" },
      {
        type: "ul",
        items: [
          "**Encoding chains** — `base64_decode`, `gzinflate`, `str_rot13` and `strrev` nested inside each other.",
          "**Dynamic execution** — strings assembled at runtime and passed to `eval`, `assert` or `preg_replace` with an execute flag.",
          "**Variable functions** — function names built from fragments so `eval` never appears literally.",
          "**Junk code** — meaningless variables and comments to confuse readers.",
        ],
      },
      { type: "h2", text: "How deobfuscation works" },
      {
        type: "ol",
        items: [
          "Work on a copy in an isolated environment — never execute the sample on a live server.",
          "Replace dangerous execution calls with output, so each layer prints instead of runs.",
          "Decode layer by layer until readable PHP appears.",
          "Read the final payload to learn what it does: file upload, command execution, spam or redirection.",
          "Extract indicators of compromise — file names, domains, function patterns — to search other systems.",
        ],
      },
      { type: "h2", text: "What the analysis gives you" },
      {
        type: "p",
        text: "Understanding the payload reveals the attack vector and what the attacker could do, which decides how thorough a clean-up must be. The indicators found feed directly into the [backdoor removal and hosting hardening](/projects/backdoor-removal-hosting-hardening) work.",
      },
    ],
    role: "ethical-hacker",
    guides: ["ai-red-teaming", "erpnext-security"],
    faqs: [
      {
        question: "What is obfuscated PHP malware?",
        answer: "Malicious PHP disguised with encoding and dynamic execution so that scanners and people miss it.",
      },
      {
        question: "Is it safe to run a malware sample to see what it does?",
        answer: "Only in an isolated lab. Static deobfuscation, replacing execution with output, is the safer first step.",
      },
    ],
  },
  {
    slug: "firestartercloud-dns-payload-investigation",
    focusKeyword: "DNS payload investigation",
    summary:
      "This DNS payload investigation is Sheikh Mujtaba's research into DNS anomalies and the payload delivery mechanisms associated with Firestartercloud, tracing how malicious infrastructure delivers code to victims.",
    stack: ["DNS analysis", "Threat intelligence", "WHOIS", "Network forensics", "Payload analysis"],
    blocks: [
      { type: "h2", text: "Why DNS matters in attacks" },
      {
        type: "p",
        text: "Almost every attack needs a domain: to host a payload, receive stolen data or relay commands. DNS records are therefore one of the best places to spot malicious infrastructure, and one of the most useful trails to follow once something suspicious appears.",
      },
      { type: "h2", text: "What a DNS investigation looks at" },
      {
        type: "ul",
        items: [
          "**Resolution history** — which IP addresses a domain has pointed to, and when.",
          "**Fast-changing records** — short TTLs and rotating IPs typical of malicious hosting.",
          "**Registration data** — WHOIS details, registration dates and registrars.",
          "**Related domains** — infrastructure that shares IPs, name servers or patterns.",
          "**Delivered content** — what the domain serves, retrieved safely from an isolated system.",
        ],
      },
      { type: "h2", text: "Tracing payload delivery" },
      {
        type: "p",
        text: "Payload delivery chains often bounce through several domains and redirects before the final file is served, sometimes only to visitors that match a target profile. Mapping that chain shows where to block, which indicators to hunt for, and how the operation is structured.",
      },
      { type: "h2", text: "From research to defence" },
      {
        type: "p",
        text: "The output of an investigation like this is practical: domains and IPs to block, patterns to alert on, and an understanding of the technique that helps recognise the next variant. It complements the [PHP malware analysis](/projects/obfuscated-php-malware-analysis) work on the server side.",
      },
    ],
    role: "cybersecurity-engineer",
    guides: ["ai-security"],
    faqs: [
      {
        question: "What is a DNS payload investigation?",
        answer: "Research that follows domain records and infrastructure to understand how malicious code is delivered.",
      },
      {
        question: "What does the investigation produce?",
        answer: "Indicators to block and monitor, and an understanding of the delivery technique.",
      },
    ],
  },
  {
    slug: "sidebar-fuzzing-waf-bypass-research",
    focusKeyword: "WAF bypass research",
    summary:
      "This WAF bypass research is Sheikh Mujtaba's study of fuzzing techniques for getting payloads past Web Application Firewalls, to show where filter-based protection falls short and how to defend properly.",
    stack: ["Fuzzing", "Web Application Firewalls", "Burp Suite", "Payload encoding", "HTTP"],
    blocks: [
      { type: "h2", text: "What a WAF does — and does not do" },
      {
        type: "p",
        text: "A Web Application Firewall inspects HTTP requests and blocks those that match attack patterns, such as SQL injection or cross-site scripting. It is a useful layer, but it filters symptoms: the vulnerable code behind it is still there. If an attacker finds a request the WAF does not recognise, the vulnerability is exposed again.",
      },
      { type: "h2", text: "Fuzzing for gaps" },
      {
        type: "p",
        text: "Fuzzing sends large numbers of systematically varied inputs and watches how the target responds. Against a WAF, the variations test which encodings, casings and request shapes slip through while still being interpreted as the attack by the application behind it.",
      },
      {
        type: "ul",
        items: [
          "**Encoding variations** — URL, double URL, Unicode and HTML entity encoding.",
          "**Case and whitespace tricks** — mixed case, comments and unusual whitespace inside keywords.",
          "**Parameter handling** — duplicated parameters and differences in how the WAF and the app parse them.",
          "**Content types** — sending the same payload as JSON, multipart or XML.",
        ],
      },
      { type: "h2", text: "The defensive lesson" },
      {
        type: "p",
        text: "The conclusion of WAF bypass research is always the same: fix the vulnerability, and treat the WAF as an extra layer. Parameterised queries, output encoding and server-side validation remove the weakness the WAF was hiding. This research was done in authorised, controlled environments.",
      },
      {
        type: "p",
        text: "The same “filters are not enough” lesson applies to AI systems, where prompt filters can be bypassed — see [LLM guardrails that actually hold](/blog/llm-guardrails).",
      },
    ],
    role: "ethical-hacker",
    guides: ["llm-guardrails", "prompt-injection"],
    faqs: [
      {
        question: "Can a WAF be bypassed?",
        answer: "Often, yes. Fuzzing can find encodings or request shapes the WAF does not recognise, which is why the underlying vulnerability must be fixed.",
      },
      {
        question: "Should I still use a WAF?",
        answer: "Yes, as one layer of defence, alongside fixing vulnerabilities in the code.",
      },
    ],
  },
];
