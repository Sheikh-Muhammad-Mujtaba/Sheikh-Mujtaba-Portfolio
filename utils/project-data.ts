import { StaticImageData } from "next/image";
import ShopCo from "../public/images/Shop-Co.png";
import BlogSite from "../public/images/BlogSite.png";
import CarGage from "../public/images/CarGage.png";
import CafeStreet from "../public/images/CafeStreet.png";
import VisitNLearn from "../public/images/VisitNLearn.png";
import Furniro from "../public/images/Furniro-E-Commerce.png";
import PassGen from "../public/images/PassGen.png";
import Pomodoro from "../public/images/PomodoroTimer.png";
import Horizon from "../public/images/44horizon.png";
import Booker from "../public/images/bookerwp.png";
import Crypto from "../public/images/cryptodataagent.png";
import NuraShell from "../public/images/nurashell.png";
import PosRegister from "../public/images/posregister.png";
import RatingCalc from "../public/images/ratingcalculation.png";
import Ctfs from "../public/images/ctfs.png";
import CyberLab from "../public/images/cybersecuritylab.png";
import SecGuide from "../public/images/securityguidance.png";
import Backdoor from "../public/images/backdoorremoval.png";
import PhpMalware from "../public/images/phpmalwareanalysis.png";
import DnsAnalysis from "../public/images/dnsanalysis.png";
import Fuzzing from "../public/images/fuzzingresearch.png";
import GraySwan from "../public/images/grayswan.png";
import Lms from "../public/images/Lms.png";
import CrmFte from "../public/images/44horizon.png";
import AiEmployeeFte from "../public/images/AiEmployeeFte.png";
import SpecDrivenDocs from "../public/images/BlogSite.png";

export type ProjectType = {
  name: string;
  description: string;
  longDescription?: string;
  image: string | StaticImageData;
  videoEmbedUrl?: string;
  mobileImage?: string | StaticImageData;
  figma?: string | StaticImageData;
  old?: string | StaticImageData;
  code?: string;
  link?: string;
  slug: string;
  type: string;
};

