import type { RolePage } from "../../utils/role-types";

export const erpnextDeveloper: RolePage = {
  slug: "erpnext-developer",
  role: "ERPNext Developer & Consultant",
  title: "Sheikh Mujtaba | ERPNext Developer & Frappe Consultant",
  heading: "Sheikh Mujtaba — ERPNext Developer & Consultant",
  description:
    "Sheikh Mujtaba (Mujtaba Javed) is an ERPNext developer and Frappe consultant: upgrade-safe custom apps, workflow automation, AI integrations and security hardening for ERPNext deployments.",
  focusKeyword: "ERPNext developer",
  keywords: [
    "Sheikh Mujtaba ERPNext",
    "Mujtaba Javed ERPNext developer",
    "ERPNext developer",
    "ERPNext consultant",
    "Frappe developer",
    "ERPNext developer Pakistan",
    "ERPNext customization",
    "ERPNext automation",
    "hire ERPNext developer",
  ],
  tags: ["ERPNext", "Frappe", "Automation"],
  skills: [
    "Frappe custom apps and DocTypes",
    "ERPNext workflow automation",
    "REST API and webhook integrations",
    "AI agents connected to ERPNext",
    "Roles, permissions and security hardening",
    "Upgrade-safe customisation",
  ],
  summary:
    "I am Sheikh Mujtaba (Mujtaba Javed), an ERPNext developer who customises and automates Frappe deployments the upgrade-safe way, connects them to AI agents, and hardens them so business data stays protected.",
  blocks: [
    { type: "h2", text: "ERPNext done the maintainable way" },
    {
      type: "p",
      text: "ERPNext is flexible enough for a small team to own, and that flexibility is exactly why so many deployments become unmaintainable. As an **ERPNext developer** my rule is simple: every customisation lives in a versioned custom app in git, never only in the production database. That is what lets you upgrade without fear.",
    },
    { type: "h2", text: "What I build on Frappe" },
    {
      type: "ul",
      items: [
        "**Custom apps and DocTypes** designed around your process rather than forcing it into stock forms.",
        "**Workflow automation** with document hooks, scheduled jobs and approval workflows.",
        "**Integrations** with payment gateways, e-commerce, messaging and external APIs through webhooks and the REST API.",
        "**Reports and dashboards** that answer the questions management actually asks.",
      ],
    },
    { type: "h2", text: "AI on top of your ERP" },
    {
      type: "p",
      text: "This is where my [AI engineering](/ai-engineer) work and ERPNext meet. An agent connected to ERPNext can draft sales orders from emails, answer stock questions in chat, or triage support tickets — with human approval before anything is posted. My guide on [AI integration in business workflows](/blog/ai-integration-in-business-workflows) explains how to pick the right processes.",
    },
    { type: "h2", text: "Security hardening for ERPNext" },
    {
      type: "p",
      text: "An ERP holds your customers, prices and payroll. I audit and harden deployments using my [ERPNext security checklist](/blog/erpnext-security): least-privilege roles, user permissions, API key rotation, server and database configuration, backups and patching.",
    },
    {
      type: "callout",
      title: "Before you customise",
      text: "Check whether a setting, a custom field or a print format already solves the problem. The cheapest customisation is the one you never have to maintain.",
    },
    { type: "h2", text: "How an ERPNext engagement runs" },
    {
      type: "ol",
      items: [
        "Map the process and the data, and decide what stays standard.",
        "Build in a custom app on a staging site, with fixtures for configuration.",
        "Test with real users and real data volumes.",
        "Deploy, document and hand over — or stay on for support.",
      ],
    },
    {
      type: "p",
      text: "For the full architecture, read [ERPNext development that survives upgrades](/blog/erpnext-development).",
    },
  ],
  projects: [],
  guides: ["erpnext-development", "erpnext-security", "ai-integration-in-business-workflows"],
  faqs: [
    {
      question: "Does Sheikh Mujtaba work with ERPNext?",
      answer:
        "Yes. Sheikh Mujtaba (Mujtaba Javed) is an ERPNext developer and Frappe consultant who builds custom apps, automates workflows, integrates AI and hardens ERPNext security.",
    },
    {
      question: "What does an ERPNext developer do?",
      answer:
        "An ERPNext developer customises and extends the Frappe-based ERP: custom DocTypes and apps, workflows, integrations, reports and upgrade-safe changes.",
    },
    {
      question: "Will my customisations survive an ERPNext upgrade?",
      answer:
        "If they live in a versioned custom app and avoid editing core files, yes. That is how I build every change.",
    },
    {
      question: "Can you secure an existing ERPNext installation?",
      answer:
        "Yes. I audit roles, permissions, API keys and server configuration, then fix the gaps in priority order.",
    },
  ],
  updated: "2026-11-18",
};
