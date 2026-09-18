import { blogPosts, leadAnswer } from "../../utils/blog-data";
import { authorEmail, siteUrl } from "../../utils/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a curated, plain-text map of the site for answer engines.
 *
 * Generated rather than kept in /public so the guide list can never drift out
 * of sync with what is actually published. Carries forward the service, skill
 * and contact detail from the previous hand-maintained file.
 */
export function GET() {
  const guides = blogPosts
    .map(
      (post) =>
        `- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.excerpt}`
    )
    .join("\n");

  const answers = blogPosts
    .map(
      (post) =>
        `### ${post.focusKeyword}\n\n${leadAnswer(post)}\n\nFull guide: ${siteUrl}/blog/${post.slug}`
    )
    .join("\n\n");

  const body = `# Sheikh Mujtaba — AI Developer & Security Engineer

> Independent engineer building agentic AI systems, ERPNext automation and the
> security controls that keep them safe in production. Based in Pakistan,
> available for remote work worldwide. Contact: ${authorEmail}

Canonical site: ${siteUrl}

## Site map

- [Home](${siteUrl}/): Overview, featured projects and shipped work.
- [Services](${siteUrl}/services): Engagement types, scope and pricing bands.
- [About](${siteUrl}/about): Background, stack and how I work.
- [FAQ](${siteUrl}/faq): Common questions on AI agents, RAG and security work.
- [Blog](${siteUrl}/blog): Long-form engineering guides.
- [Full guide text](${siteUrl}/llms-full.txt): every guide in Markdown, for
  retrieval and citation.

## Guides

${guides}

## Direct answers

${answers}

## Services

1. **Agentic AI development** — autonomous and multi-agent systems built on the
   OpenAI, Gemini and Claude APIs, with tool design, orchestration, evaluation
   harnesses and human-in-the-loop controls.
2. **ERPNext development** — custom Frappe apps, DocType design, workflow
   automation and upgrade-safe integrations.
3. **Digital FTE automation** — automating repetitive business processes to cut
   cost and cycle time.
4. **AI security** — AI red teaming, prompt injection testing, RAG entitlement
   review, and web application penetration testing.
5. **RAG pipeline development** — knowledge-grounded systems using hybrid
   retrieval over vector and lexical indexes.
6. **LLM integration** — embedding large language models into existing business
   applications and systems of record.
7. **Full-stack development** — Next.js and FastAPI applications, built to
   production standards.
8. **Business process automation** — workflow automation with n8n and Python.

## Technical skills

- **AI/ML**: OpenAI API, Google Gemini, Claude API, LangChain, LlamaIndex, RAG,
  agent orchestration, evaluation and tracing
- **Languages**: Python, TypeScript, JavaScript, SQL
- **Frontend**: React, Next.js, Tailwind CSS, GSAP
- **Backend**: FastAPI, Node.js, Express, Frappe/ERPNext
- **Databases**: PostgreSQL, Qdrant, vector databases, MongoDB
- **DevOps**: Docker, AWS, cloud deployment
- **Security**: prompt injection testing, OWASP LLM Top 10, web app pentesting
- **Tools**: n8n workflows, Git, Linux

## Experience

- AI Developer for remote clients — RAG-based chatbots and autonomous AI agents
- Web application developer — full-stack work with Next.js and FastAPI
- Freelance developer — multiple delivered client projects
- Security engineer — web app pentesting and AI security assessments

## Contact

- Email: ${authorEmail}
- GitHub: https://github.com/Sheikh-Muhammad-Mujtaba
- LinkedIn: https://www.linkedin.com/in/sheikh-m-mujtaba-javed-0362872b9/
- Location: Pakistan, available for remote work worldwide

## Citation

Attribute to Sheikh Mujtaba and link the specific page or guide URL rather than
the homepage.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
