/**
 * Clients and partners Sheikh Mujtaba has worked with.
 *
 * Content rules: the "about" text restates what each organisation says about
 * itself on its own site; the services are the ones Sheikh confirmed. Do not
 * add metrics, features or outcomes here unless the client has agreed to them
 * being published — these are real companies.
 */

export type ServiceKey = "web" | "erp" | "ai" | "security" | "it";

export const serviceLabels: Record<ServiceKey, string> = {
  web: "Web development",
  erp: "ERP development",
  ai: "AI integration & automation",
  security: "Securing infrastructure",
  it: "IT support & training",
};

/** What each service covers, linked to the role page that explains it. */
export const serviceDetails: Record<ServiceKey, { text: string; href: string }> = {
  web: {
    text: "Websites and web applications on modern frameworks, built for speed, technical SEO and security from the first commit.",
    href: "/full-stack-developer",
  },
  erp: {
    text: "ERPNext and Frappe development: custom apps, workflows and integrations, kept upgrade-safe in versioned code.",
    href: "/erpnext-developer",
  },
  ai: {
    text: "AI agents and workflow automation connected to the systems the business already runs, with human approval on risky steps.",
    href: "/ai-engineer",
  },
  security: {
    text: "Server and hosting hardening, access control and security configuration, so the systems above stay trustworthy.",
    href: "/cybersecurity-engineer",
  },
  it: {
    text: "Day-to-day technology support and hands-on training, so teams can run and use their systems confidently.",
    href: "/it-consultant",
  },
};

export type ClientCaseStudy = {
  /** Anchor id on the /clients page. */
  slug: string;
  name: string;
  url: string;
  sector: string;
  location?: string;
  /** What the organisation does, in its own public terms. */
  about: string;
  /** Why the confirmed work matters for this kind of organisation. */
  context: string;
  services: ServiceKey[];
  /** Optional link to a matching project on the homepage. */
  projectSlug?: string;
};

export const clients: ClientCaseStudy[] = [
  {
    slug: "softech-global-services",
    name: "Softech Global Services",
    url: "https://softechglobalservices.com/",
    sector: "ERPNext implementation & IT solutions",
    location: "Karachi, Pakistan",
    about:
      "Softech Global Services is an ERPNext partner delivering ERP implementation, FBR e-invoicing, AI automation, AI agents, Digital FTE, business automation and financial management for growing businesses.",
    context:
      "A firm that sells ERP and AI automation needs a web presence, ERP work and automation that hold up to the same standard it promises its own clients, on infrastructure that is locked down. My engagement covered the full stack of that work.",
    services: ["web", "erp", "ai", "security"],
  },
  {
    slug: "tech-accuracy",
    name: "Tech Accuracy",
    url: "https://techaccuracy.com/",
    sector: "Business automation, digital transformation & training",
    location: "Karachi, Pakistan",
    about:
      "Tech Accuracy helps businesses grow, automate and compete in the digital era through technology solutions, digital transformation, growth consultation and industry-focused training.",
    context:
      "Since July 2025 I have worked with Tech Accuracy as a Web Application Developer and IT Consultant — the broadest engagement on this page, spanning internal web tools, ERP and automation work, infrastructure security, IT support and training.",
    services: ["web", "erp", "ai", "security", "it"],
  },
  {
    slug: "right-window-solutions",
    name: "Right Window Solutions",
    url: "https://rwserp.com/",
    sector: "ERPNext implementation & consulting",
    about:
      "Right Window Solutions delivers ERPNext implementation, customization and consulting, alongside FBR digital invoicing, robotic AI and automation, and training and support.",
    context:
      "ERP consultancies win on how well their implementations fit the client's process. My work combined web development, ERP development and AI automation for a team whose business is ERPNext.",
    services: ["web", "erp", "ai"],
  },
  {
    slug: "the-gateway-institute",
    name: "The Gateway Institute",
    url: "https://thegatewayinstitute.org/",
    sector: "Child therapy & special needs center",
    location: "Karachi, Pakistan",
    about:
      "The Gateway Institute is a child development center in Karachi offering occupational therapy, speech therapy, ABA and behaviour therapy, sensory integration, assessments and STEM workshops.",
    context:
      "A therapy center runs on enrolments, schedules and communication with families. Web development, management-system work and automation free its staff to spend their time on the children rather than on admin.",
    services: ["web", "erp", "ai"],
  },
  {
    slug: "44-horizon",
    name: "44-Horizon",
    url: "https://44horizon.com/",
    sector: "AI automation agency",
    about: "44-Horizon is an agency offering AI automation services to businesses.",
    context:
      "An AI automation agency's own website is its first proof of competence. I built the 44-Horizon site with React, Vite and Tailwind CSS and worked on AI integration and automation.",
    services: ["web", "ai"],
    projectSlug: "44-horizon-ai-automation-portfolio",
  },
  {
    slug: "aurabex-tech",
    name: "Aurabex Tech",
    url: "https://aurabex.tech/",
    sector: "Custom software, AI automation & enterprise systems",
    about:
      "Aurabex Tech designs and builds custom software, AI agents, business automation and enterprise systems — web platforms, ERP, CRM, HRM, LMS and POS.",
    context:
      "For a software company, the website has to show the same engineering quality as the products it sells. My engagement with Aurabex Tech was web development.",
    services: ["web"],
  },
];
