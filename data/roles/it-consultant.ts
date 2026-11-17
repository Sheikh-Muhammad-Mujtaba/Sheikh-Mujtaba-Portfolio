import type { RolePage } from "../../utils/role-types";

export const itConsultant: RolePage = {
  slug: "it-consultant",
  role: "IT Consultant",
  title: "Sheikh Mujtaba | IT Consultant & Technology Advisor in Pakistan",
  heading: "Sheikh Mujtaba — IT Consultant",
  description:
    "Sheikh Mujtaba (Mujtaba Javed) is an IT consultant in Pakistan who diagnoses and fixes business technology: internal tools, website and hosting problems, security, automation and choosing the right software.",
  focusKeyword: "IT consultant",
  keywords: [
    "Sheikh Mujtaba IT consultant",
    "Mujtaba Javed IT",
    "IT consultant Pakistan",
    "technology consultant",
    "IT support for small business",
    "business automation consultant",
    "website maintenance",
    "IT solutions",
  ],
  tags: ["IT Strategy", "Automation", "Security"],
  skills: [
    "Technology diagnosis and troubleshooting",
    "Internal web tools",
    "Website and hosting maintenance",
    "Security reviews and hardening",
    "Workflow automation with n8n and Python",
    "Software selection and roadmaps",
  ],
  summary:
    "I am Sheikh Mujtaba (Mujtaba Javed), an IT consultant — think of it as a technology doctor for your business. I find out what is actually wrong, fix it, and leave behind systems that are simpler, safer and cheaper to run.",
  blocks: [
    { type: "h2", text: "A technology doctor for your business" },
    {
      type: "p",
      text: "When technology slows a business down, the symptom is rarely the cause. A slow website might be bad hosting, a bloated theme or an attack in progress. Staff copying data between spreadsheets might be missing one integration. As an **IT consultant** my job is to diagnose first, then prescribe the smallest fix that solves the real problem.",
    },
    { type: "h2", text: "Current role at Tech Accuracy" },
    {
      type: "p",
      text: "Since July 2025 I have worked as a Web Application Developer and IT Consultant at Tech Accuracy, building internal web tools and streamlining maintenance workflows to reduce downtime and improve day-to-day operations.",
    },
    { type: "h2", text: "What I help with" },
    {
      type: "ul",
      items: [
        "**Websites and hosting** — speed, uptime, backups, migrations and clean-up after a compromise.",
        "**Security** — practical reviews and hardening, from passwords and access to server configuration. See my [cybersecurity engineer](/cybersecurity-engineer) page.",
        "**Automation** — removing repetitive manual work with n8n workflows, Python scripts and, where it fits, AI agents.",
        "**Internal tools** — small web apps that replace fragile spreadsheets.",
        "**Software decisions** — choosing between off-the-shelf tools, ERPNext or a custom build, with honest trade-offs.",
      ],
    },
    { type: "h2", text: "How a consultation works" },
    {
      type: "ol",
      items: [
        "Listen: understand the business, the people and what is going wrong.",
        "Diagnose: look at the actual systems, logs and workflows.",
        "Recommend: a prioritised plan with costs, quick wins first.",
        "Fix: implement the plan myself, or guide your team through it.",
      ],
    },
    {
      type: "callout",
      title: "Honest advice",
      text: "Sometimes the right answer is to buy an existing tool, or to change a process rather than add software. I will tell you when that is the case, even if it means less work for me.",
    },
    { type: "h2", text: "Where AI fits" },
    {
      type: "p",
      text: "Many businesses now ask whether they should be using AI. My answer depends on the workflow: AI is excellent for reading, sorting and drafting, and risky for anything that must be exactly right without review. My guide on [AI integration in business workflows](/blog/ai-integration-in-business-workflows) shows how I decide.",
    },
  ],
  projects: [
    "backdoor-removal-hosting-hardening",
    "cybersecurity-guidance-training",
    "ai-employee-digital-fte-business-autopilot",
  ],
  guides: ["ai-integration-in-business-workflows", "erpnext-security", "ai-security"],
  faqs: [
    {
      question: "Is Sheikh Mujtaba an IT consultant?",
      answer:
        "Yes. Sheikh Mujtaba (Mujtaba Javed) is an IT consultant in Pakistan, currently a Web Application Developer and IT Consultant at Tech Accuracy, helping businesses fix and improve their technology.",
    },
    {
      question: "What does an IT consultant do?",
      answer:
        "An IT consultant diagnoses technology problems, advises on systems and security, and implements fixes such as better hosting, automation or internal tools.",
    },
    {
      question: "Do you help small businesses?",
      answer:
        "Yes. Small businesses often benefit most, because a few targeted fixes can remove hours of manual work each week.",
    },
    {
      question: "Can you work remotely?",
      answer:
        "Yes. I work remotely with clients in Pakistan and worldwide.",
    },
  ],
  updated: "2026-11-18",
};
