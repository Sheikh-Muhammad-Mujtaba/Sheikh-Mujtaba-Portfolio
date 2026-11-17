import type { ProjectDetail } from "../../utils/project-detail-types";

export const webProjects: ProjectDetail[] = [
  {
    slug: "shop-co-e-commerce",
    focusKeyword: "Next.js e-commerce website",
    summary:
      "SHOP.CO is a Next.js e-commerce website built in a 24-hour hackathon: a Figma design turned into a pixel-perfect, fully responsive store. Sheikh Mujtaba built the homepage, product, category and cart pages with Next.js, Tailwind CSS and shadcn/ui.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Lucide Icons"],
    blocks: [
      { type: "h2", text: "The challenge" },
      {
        type: "p",
        text: "The brief was simple and unforgiving: take a Figma design for a fashion store and ship it as working, responsive code within 24 hours, matching the design to the pixel. Hackathons like this test the skills real client work depends on — reading a design precisely, structuring components quickly and not cutting corners on mobile.",
      },
      { type: "h2", text: "Four pages" },
      {
        type: "ul",
        items: [
          "**Homepage** — new arrivals, top sellers and customer testimonials.",
          "**Product detail** — product information, reviews and recommendations.",
          "**Category page** — browsing with filters.",
          "**Cart** — order summary, promo codes and the checkout flow.",
        ],
      },
      { type: "h2", text: "How it was built" },
      {
        type: "p",
        text: "Next.js handles routing and rendering, Tailwind CSS provides utility-first responsive styling, shadcn/ui supplies accessible base components and Lucide provides lightweight icons. The interface is broken into reusable components — product cards, rating stars, price blocks — so new pages reuse them instead of duplicating markup.",
      },
      { type: "h2", text: "Responsive by default" },
      {
        type: "p",
        text: "Every layout is tuned for desktop, tablet and mobile. On a store, most traffic is on phones, so the cart and product pages were treated as mobile-first screens rather than shrunk desktop layouts.",
      },
      {
        type: "p",
        text: "For production stores I add payments, inventory and SEO on top of this foundation — see my [full-stack developer](/full-stack-developer) page for that work.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "How long did SHOP.CO take to build?",
        answer: "It was built during a 24-hour hackathon.",
      },
      {
        question: "Which pages does it include?",
        answer: "A homepage, product detail page, category page with filters, and a cart with promo codes and checkout.",
      },
      {
        question: "Is the source code public?",
        answer: "Yes, on GitHub, and the live demo is on Vercel.",
      },
    ],
  },
  {
    slug: "44-horizon-ai-automation-portfolio",
    focusKeyword: "AI automation agency website",
    summary:
      "44-Horizon is an AI automation agency website built by Sheikh Mujtaba with React, Vite and Tailwind CSS. It presents the agency's automation services with a fast, modern single-page experience.",
    stack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    blocks: [
      { type: "h2", text: "A website that proves the pitch" },
      {
        type: "p",
        text: "An AI automation agency sells competence with modern technology, so its own website has to show it. Slow loading or a dated look undermines the pitch before a prospect reads a word. The 44-Horizon site was built to feel quick, clean and current.",
      },
      { type: "h2", text: "Why React and Vite" },
      {
        type: "p",
        text: "Vite gives near-instant development builds and small, optimised production bundles. React provides a component model that keeps service sections, case blocks and calls to action consistent, and Tailwind CSS keeps the styling fast to iterate on without a growing stylesheet.",
      },
      { type: "h2", text: "What the site needed" },
      {
        type: "ul",
        items: [
          "Clear presentation of the agency's AI automation services.",
          "A modern visual identity that matches an AI-focused brand.",
          "Responsive layouts for mobile prospects.",
          "Fast first load, because agency visitors judge in seconds.",
        ],
      },
      { type: "h2", text: "Beyond the website" },
      {
        type: "p",
        text: "Alongside the site, my work with 44-Horizon included AI integration and automation. Read the [44-Horizon case study](/clients/44-horizon) for the full engagement.",
      },
      {
        type: "p",
        text: "A note for single-page sites like this one: because content renders in the browser, search engines see less on first fetch. For agencies that depend on organic search, I usually recommend server rendering with Next.js — the approach this portfolio itself uses.",
      },
    ],
    role: "full-stack-developer",
    guides: ["ai-integration-in-business-workflows"],
    faqs: [
      {
        question: "What is the 44-Horizon site built with?",
        answer: "React, Vite and Tailwind CSS.",
      },
      {
        question: "Did the work include more than the website?",
        answer: "Yes, it also covered AI integration and automation for 44-Horizon.",
      },
    ],
  },
  {
    slug: "wordpress-booking-site-booker",
    focusKeyword: "WordPress membership website",
    summary:
      "Booker is a WordPress site for AI-driven football predictions with a public track record, member accounts and paid access. Sheikh Mujtaba built and customised the WordPress platform, including the membership account area and multi-language support.",
    stack: ["WordPress", "PHP", "CSS", "Membership plugin", "Stripe", "Multi-language"],
    blocks: [
      { type: "h2", text: "What Booker is" },
      {
        type: "p",
        text: "Booker publishes football predictions across hundreds of leagues and keeps every pick online with its result — wins and losses, never edited afterwards. That transparency is the product, so the site has to be trustworthy, fast and easy to use on a phone, where most sports fans browse.",
      },
      { type: "h2", text: "Why WordPress" },
      {
        type: "p",
        text: "WordPress gave the client a content system they can run themselves, a mature ecosystem for memberships and payments, and built-in support for publishing daily content at volume. The engineering work is in making those pieces behave like one product.",
      },
      { type: "h2", text: "Membership and account area" },
      {
        type: "p",
        text: "Members get an account area for their subscription and access. It was restyled as a dark, mobile-first interface to match the brand, with clean-up along the way: duplicated registration form elements removed, the mobile menu reduced to an icon so it works in all seven site languages, and unused font weights dropped to lighten the page.",
      },
      {
        type: "ul",
        items: [
          "Dark, mobile-first account pages consistent with the main site.",
          "Registration and payment flow with Stripe.",
          "A seven-language interface.",
          "Performance housekeeping on fonts and styles.",
        ],
      },
      { type: "h2", text: "Running WordPress safely" },
      {
        type: "p",
        text: "Membership sites hold accounts and payment links, which makes them targets. Keeping plugins updated, limiting admin access and hardening the hosting matter as much as the design — the same work described on my [cybersecurity engineer](/cybersecurity-engineer) page.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "What platform is Booker built on?",
        answer: "WordPress, with a membership account area, Stripe payments and seven languages.",
      },
      {
        question: "Do you build membership sites?",
        answer: "Yes, on WordPress or as custom Next.js applications, depending on who will run the site.",
      },
    ],
  },
  {
    slug: "visin-n-learn",
    focusKeyword: "study abroad education website",
    summary:
      "Visit N Learn is a study abroad education website connecting Pakistani students with European universities through partnerships, scholarships and study tours. Sheikh Mujtaba built the site with Next.js and TypeScript.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    blocks: [
      { type: "h2", text: "The organisation" },
      {
        type: "p",
        text: "Visit N Learn builds bridges between Pakistani and European educational institutions: strategic partnerships, scholarship opportunities, cultural exchange, study world tours and international conferences. The website has to earn the trust of students and parents making a large decision.",
      },
      { type: "h2", text: "What the site includes" },
      {
        type: "ul",
        items: [
          "A clear explanation of services and how the programmes work.",
          "A message from the CEO and their international engagements, for credibility.",
          "A timeline of partner institutions and events.",
          "Student testimonials and a gallery of past tours.",
          "Registration and contact routes for free consultations.",
        ],
      },
      { type: "h2", text: "Design for trust" },
      {
        type: "p",
        text: "Education decisions are emotional and expensive, so the design leans on proof: real partner names, past events, photos and testimonials, placed before the call to action rather than after it. Calls to action are repeated at natural decision points so a convinced visitor never has to scroll back.",
      },
      { type: "h2", text: "Built to be found" },
      {
        type: "p",
        text: "Students search for programmes by country and subject. Next.js renders pages on the server with proper titles and descriptions, giving search engines complete content on the first request — the foundation for ranking on those searches.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "What does Visit N Learn do?",
        answer: "It connects Pakistani students with European educational institutions through partnerships, scholarships and study tours.",
      },
      {
        question: "What is the site built with?",
        answer: "Next.js, React, TypeScript and Tailwind CSS.",
      },
    ],
  },
  {
    slug: "cafe-street",
    focusKeyword: "coffee shop website",
    summary:
      "Cafe Street is a coffee shop website with a product menu, delivery flow and a working cart. Sheikh Mujtaba built it with Next.js and React, including a cart that persists in local storage.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Local storage"],
    blocks: [
      { type: "h2", text: "A small business site that sells" },
      {
        type: "p",
        text: "A coffee shop website has two jobs: make people want a coffee, and make ordering effortless. Cafe Street opens with a clear promise — enjoy your coffee before your activity — then moves straight to popular drinks and how delivery works.",
      },
      { type: "h2", text: "Features" },
      {
        type: "ul",
        items: [
          "**Product browsing** — a menu of 20+ coffees with a “Popular Now” section.",
          "**Product details** for each drink.",
          "**Cart** — add products, update quantities and remove items.",
          "**Persistent cart** saved in local storage, so it survives a refresh.",
          "**Delivery explainer** — choose, deliver, enjoy, in three steps.",
        ],
      },
      { type: "h2", text: "Why the cart persists" },
      {
        type: "p",
        text: "Visitors on phones get interrupted. Saving the cart in local storage means a customer who switches apps and comes back still has their order waiting, without needing an account — a small detail that directly reduces abandoned orders.",
      },
      { type: "h2", text: "Component structure" },
      {
        type: "p",
        text: "The site is built from reusable React components — product cards, menu sections, the cart drawer — so adding a seasonal menu or a new product line is a content change, not a redesign.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "Does the Cafe Street cart work?",
        answer: "Yes. You can add items, change quantities and remove them, and the cart persists in local storage.",
      },
      {
        question: "What is it built with?",
        answer: "Next.js and React.",
      },
    ],
  },
  {
    slug: "blog-site-theme",
    focusKeyword: "Next.js blog theme",
    summary:
      "This Next.js blog theme is a clean, responsive template built with Next.js, Tailwind CSS and TypeScript, with dark mode, newsletter and RSS links ready for publishing.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    blocks: [
      { type: "h2", text: "What the theme provides" },
      {
        type: "p",
        text: "A blog theme is a starting point that should get out of the writer's way. This one provides the structure every blog needs, so the author can focus on writing instead of layout.",
      },
      {
        type: "ul",
        items: [
          "Blog, projects, about and newsletter sections in the navigation.",
          "A dark mode toggle.",
          "Social links and an RSS feed with an “Add to Feedly” option.",
          "A responsive layout with a mobile menu.",
        ],
      },
      { type: "h2", text: "Built for performance" },
      {
        type: "p",
        text: "Next.js and Tailwind CSS keep the theme lightweight. Pages can be statically generated, which makes them fast to load and simple to host on a CDN — important for blogs, where most visitors arrive from search and leave if a page is slow.",
      },
      { type: "h2", text: "Typed and maintainable" },
      {
        type: "p",
        text: "TypeScript keeps the post and component data structures explicit, so adding fields such as tags, authors or reading time does not break pages silently.",
      },
      { type: "h2", text: "From theme to production blog" },
      {
        type: "p",
        text: "A production blog needs more than a theme: structured data, sitemaps, Open Graph cards and content strategy. This portfolio's own [blog](/blog) shows that fuller setup in action.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "What is the blog theme built with?",
        answer: "Next.js, Tailwind CSS and TypeScript.",
      },
      {
        question: "Does it support dark mode?",
        answer: "Yes, it includes a dark mode toggle.",
      },
    ],
  },
  {
    slug: "car-gage-website",
    focusKeyword: "vehicle history report website",
    summary:
      "Car Gage is a vehicle history report website concept: a tool for checking a car's history, accident reports and ownership before buying. Sheikh Mujtaba built the frontend.",
    stack: ["Responsive frontend", "Report UI"],
    blocks: [
      { type: "h2", text: "The problem it addresses" },
      {
        type: "p",
        text: "Buying a used car is a trust problem. The seller knows the car's history; the buyer does not. Vehicle history tools close that gap by surfacing past accidents, ownership changes and other records before money changes hands.",
      },
      { type: "h2", text: "What the interface presents" },
      {
        type: "ul",
        items: [
          "A simple search entry point for looking up a vehicle.",
          "Detailed history information.",
          "Accident reports.",
          "Ownership information.",
        ],
      },
      { type: "h2", text: "Designing for a high-stakes decision" },
      {
        type: "p",
        text: "Reports like these are read carefully and often on a phone at the seller's driveway. The layout prioritises scannable sections and clear warnings over decoration, so the most important facts — accidents and ownership — are found in seconds.",
      },
      { type: "h2", text: "Frontend focus" },
      {
        type: "p",
        text: "This was a frontend build: page structure, responsive layout and presentation of report data. A production version would connect to vehicle data providers through a secured backend, with rate limiting and access control so report data cannot be scraped.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "What does Car Gage show?",
        answer: "Vehicle history, accident reports and ownership information.",
      },
      {
        question: "Is there a live demo?",
        answer: "The original demo deployment is no longer online.",
      },
    ],
  },
  {
    slug: "furniro-e-commerce-ui",
    focusKeyword: "HTML CSS e-commerce UI",
    summary:
      "Furniro is a furniture e-commerce UI built from scratch with core HTML, CSS and JavaScript — no framework. Sheikh Mujtaba built it to sharpen layout fundamentals behind every modern interface.",
    stack: ["HTML", "CSS", "JavaScript"],
    blocks: [
      { type: "h2", text: "Why build without a framework" },
      {
        type: "p",
        text: "Frameworks hide a lot. Building a full store interface with only HTML, CSS and JavaScript forces a solid grasp of the fundamentals — semantic markup, the box model, flexbox and grid, responsive breakpoints — that every React or Next.js project still rests on.",
      },
      { type: "h2", text: "What the UI includes" },
      {
        type: "ul",
        items: [
          "A hero section introducing a new collection.",
          "“Browse the range” category tiles for dining, living and bedroom.",
          "A product grid with names, descriptions and sale pricing.",
          "A room inspiration section.",
        ],
      },
      { type: "h2", text: "Craft details" },
      {
        type: "p",
        text: "Product cards show original and discounted prices, sections follow a consistent spacing scale, and the layout adapts across screen sizes. Getting these details right by hand is what makes later component work faster and more precise.",
      },
      { type: "h2", text: "From static UI to store" },
      {
        type: "p",
        text: "The same design translated into a framework would gain routing, a cart and data loading. My [SHOP.CO project](/projects/shop-co-e-commerce) shows that next step with Next.js and Tailwind CSS.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "Is Furniro built with a framework?",
        answer: "No, it uses core HTML, CSS and JavaScript only.",
      },
      {
        question: "What does it demonstrate?",
        answer: "Layout fundamentals: semantic markup, flexbox, grid and responsive design without framework help.",
      },
    ],
  },
  {
    slug: "password-generator-widget",
    focusKeyword: "password generator app",
    summary:
      "This password generator app creates strong passwords from customisable rules — length from 8 to 32 characters and a choice of uppercase, lowercase, numbers and symbols — with one-click copy. Sheikh Mujtaba built it with Next.js.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    blocks: [
      { type: "h2", text: "Why password generators matter" },
      {
        type: "p",
        text: "Reused and predictable passwords remain one of the most common ways accounts are breached. A generator removes the human habit of picking memorable patterns and produces passwords that are long and random — the two properties that actually resist guessing and cracking.",
      },
      { type: "h2", text: "Features" },
      {
        type: "ul",
        items: [
          "**Custom length** between 8 and 32 characters.",
          "**Character sets** — choose uppercase, lowercase, numbers and symbols.",
          "**Copy to clipboard** with one click.",
          "**Responsive interface** for desktop and mobile.",
        ],
      },
      { type: "h2", text: "A security note on randomness" },
      {
        type: "p",
        text: "The generator runs entirely in the browser, so passwords never travel over the network. This learning build picks characters with `Math.random()`, which is fine for a demo but not designed for security. A production version should use the browser's cryptographic source, `crypto.getRandomValues()`, so outputs cannot be predicted — the first change I would make before recommending it for real accounts.",
      },
      { type: "h2", text: "Good practice for users" },
      {
        type: "p",
        text: "Use 16 or more characters, a unique password for every account, and a password manager to remember them. Add multi-factor authentication wherever it is offered.",
      },
    ],
    role: "full-stack-developer",
    guides: ["ai-security"],
    faqs: [
      {
        question: "How long can the generated passwords be?",
        answer: "Between 8 and 32 characters.",
      },
      {
        question: "Is the password sent to a server?",
        answer: "No. The password is generated in the browser and no network request is made.",
      },
    ],
  },
  {
    slug: "pomodoro-timer-widget",
    focusKeyword: "Pomodoro timer app",
    summary:
      "This Pomodoro timer app helps you work in focused intervals with breaks in between, using customisable durations, a visual countdown and sound alerts. Sheikh Mujtaba built it with Next.js, React and TypeScript.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "react-circular-progressbar", "lucide-react"],
    blocks: [
      { type: "h2", text: "The technique" },
      {
        type: "p",
        text: "The Pomodoro Technique splits work into focused intervals — traditionally 25 minutes — followed by short breaks. The structure makes large tasks less daunting and protects attention from constant interruption.",
      },
      { type: "h2", text: "Features" },
      {
        type: "ul",
        items: [
          "Adjustable work and break durations with + and − controls.",
          "A circular progress countdown.",
          "Sound notifications when a session ends, with an on/off toggle.",
          "Start, pause and reset controls.",
          "An in-app explanation of the technique.",
          "Dark mode and a responsive layout.",
        ],
      },
      { type: "h2", text: "Engineering details" },
      {
        type: "p",
        text: "Timers are trickier than they look. Browsers throttle background tabs, so a countdown that subtracts one second per tick drifts. A reliable timer computes remaining time from a fixed end timestamp on each update, so it stays accurate even when the tab sleeps.",
      },
      { type: "h2", text: "Stack" },
      {
        type: "p",
        text: "Next.js and React with TypeScript, styled with Tailwind CSS, with `react-circular-progressbar` for the countdown ring and `lucide-react` for icons.",
      },
    ],
    role: "full-stack-developer",
    guides: [],
    faqs: [
      {
        question: "Can I change the work and break lengths?",
        answer: "Yes, both durations are adjustable.",
      },
      {
        question: "Does it alert me when a session ends?",
        answer: "Yes, with a sound notification you can switch off.",
      },
    ],
  },
  {
    slug: "laravel-pos-register-modification",
    focusKeyword: "Laravel POS customisation",
    summary:
      "This Laravel POS customisation extended an existing point-of-sale system's register functionality and modules. Sheikh Mujtaba made the changes inside a live codebase without disrupting daily sales.",
    stack: ["PHP", "Laravel", "MySQL"],
    blocks: [
      { type: "h2", text: "Working inside an existing system" },
      {
        type: "p",
        text: "Most business software work is not greenfield. A shop already runs on a POS system, staff know it, and sales cannot stop. The job here was to modify the register and related modules of a Laravel-based POS to fit how the business actually operates.",
      },
      { type: "h2", text: "Approach" },
      {
        type: "ol",
        items: [
          "Read the existing code paths for the register before changing anything.",
          "Make changes in a way that follows the application's own conventions.",
          "Test the register flow end to end — opening, sales, totals, closing.",
          "Deploy with a rollback plan, outside trading hours.",
        ],
      },
      { type: "h2", text: "Why the register is sensitive" },
      {
        type: "p",
        text: "The register is where money is counted. A bug there shows up as cash discrepancies and broken trust between staff and owners. Changes need careful handling of totals, rounding and concurrency, and every path that touches a sale has to be tested.",
      },
      { type: "h2", text: "Laravel experience" },
      {
        type: "p",
        text: "Alongside this, I built a custom Laravel rating calculation module. Together they show the brownfield skill that matters in practice: extending an application someone else wrote without breaking what already works.",
      },
    ],
    role: "full-stack-developer",
    guides: ["erpnext-development"],
    faqs: [
      {
        question: "What was changed in the POS?",
        answer: "The register functionality and related modules of a Laravel-based POS system.",
      },
      {
        question: "Can you modify an existing Laravel application?",
        answer: "Yes. I work inside existing codebases, following their conventions and testing every affected flow.",
      },
    ],
  },
  {
    slug: "laravel-custom-module-ratingcalculation",
    focusKeyword: "Laravel custom module",
    summary:
      "RatingCalculation is a Laravel custom module that handles complex rating calculations and the business logic around them. Sheikh Mujtaba built it as a self-contained module inside an existing application.",
    stack: ["PHP", "Laravel", "MySQL"],
    blocks: [
      { type: "h2", text: "Why a dedicated module" },
      {
        type: "p",
        text: "Rating logic tends to sprawl: weights, thresholds and edge cases end up scattered across controllers. Packaging it as a Laravel module keeps the calculation in one place, with a clear interface the rest of the application calls.",
      },
      { type: "h2", text: "What a rating engine has to get right" },
      {
        type: "ul",
        items: [
          "**Correct weighting** of the inputs that make up a rating.",
          "**Edge cases** — missing data, ties and zero values.",
          "**Consistency** — the same inputs always produce the same rating.",
          "**Performance** when ratings are recalculated across many records.",
        ],
      },
      { type: "h2", text: "Design" },
      {
        type: "p",
        text: "The module isolates the calculation logic from presentation and storage. That separation makes the rules testable in isolation and lets the business change a weight or threshold without touching unrelated code.",
      },
      { type: "h2", text: "Where this fits" },
      {
        type: "p",
        text: "Clean, isolated business logic is the same principle I apply in ERPNext custom apps: put the rules in versioned, testable code instead of scattering them through the interface. See [ERPNext development that survives upgrades](/blog/erpnext-development).",
      },
    ],
    role: "full-stack-developer",
    guides: ["erpnext-development"],
    faqs: [
      {
        question: "What does the RatingCalculation module do?",
        answer: "It handles complex rating calculations and the related logic inside a Laravel application.",
      },
      {
        question: "Why build it as a module?",
        answer: "To keep the calculation rules in one testable place with a clear interface.",
      },
    ],
  },
];