export const projectsList: ProjectType[] = [
  {
    name: "CRM Digital FTE - AI Customer Success Platform",
    description:
      "Developed an autonomous multi-channel customer success platform with Gemini and OpenAI Agents SDK, including semantic search, ticketing workflows, and a Next.js operations dashboard.",
    image: CrmFte,
    videoEmbedUrl: "https://www.youtube.com/embed/i7CtntGqcAM?si=jnej7jb1I14o2UVX",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/CRM-Digital-FTE",
    slug: "crm-digital-fte-ai-customer-success-platform",
    type: "AI Platform",
  },
  {
    name: "AI Employee Digital FTE - Business Autopilot",
    description:
      "Architected a cloud + local autonomous AI employee with 9 orchestrated services, human-in-the-loop approvals, and a secure Next.js/FastAPI dashboard for business operations.",
    image: AiEmployeeFte,
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/AI-Employee-Digital-FTE",
    slug: "ai-employee-digital-fte-business-autopilot",
    type: "AI Agent",
  },
  {
    name: "Learning Management System (LMS)",
    description:
      "Built a full-stack LMS with enrollment, role-based dashboards, secure authentication, and progress tracking using Next.js, PostgreSQL, Python and Tailwind CSS.",
    image: Lms,
    slug: "learning-management-system-lms",
    type: "Full-Stack",
  },
  {
    name: "AI Spec-Driven Documentation Platform",
    description:
      "Created a specification-first technical documentation platform with a FastAPI backend, Qdrant-powered RAG chatbot, and strict context-grounded query responses.",
    image: SpecDrivenDocs,
    videoEmbedUrl:
      "https://www.youtube.com/embed/Uft6itQavs0?si=cMZWQfP_CyDROxfo",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/Physical-AI-Humanoid-Robotics-Textbook",
    link: "https://ai-spec-driven.vercel.app/",
    slug: "ai-spec-driven-documentation-platform",
    type: "AI + Documentation",
  },
  {
    name: "SHOP.CO E-Commerce",
    description: "A modern e-commerce platform built with Next.js, Tailwind CSS, and Stripe integration for seamless payments.",
    image: ShopCo,
    link: "https://dynamicblogs-brown.vercel.app/",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/Dec_Hackathon",
    slug: "shop-co-e-commerce",
    type: "Full-Stack",
  },
  {
    name: "Blog Site Theme",
    description: "A clean and responsive blog theme developed using Next.js, Tailwind CSS, and TypeScript for optimal performance.",
    image: BlogSite,
    link: "https://dynamicblogs-brown.vercel.app/",
    slug: "blog-site-theme",
    type: "Frontend",
  },
  {
    name: "Car Gage Website",
    description: "A comprehensive car reporting tool providing detailed history, accident reports, and ownership information.",
    image: CarGage,
    link: "https://cargage-momin-khans-projects-c9bd88f2.vercel.app/",
    slug: "car-gage-website",
    type: "Frontend",
  },
  {
    name: "Cafe Street",
    description: "An inviting coffee shop website featuring menu details, location services, and contact information.",
    image: CafeStreet,
    link: "https://coffee-shop-ochre-five.vercel.app/",
    slug: "cafe-street",
    type: "Frontend",
  },
  {
    name: "Visin N Learn",
    description: "An educational platform facilitating study abroad tours and programs for students across different countries.",
    image: VisitNLearn,
    link: "https://studynlearn.vercel.app/",
    slug: "visin-n-learn",
    type: "Frontend",
  },
  {
    name: "Furniro E-Commerce UI",
    description: "A sleek e-commerce user interface designed with core HTML, CSS, and JavaScript for a smooth shopping experience.",
    image: Furniro,
    link: "https://htms-css-ui-design.vercel.app/",
    slug: "furniro-e-commerce-ui",
    type: "Frontend",
  },
  {
    name: "Password Generator Widget",
    description: "A secure and customizable password generator widget built with Next.js to enhance user security.",
    image: PassGen,
    link: "https://nextjs-password-genrator-app.vercel.app/",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/nextjs-password_genrator-app",
    slug: "password-generator-widget",
    type: "Frontend",
  },
  {
    name: "Pomodoro Timer Widget",
    description: "A productivity tool implementing the Pomodoro technique to help users manage time effectively.",
    image: Pomodoro,
    link: "https://pomodoro-timer-app-alpha.vercel.app/",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/pomodoro_timer-app",
    slug: "pomodoro-timer-widget",
    type: "Frontend",
  },
  {
    name: "44-Horizon AI Automation Portfolio",
    description: "A professional portfolio for AI automation services, built with React, Vite, and Tailwind CSS.",
    image: Horizon,
    link: "https://44horizon.com/",
    slug: "44-horizon-ai-automation-portfolio",
    type: "Frontend",
  },
  {
    name: "WordPress Booking Site (Booker)",
    description: "A fully functional booking management site built on WordPress for scheduling and reservations.",
    image: Booker,
    link: "https://booker.bet",
    slug: "wordpress-booking-site-booker",
    type: "Frontend",
  },
  {
    name: "CryptoDataAgent",
    description: "An intelligent agent for crypto data analysis built with Node.js and the OpenAI Agent SDK.",
    image: Crypto,
    slug: "cryptodataagent",
    type: "AI Agent",
  },
  {
    name: "NuraShell",
    description: "A Python-based CLI agent integrating Gemini and ChatGPT for advanced shell automation and assistance.",
    image: NuraShell,
    link: "https://pypi.org/project/nuralshell/",
    slug: "nurashell",
    type: "AI Agent",
  },
  {
    name: "Laravel POS Register Modification",
    description: "Custom modification for a Laravel-based POS system to enhance register functionality and modules.",
    image: PosRegister,
    slug: "laravel-pos-register-modification",
    type: "Backend",
  },
  {
    name: "Laravel Custom Module: RatingCalculation",
    description: "A specialized Laravel module designed to handle complex rating calculations and logic.",
    image: RatingCalc,
    slug: "laravel-custom-module-ratingcalculation",
    type: "Backend",
  },
  {
    name: "CTF Challenges",
    description: "A collection of Capture The Flag challenges solving and write-ups demonstrating security skills.",
    image: Ctfs,
    slug: "ctf-challenges",
    type: "Cybersecurity",
  },
  {
    name: "Cybersecurity Lab Setup",
    description: "Documentation and setup of a comprehensive cybersecurity lab for testing and research purposes.",
    image: CyberLab,
    slug: "cybersecurity-lab-setup",
    type: "Cybersecurity",
  },
  {
    name: "Cybersecurity Guidance & Training",
    description: "Resources and guides provided for cybersecurity training and best practices implementation.",
    image: SecGuide,
    slug: "cybersecurity-guidance-training",
    type: "Cybersecurity",
  },
  {
    name: "Backdoor Removal + Hosting Hardening",
    description: "Project focused on identifying and removing backdoors and hardening hosting environments against attacks.",
    image: Backdoor,
    slug: "backdoor-removal-hosting-hardening",
    type: "Cybersecurity",
  },
  {
    name: "Obfuscated PHP Malware Analysis",
    description: "In-depth analysis and deobfuscation of PHP malware to understand attack vectors and payloads.",
    image: PhpMalware,
    slug: "obfuscated-php-malware-analysis",
    type: "Cybersecurity",
  },
  {
    name: "Firestartercloud DNS/Payload Investigation",
    description: "Investigative research into DNS anomalies and payload delivery mechanisms associated with Firestartercloud.",
    image: DnsAnalysis,
    slug: "firestartercloud-dns-payload-investigation",
    type: "Cybersecurity",
  },
  {
    name: "Sidebar Fuzzing & WAF Bypass Research",
    description: "Research project exploring fuzzing techniques and methods to bypass Web Application Firewalls.",
    image: Fuzzing,
    slug: "sidebar-fuzzing-waf-bypass-research",
    type: "Cybersecurity",
  },
  {
    name: "Gray Swan Ethical Red Teaming",
    description: "Ethical red teaming engagements simulating advanced threats to test and improve security posture.",
    image: GraySwan,
    slug: "gray-swan-ethical-red-teaming",
    type: "AI Red Team",
  },
];
