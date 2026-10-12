import type { BlogPost } from "../../utils/blog-types";

export const ragSecurity: BlogPost = {
  slug: "rag-security",
  title: "RAG Security: Securing Vector Databases and RAG Pipelines",
  heading: "RAG Security for Vector Databases and Retrieval Pipelines",
  description:
    "A practical RAG security guide: the end-to-end threat model of a retrieval pipeline, document poisoning, indirect prompt injection, entitlement filtering with Qdrant payload filters, multi-tenant isolation, embedding leakage, vector database hardening and deletion.",
  focusKeyword: "RAG security",
  keywords: [
    "RAG security",
    "retrieval augmented generation security",
    "vector database security",
    "RAG data leakage",
    "secure RAG pipeline",
    "Qdrant security",
    "multi-tenant RAG",
    "embedding inversion",
    "OWASP LLM08",
    "document poisoning",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 10,
  excerpt:
    "A RAG pipeline is a data system with an LLM on the end. Here is where it leaks, where it gets poisoned, and the retrieval-time controls that actually enforce who sees what.",
  related: ["llm-guardrails", "prompt-injection", "ai-security"],
  blocks: [
    {
      type: "p",
      text: "**RAG security** is usually treated as a prompt problem, and that is why so many retrieval systems leak. A retrieval-augmented generation pipeline is a data system first: it ingests documents, splits them, turns them into vectors, stores them in a database and serves them back to a model that will repeat whatever it is given. Every one of those stages has its own failure modes, and most of them have nothing to do with clever prompts. This guide walks the pipeline end to end and gives the controls I use when building or reviewing one.",
    },
    {
      type: "callout",
      title: "The core rule",
      text: "The model will summarise any chunk you put in its context window. Authorisation therefore has to happen before retrieval returns a result, inside the query to the vector store, using the caller's real identity. Anything later is damage limitation.",
    },
    { type: "h2", text: "Where RAG sits in the OWASP Top 10 for LLMs" },
    {
      type: "p",
      text: "The 2025 OWASP Top 10 for LLM Applications gave retrieval its own entry: [LLM08:2025 Vector and Embedding Weaknesses](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/). It lists unauthorised access and data leakage, cross-context leaks in multi-tenant vector databases, embedding inversion, data poisoning and behaviour alteration. Its mitigations are permission-aware vector stores with logical partitioning, validating and authenticating data sources, classifying data before combining it, and keeping immutable logs of retrieval activity.",
    },
    {
      type: "p",
      text: "Two neighbouring entries matter just as much. [LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/) is what a broken retrieval filter turns into in front of a user, and LLM01 Prompt Injection is what happens when a retrieved chunk contains instructions. If you want the whole list in context, the [OWASP Top 10 for LLM applications](/blog/owasp-top-10-for-llm-applications) post covers each entry.",
    },
    { type: "h2", text: "The pipeline-stage threat model" },
    {
      type: "p",
      text: "The most useful exercise is to walk each stage and ask what an attacker could control, and what the system would do with it. This is the table I start every review from:",
    },
    {
      type: "table",
      head: ["Stage", "Main risk", "Primary control"],
      rows: [
        [
          "Ingestion",
          "Poisoned or attacker-authored documents enter the corpus",
          "Allow-listed sources, provenance metadata, content hashes, review for high-trust collections",
        ],
        [
          "Parsing and chunking",
          "Hidden text (white-on-white, HTML comments, PDF layers) survives into chunks",
          "Normalise to plain text, strip invisible content, record what was removed",
        ],
        [
          "Embedding",
          "Sensitive text sent to a third-party embedding API; vectors treated as harmless",
          "Classify before embedding; treat vectors as sensitive as the source text",
        ],
        [
          "Vector store",
          "Unauthenticated instance, leaked admin key, unencrypted traffic",
          "API key or JWT auth, TLS, private network, read-only keys for query services",
        ],
        [
          "Retrieval",
          "Chunks returned that the caller is not entitled to see; cross-tenant leakage",
          "Entitlement filter inside the query, from the server-side session",
        ],
        [
          "Prompt assembly",
          "Retrieved text carries instructions the model follows",
          "Delimit untrusted context, least-privilege tools, no secrets in context",
        ],
        [
          "Output",
          "Spoofed or missing citations, PII echoed back, unsafe markup",
          "Citation enforcement against retrieved IDs, egress scanning, output encoding",
        ],
      ],
    },
    { type: "h2", text: "Ingestion: document and data poisoning" },
    {
      type: "p",
      text: "Whoever can write to your corpus can write to your model's context. That includes anyone who can edit a wiki page you index, upload a file to a shared drive you sync, or submit a support ticket that later becomes a knowledge-base article. Poisoning does not need to be sophisticated: a single confident, well-formatted paragraph with the wrong refund policy will be retrieved for refund questions and repeated verbatim.",
    },
    {
      type: "ul",
      items: [
        "**Allow-list sources per collection.** A collection that answers policy questions should only ingest from the system of record for policies, not from every connected drive.",
        "**Record provenance on every chunk:** source system, document ID, author, ingestion time, content hash and the pipeline version that produced it. Without this you cannot find or remove poisoned content later.",
        "**Sign or hash at the source boundary.** If a document's hash at retrieval no longer matches what was approved, drop it from the high-trust collection until it is re-reviewed.",
        "**Separate trust tiers.** Curated, reviewed content and user-generated content should live in different collections, and answers should say which tier they came from.",
        "**Audit the corpus, not just the pipeline.** Periodically search for imperative phrasing aimed at an assistant, unusual URLs and near-duplicate documents that differ only in a figure or a link.",
      ],
    },
    { type: "h2", text: "Indirect prompt injection through retrieved chunks" },
    {
      type: "p",
      text: "Retrieval is the most reliable delivery mechanism for indirect prompt injection ever built. An attacker plants text in a document, the retriever helpfully selects it because it is semantically close to the user's question, and the system places it right next to the user's request. The model has no channel that marks it as data. The [prompt injection](/blog/prompt-injection) post covers the mechanics; for RAG specifically, the controls are:",
    },
    {
      type: "ol",
      items: [
        "**Sanitise at ingestion, not only at query time.** Strip zero-width characters, hidden HTML, comments, alt text you do not need and off-page PDF content before chunking. It is cheaper to clean once than to inspect every retrieval.",
        "**Delimit retrieved context** in clearly labelled blocks and tell the model that content inside them is reference material, never instructions. This lowers success rates; it does not stop a determined attacker.",
        "**Keep tools away from the generation step.** A RAG answer call should not hold tools that send email, change records or fetch arbitrary URLs. If an agent needs both, split it into a tool-less summarisation call and a separate, permission-checked action step. See [AI agent security](/blog/ai-agent-security) for that pattern.",
        "**Never put secrets in the context window.** If an API key, internal hostname or another user's data is in the prompt, assume an injected instruction can get it into the output.",
        "**Block exfiltration channels in the output.** Strip or proxy markdown images and links to unknown domains, which can carry data out in a URL the client fetches automatically.",
      ],
    },
    { type: "h2", text: "Access control: filter inside the query" },
    {
      type: "p",
      text: "The classic RAG leak is architectural. The ingestion job runs as a service account that can read every document, all chunks land in one collection, and every query searches all of it. The model then faithfully summarises an HR file for someone in sales. Prompt instructions such as \"only answer from documents the user may see\" do nothing, because the model cannot know what the user may see.",
    },
    {
      type: "p",
      text: "The fix is to copy access-control metadata onto each point's payload at ingestion time and apply the caller's entitlements as a filter in the search itself. Post-filtering the top results is weaker: it leaks through counts, timing and reranker behaviour, and it silently returns too few results when most of the top hits are filtered away. In Qdrant, entitlement filtering is a [payload filter](https://qdrant.tech/documentation/concepts/filtering/) passed with the query:",
    },
    {
      type: "code",
      lang: "python",
      code: `from qdrant_client import QdrantClient, models

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_READ_ONLY_KEY)


def retrieve(session, query_vector, limit=8):
    # Identity comes from the authenticated server-side session,
    # never from the request body and never from the model.
    entitlement = models.Filter(
        must=[
            models.FieldCondition(
                key="tenant_id",
                match=models.MatchValue(value=session.tenant_id),
            ),
            # Matches if the chunk's allowed_groups array shares
            # at least one value with the caller's groups.
            models.FieldCondition(
                key="allowed_groups",
                match=models.MatchAny(any=session.group_ids),
            ),
        ],
        must_not=[
            models.FieldCondition(
                key="status",
                match=models.MatchValue(value="revoked"),
            ),
        ],
    )

    result = client.query_points(
        collection_name="knowledge_base",
        query=query_vector,
        query_filter=entitlement,
        limit=limit,
        with_payload=True,
    )
    return result.points`,
    },
    {
      type: "p",
      text: "A few details make this hold up in production. Build the filter in one shared function so no endpoint can forget it. Write a test that queries as a user from tenant A for a phrase that only exists in tenant B's documents and asserts zero results. Re-check entitlement at answer time for long-running conversations, because group membership changes. And log the user, the query and the returned point IDs for every retrieval: that log is your only way to answer \"who saw this document?\" after an incident.",
    },
    { type: "h3", text: "Per-tenant collections versus filters" },
    {
      type: "p",
      text: "Qdrant's [multitenancy guidance](https://qdrant.tech/documentation/guides/multiple-partitions/) recommends a single collection partitioned by a payload field for most cases, and reserves separate collections for a limited number of tenants that need strict isolation. From version 1.11 you can mark the tenant field with `is_tenant` so each tenant's vectors are stored together:",
    },
    {
      type: "code",
      lang: "http",
      code: `PUT /collections/knowledge_base/index
{
  "field_name": "tenant_id",
  "field_schema": {
    "type": "keyword",
    "is_tenant": true
  }
}`,
    },
    {
      type: "table",
      head: ["Approach", "Strengths", "Weaknesses"],
      rows: [
        [
          "One collection, payload filter",
          "Scales to many tenants; one schema; efficient with a tenant index",
          "Isolation depends on every query carrying the filter; one bug leaks across tenants",
        ],
        [
          "Collection per tenant",
          "Hard boundary; easy per-tenant deletion and export; scoped keys per collection",
          "Operational overhead; does not scale to thousands of small tenants",
        ],
        [
          "Hybrid",
          "Collections for regulated or high-value tenants, filters for the long tail",
          "Two code paths to test and keep consistent",
        ],
      ],
    },
    {
      type: "p",
      text: "Whichever you choose, the filter still matters inside a tenant: department, role and document-level permissions are rarely uniform within one customer.",
    },
    { type: "h2", text: "Embeddings are not anonymised data" },
    {
      type: "p",
      text: "A common assumption is that vectors are a one-way hash of the text and therefore safe to share, log or hand to a third party. Research says otherwise. Morris and colleagues' EMNLP 2023 paper \"Text Embeddings Reveal (Almost) As Much As Text\" showed an iterative inversion method recovering 92% of 32-token inputs exactly from their embeddings, and recovering full names from a dataset of clinical notes. OWASP LLM08 lists embedding inversion for the same reason.",
    },
    {
      type: "ul",
      items: [
        "Protect vector stores, snapshots and backups to the same standard as the source documents.",
        "Do not send embeddings to analytics, logging or third-party tools on the assumption they are opaque.",
        "Decide before embedding whether a document should be in the index at all. Redact or exclude PII and secrets that no answer will ever need.",
        "Remember that sending text to a hosted embedding API is itself a data transfer; check it against your data-processing agreements.",
      ],
    },
    { type: "h2", text: "Hardening the vector database itself" },
    {
      type: "p",
      text: "Vector databases are databases, and they get exposed like databases. Qdrant's [security documentation](https://qdrant.tech/documentation/security/) is explicit that a self-hosted open-source deployment accepts requests from anyone who can reach it by default, and that connections are unencrypted by default. Qdrant Cloud enables authentication by default; self-hosted instances need it configured.",
    },
    {
      type: "ul",
      items: [
        "**Set an API key** with `service.api_key` (or `QDRANT__SERVICE__API_KEY`), and give query services a separate `service.read_only_api_key` so a compromised chatbot cannot write or delete points.",
        "**Use granular access tokens** with `service.jwt_rbac` when different services should reach different collections.",
        "**Enable TLS** with `service.enable_tls` and certificate paths, including peer-to-peer TLS in a cluster.",
        "**Keep it off the public internet.** Bind to a private network and allow only the application servers through the firewall. Authentication is a second layer, not a substitute.",
        "**Treat keys as secrets.** Keep them in a secret manager, out of front-end bundles and notebooks, and rotate them when people leave.",
        "**Protect snapshots.** A snapshot is the whole index, payloads included.",
      ],
    },
    { type: "h2", text: "Output: citations that cannot be spoofed" },
    {
      type: "p",
      text: "Citations are a security control as much as a usability feature: they make leaks visible and they let users check claims. They only work if they are real. A model can invent a plausible document title, or an injected chunk can instruct it to cite an authoritative-sounding source.",
    },
    {
      type: "ol",
      items: [
        "Give each retrieved chunk a short opaque ID in the context and require the model to cite by ID.",
        "Validate after generation that every cited ID was in the retrieved set for this request. Drop or flag answers that cite anything else.",
        "Render the citation's title and link from your own payload metadata, never from the model's text.",
        "If no retrieved chunk supports the answer, return a refusal rather than an ungrounded reply.",
      ],
    },
    {
      type: "p",
      text: "When I (Sheikh Mujtaba) built a spec-driven documentation platform with a Qdrant-powered RAG chatbot behind a FastAPI service, strict context grounding was the design constraint that shaped everything else: the assistant answers from retrieved documentation or says it cannot. That constraint turned out to be a security property too, because an answer that must be traceable to a retrieved chunk is far easier to audit than free-form generation. The same principle sits at the centre of [LLM guardrails](/blog/llm-guardrails) more generally.",
    },
    { type: "h2", text: "Deletion and the right to be forgotten" },
    {
      type: "p",
      text: "Deleting a source document does not delete its chunks, and deleting chunks does not delete them from snapshots, caches or conversation logs. A secure RAG pipeline needs a deletion path that is as deliberate as its ingestion path.",
    },
    {
      type: "code",
      lang: "python",
      code: `def forget_document(client, source_doc_id: str):
    # Every chunk carries its source document ID in the payload,
    # so one filter removes all of them.
    client.delete(
        collection_name="knowledge_base",
        points_selector=models.FilterSelector(
            filter=models.Filter(
                must=[
                    models.FieldCondition(
                        key="source_doc_id",
                        match=models.MatchValue(value=source_doc_id),
                    )
                ]
            )
        ),
    )
    # Then: purge answer caches, schedule snapshot rotation,
    # and record the deletion in the audit log.`,
    },
    {
      type: "ul",
      items: [
        "Store `source_doc_id` on every chunk so a document can be removed in one operation.",
        "Subscribe to deletions and permission changes in the source system, not just creations and edits.",
        "Expire semantic caches and stored answers that were built from the deleted content.",
        "Define how long snapshots and logs are retained, and make that consistent with your privacy commitments.",
      ],
    },
    {
      type: "callout",
      title: "Test it like any other access-control system",
      text: "Cross-tenant queries, revoked-permission queries, planted injection documents and deleted-document queries all belong in an automated suite that runs on every pipeline change. If you want a second pair of eyes on a retrieval system before launch, that is part of the [AI security work I offer](/services), and the [AI red teaming](/blog/ai-red-teaming) post describes the testing method.",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "Treat RAG as a data pipeline with seven stages, each with its own threat and control.",
        "Enforce entitlements inside the vector query with payload filters built from the server-side session.",
        "Record provenance on every chunk so poisoned or deleted content can be found and removed.",
        "Assume retrieved text can carry instructions; keep tools and secrets out of the answering call.",
        "Embeddings can be inverted, so protect vectors and snapshots like the source text.",
        "Authenticate, encrypt and network-isolate the vector database; self-hosted defaults are open.",
        "Validate citations against retrieved IDs and refuse when nothing supports the answer.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is RAG security?",
      answer:
        "RAG security is the practice of protecting a retrieval-augmented generation pipeline at every stage: what gets ingested, how it is chunked and embedded, who can access the vector database, which chunks each user can retrieve, how retrieved text is placed in the prompt, and what the model is allowed to output. It maps mainly to OWASP LLM08 Vector and Embedding Weaknesses, with overlap into prompt injection and sensitive information disclosure.",
    },
    {
      question: "How do I stop a RAG chatbot leaking documents between users or tenants?",
      answer:
        "Store tenant and permission metadata on every chunk at ingestion, then apply the caller's entitlements as a filter inside the vector search, built from the authenticated session rather than the request or the model. Use separate collections for tenants that need hard isolation, test cross-tenant queries automatically, and log the returned document IDs for every retrieval.",
    },
    {
      question: "Are embeddings safe to share because they are just numbers?",
      answer:
        "No. Published research, notably the EMNLP 2023 paper \"Text Embeddings Reveal (Almost) As Much As Text\", has shown that a large share of short source texts can be reconstructed from their embeddings. Treat vectors, snapshots and backups with the same sensitivity as the documents they were made from.",
    },
    {
      question: "Is Qdrant secure by default?",
      answer:
        "Qdrant Cloud enables authentication by default, but a self-hosted open-source deployment accepts requests from anyone who can reach it and uses unencrypted connections until you configure otherwise. Set an API key, use a read-only key for query services, enable TLS, and keep the instance on a private network.",
    },
    {
      question: "Can sanitising retrieved content prevent prompt injection in RAG?",
      answer:
        "It reduces it but cannot prevent it. Stripping hidden text and delimiting retrieved context lowers the success rate, but the model still cannot reliably separate instructions from data. Contain the impact instead: no tools or secrets in the answering call, validated citations, and output filtering for exfiltration channels such as auto-loading images.",
    },
  ],
};
