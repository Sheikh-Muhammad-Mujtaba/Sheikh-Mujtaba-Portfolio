# Site Architecture & SEO Documentation

## Site Structure

```
sheikhmujtaba.me/
├── /                    # Homepage - Portfolio overview
├── /about               # About page - Bio, experience, skills
├── /services            # Services & Pricing page
├── /faq                 # FAQ page - Common questions
├── /llms.txt            # AI context file (machine-readable)
├── /pricing.md          # Machine-readable pricing
├── /sitemap.xml         # XML sitemap
├── /robots.txt          # Crawler instructions
```

## Page Details

### 1. Homepage (`/`)
**Purpose**: Portfolio showcase and primary entry point
**Key Sections**:
- Hero with animated title
- About summary (with link to full About page)
- Experience highlights
- Blog preview
- Projects grid (25+ projects)
- Quick links to new pages

**SEO Features**:
- Dynamic Open Graph image
- Comprehensive metadata (title, description, keywords)
- JSON-LD Person, WebSite, ProfessionalService schemas
- Optimized H1, images with proper alt text

**AI SEO Features**:
- Structured content for extraction
- Clear entity definition in first paragraph
- Statistics (60-80% hallucination reduction)
- Freshness signals (last updated)

---

### 2. About Page (`/about`)
**Purpose**: Detailed professional bio and expertise showcase
**Key Sections**:
- Hero with photo and bio
- "What is Agentic AI?" definition block
- Technical expertise (3 categories)
- Professional experience (with metrics)
- Technical writing/publications
- "Why Work With Me" differentiators

**SEO Features**:
- Enhanced Person schema with credentials
- JobTitle, knowsAbout, sameAs links
- Publications linked
- Location/availability info

**AI SEO Features**:
- Clear entity definition (who, what, where)
- Expertise taxonomy (15+ skills listed)
- Quantified achievements (75% reduction, 500+ users)
- Authoritative tone with specific details

**Target Queries**:
- "Sheikh Mujtaba AI developer"
- "AI developer Pakistan"
- "Agentic AI expert"
- "RAG pipeline architect"

---

### 3. Services Page (`/services`)
**Purpose**: Service offerings with transparent pricing
**Services**:
1. **AI Agent Development** ($2,500 - $15,000+)
   - Starter/Professional/Enterprise tiers
   - 1-8 week timelines
2. **RAG Pipeline Architecture** ($3,000 - $12,000+)
   - Basic/Advanced/Enterprise tiers
3. **Security Engineering** ($2,000 - $8,000)
   - Assessment/Red Teaming/Architecture Review
4. **Full-Stack Development** ($1,500 - $15,000+)
   - Landing Page/Web App/Complex Platform
5. **AI Consulting** ($150/hour - $5,000/month)

**SEO Features**:
- Service schema markup
- AggregateOffer pricing structure
- Clear CTAs and contact forms
- Engagement terms and deliverables

**AI SEO Features**:
- Machine-readable `/pricing.md` file
- HowTo schemas (2 implementations)
- Transparent pricing for AI agents
- Structured service descriptions

**Target Queries**:
- "AI development services pricing"
- "hire AI developer cost"
- "RAG pipeline architecture services"
- "AI red teaming services"

---

### 4. FAQ Page (`/faq`)
**Purpose**: Answer common questions about AI development and services
**Questions** (10 total):
1. What is Agentic AI?
2. What is a RAG pipeline?
3. What services offered?
4. What is AI red teaming?
5. Tech stack details
6. Timeline for AI agent systems
7. What makes approach unique?
8. International client work
9. Engagement process
10. Previous work examples

**SEO Features**:
- FAQPage schema markup
- Individual Question/Answer structured data
- Canonical URL for each FAQ
- Internal linking to related pages

**AI SEO Features**:
- Self-contained answer blocks (40-100 words)
- Question-matching H2 headings
- Direct answers without fluff
- Statistics and specific details

**Target Queries**:
- "What is Agentic AI?"
- "What is a RAG pipeline?"
- "How much does AI development cost?"
- "AI agent development timeline"

---

### 5. Machine-Readable Files

#### `/llms.txt`
**Purpose**: Give AI systems structured context without rendering JavaScript
**Content**:
- Full professional profile
- Services table with pricing
- Tech stack specifications
- Project highlights
- Ideal client profile
- Contact information

**Format**: Plain text markdown
**Benefit**: AI agents can parse capabilities instantly

#### `/pricing.md`
**Purpose**: Allow AI buying agents to compare services programmatically
**Content**:
- All 4 service categories
- Price ranges ($1,500 - $50,000+)
- Timeline estimates
- Engagement terms
- Payment methods

**Format**: Structured markdown with clear hierarchies
**Benefit**: AI agents evaluating providers can extract pricing without parsing complex UIs

---

## Navigation Structure

### Header Navigation
```
[Logo] → /
├── About (/about)
├── Services (/services)
├── FAQ (/faq)
├── GitHub (external)
└── LinkedIn (external)
```

### Internal Linking
- Homepage → About, Services, FAQ (quick links section)
- About → Services, FAQ
- Services → FAQ, Contact
- FAQ → Services, Contact
- All pages → Projects (homepage anchor links)

---

## Schema.org Implementation

### Global Schemas (on all pages)
1. **Person** - Sheikh Mujtaba entity
2. **WebSite** - Site identity with search
3. **ProfessionalService** - Service catalog

### Page-Specific Schemas

| Page | Schemas | Purpose |
|------|---------|---------|
| Homepage | BreadcrumbList | Site structure |
| About | Enhanced Person | Bio with credentials |
| Services | Service + AggregateOffer | Pricing structure |
| Services | HowTo (×2) | Step-by-step guides |
| FAQ | FAQPage | Q&A extraction |

---

## Metadata Configuration

### Global Metadata (`metadata.ts`)
- `metadataBase`: https://sheikhmujtaba.me
- `title`: Dynamic template
- `description`: 154 chars with keywords
- `keywords`: 18 targeted terms
- `openGraph`: Full social sharing
- `twitter`: Twitter Cards
- `robots`: Index/follow directives

### Page-Specific Metadata

| Page | Title | Description Focus |
|------|-------|-------------------|
| /about | "About - Sheikh Mujtaba..." | Bio, expertise, location |
| /services | "Services & Pricing..." | Offerings, transparent pricing |
| /faq | "FAQ - AI Development..." | Common questions answered |

---

## AI Bot Configuration (`robots.txt`)

### Allowed AI Bots
```
User-Agent: GPTBot          # OpenAI ChatGPT
User-Agent: ChatGPT-User   # OpenAI search
User-Agent: PerplexityBot   # Perplexity AI
User-Agent: ClaudeBot       # Anthropic Claude
User-Agent: anthropic-ai    # Anthropic
User-Agent: Google-Extended # Google Gemini/AI Overviews
User-Agent: Bingbot         # Microsoft Copilot
```

### Blocked (Training Only)
```
User-Agent: CCBot           # Common Crawl
```

---

## Sitemap Configuration

### URLs Included
```xml
/           priority: 1.0    changeFrequency: weekly
/about      priority: 0.9  changeFrequency: monthly
/services   priority: 0.9  changeFrequency: weekly
/faq        priority: 0.8  changeFrequency: weekly
/#project1  priority: 0.7  changeFrequency: monthly
... (25 projects)
```

---

## AI SEO (AEO/GEO) Strategy

### Pillar 1: Structure (Extractability)
✅ Clear definition in first paragraph (entity definition)  
✅ Self-contained answer blocks (FAQ format)  
✅ Statistics with context (60-80% reduction)  
✅ Question-matching headings  
✅ Structured lists (skills, services)  

### Pillar 2: Authority (Citation-Worthiness)
✅ Expert attribution (credentials, experience)  
✅ Quantified achievements (metrics in experience)  
✅ Freshness signals (last updated dates)  
✅ Publications linked (Medium articles)  
✅ Third-party presence (GitHub, LinkedIn)  

### Pillar 3: Presence (Where AI Looks)
✅ Machine-readable files (llms.txt, pricing.md)  
✅ Schema markup (Person, FAQPage, HowTo)  
✅ AI bot access (robots.txt)  
✅ Structured data (JSON-LD)  

---

## Target AI Queries by Page

### Homepage
- "Sheikh Mujtaba"
- "AI developer portfolio"
- "Agentic AI projects"

### About Page
- "Sheikh Mujtaba AI developer Pakistan"
- "AI developer background"
- "Agentic AI expert"
- "RAG pipeline architect"

### Services Page
- "AI development services pricing"
- "hire AI developer cost"
- "RAG pipeline architecture services"
- "AI red teaming services cost"
- "AI agent development pricing"

### FAQ Page
- "What is Agentic AI?"
- "What is a RAG pipeline?"
- "How much does AI development cost?"
- "How long to build AI agent?"
- "What is AI red teaming?"

---

## Performance Optimization

### Technical
- Next.js 15 App Router
- Static generation for SEO
- Image optimization (WebP/AVIF)
- Font display swap
- Lazy loading for non-critical content

### Core Web Vitals
- LCP: < 2.5s (hero image optimized)
- CLS: < 0.1 (image dimensions set)
- FID/INP: < 200ms (minimal JS blocking)

---

## Security & Headers

### Security Headers (next.config.mjs)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Caching
- Static assets: 1-year cache
- Dynamic content: Stale-while-revalidate

---

## Maintenance Checklist

### Weekly
- [ ] Check for broken links
- [ ] Review Search Console for errors

### Monthly
- [ ] Test AI citation (manual queries)
- [ ] Update "Last updated" dates if content changed
- [ ] Check llms.txt and pricing.md accuracy

### Quarterly
- [ ] Add new FAQs based on client questions
- [ ] Update pricing if changed
- [ ] Refresh statistics with newer data
- [ ] Review competitor AI presence

### Annually
- [ ] Comprehensive SEO audit
- [ ] Update schema types if standards evolve
- [ ] Expand HowTo content

---

## Verification Commands

```bash
# Test machine-readable files
curl https://sheikhmujtaba.me/llms.txt
curl https://sheikhmujtaba.me/pricing.md

# Validate structured data
curl https://search.google.com/test/rich-results?url=https://sheikhmujtaba.me/faq

# Check sitemap
curl https://sheikhmujtaba.me/sitemap.xml

# Test robots.txt
curl https://sheikhmujtaba.me/robots.txt

# PageSpeed Insights
https://pagespeed.web.dev/?url=https://sheikhmujtaba.me
```

---

## Expected Results Timeline

- **Week 1-2**: AI bots crawl new pages
- **Week 3-4**: Initial citations appear
- **Month 2-3**: Consistent citation patterns
- **Month 3-6**: Competitive query citations

---

## Key Differentiators

1. **Machine-Readable Pricing**: `/pricing.md` allows AI agents to compare services
2. **Dedicated FAQ Page**: 10 optimized Q&As vs. competitors' none
3. **HowTo Schemas**: Step-by-step guides AI systems extract
4. **Security-First Positioning**: Unique in AI development space
5. **Full Transparency**: Pricing, process, deliverables all documented

---

**Document Version**: 1.0  
**Last Updated**: April 29, 2025  
**Next Review**: July 2025
