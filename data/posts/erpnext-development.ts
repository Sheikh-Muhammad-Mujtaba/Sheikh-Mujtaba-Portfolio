import type { BlogPost } from "../../utils/blog-types";

export const erpnextDevelopment: BlogPost = {
  slug: "erpnext-development",
  title:
    "ERPNext Development: Custom Apps, Workflows & Integrations That Survive Upgrades",
  heading: "ERPNext Development That Survives Upgrades",
  description:
    "A practical ERPNext development guide: when to customise versus build a custom app, how to design DocTypes and document hooks, integration patterns that hold up in production, and the upgrade-safe practices that keep a Frappe deployment maintainable.",
  focusKeyword: "ERPNext development",
  keywords: [
    "ERPNext development",
    "ERPNext customization",
    "Frappe framework",
    "ERPNext custom app",
    "ERPNext DocType",
    "ERPNext API integration",
    "ERPNext automation",
    "ERPNext implementation",
    "Frappe server script",
    "hire ERPNext developer",
  ],
  published: "2026-02-10",
  updated: "2026-09-18",
  readingMinutes: 12,
  excerpt:
    "Most ERPNext projects fail at the second upgrade, not the first deployment. Here is the architecture that keeps customisation, automation and integrations maintainable.",
  related: ["ai-integration-in-business-workflows", "agentic-ai-development"],
  blocks: [
    {
      type: "p",
      text: "ERPNext is the rare open-source ERP that a small team can genuinely deploy, extend and own. That same flexibility is why so many implementations rot: a year of ad-hoc customisation through the UI, a pile of undocumented server scripts, and an upgrade path nobody wants to touch. This guide covers the **ERPNext development** decisions that determine whether your deployment is an asset or a liability eighteen months in.",
    },
    {
      type: "callout",
      title: "The one rule that matters",
      text: "Every change you make should live in a versioned custom app in git. If a customisation exists only in the production database, it is not a customisation — it is technical debt with a countdown timer.",
    },
    { type: "h2", text: "Customise, extend, or build a custom app?" },
    {
      type: "p",
      text: "ERPNext gives you four escalating levels of change. Picking the lowest level that actually solves the problem is the highest-leverage habit in Frappe work.",
    },
    {
      type: "table",
      head: ["Level", "Use it for", "Upgrade risk"],
      rows: [
        [
          "Customize Form / Custom Field",
          "Adding fields, reordering, hiding, relabelling on stock DocTypes",
          "Low — stored as Custom Field and Property Setter records",
        ],
        [
          "Client Script / Server Script",
          "Validation, derived values, small workflow rules",
          "Medium — silent breakage when core fields change",
        ],
        [
          "Custom app (new DocTypes + hooks)",
          "New business objects, integrations, scheduled jobs, overrides",
          "Low — versioned, testable, reviewable",
        ],
        ["Core patch or monkey patch", "Almost never", "High — you now maintain a fork"],
      ],
    },
    {
      type: "p",
      text: "The practical split: fields and layout through Customize Form, because they export cleanly with `bench export-fixtures`, and everything with logic in a custom app. Server Scripts are convenient for a quick rule, but they are database rows — invisible to code review, untestable in CI, and the first thing to break on a major version upgrade.",
    },
    { type: "h2", text: "Scaffolding a custom app the right way" },
    {
      type: "p",
      text: "A custom app is a normal Python package with a Frappe manifest. Create it once, commit it, and install it into the site rather than editing anything inside `apps/erpnext`.",
    },
    {
      type: "code",
      lang: "bash",
      code: `# Create and install a versioned custom app
bench new-app acme_ops
bench --site erp.acme.local install-app acme_ops

# Track fixtures so field-level customisation lives in git too
bench --site erp.acme.local export-fixtures

# Run the suite before every deploy
bench --site erp.acme.local run-tests --app acme_ops`,
    },
    {
      type: "p",
      text: "In `hooks.py`, declare the fixtures you want exported so Custom Fields and Property Setters travel with the code instead of being re-applied by hand on staging:",
    },
    {
      type: "code",
      lang: "python",
      code: `# acme_ops/hooks.py
app_name = "acme_ops"

fixtures = [
    {"dt": "Custom Field", "filters": [["module", "=", "Acme Ops"]]},
    {"dt": "Property Setter", "filters": [["module", "=", "Acme Ops"]]},
    {"dt": "Workflow", "filters": [["name", "in", ["Purchase Approval"]]]},
]

doc_events = {
    "Sales Order": {
        "validate": "acme_ops.sales.hooks.validate_credit_limit",
        "on_submit": "acme_ops.sales.hooks.enqueue_fulfilment",
    }
}

scheduler_events = {
    "cron": {
        "*/15 * * * *": ["acme_ops.integrations.shipping.poll_tracking_updates"],
    }
}`,
    },
    { type: "h2", text: "Designing DocTypes that do not fight the framework" },
    {
      type: "p",
      text: "A DocType is a table, a form, a permission surface and a REST endpoint at once. That leverage cuts both ways — sloppy DocType design shows up as unusable list views and impossible reports six months later.",
    },
    {
      type: "ul",
      items: [
        "**Name documents deliberately.** Use a naming series for anything a human quotes back to you (`ACME-SO-.YYYY.-.####`), and hash naming for machine-generated rows nobody reads.",
        "**Index the fields you filter on.** Frappe will happily let you build a list view that table-scans a million rows. Set `search_fields` and index the links you filter by.",
        "**Prefer Link fields over free text.** Links give you referential integrity, dashboards and filters for free; a text field gives you a typo problem.",
        "**Keep child tables small.** A child table with forty columns and thousands of rows per parent makes the form unusable — model it as its own DocType with a Link back.",
        "**Use `is_submittable` only for real lifecycles.** Submit and cancel add amended-from bookkeeping you do not want on a lookup table.",
      ],
    },
    { type: "h2", text: "Server-side logic: hooks, overrides and background jobs" },
    {
      type: "p",
      text: "Frappe gives you document events (`validate`, `before_save`, `on_submit`, `on_cancel`) and class overrides. Use events for cross-cutting rules, and overrides when you need to change how a core DocType behaves end to end.",
    },
    {
      type: "code",
      lang: "python",
      code: `# acme_ops/sales/hooks.py
import frappe
from frappe import _
from frappe.utils import flt


def validate_credit_limit(doc, method=None):
    """Block submission when a customer is over their approved credit line."""
    limit = flt(frappe.db.get_value("Customer", doc.customer, "credit_limit"))
    if not limit:
        return

    outstanding = flt(
        frappe.db.get_value(
            "Sales Invoice",
            {"customer": doc.customer, "docstatus": 1},
            "sum(outstanding_amount)",
        )
    )

    if outstanding + flt(doc.grand_total) > limit:
        frappe.throw(
            _("Customer {0} would exceed their credit limit of {1}.").format(
                doc.customer,
                frappe.format_value(limit, {"fieldtype": "Currency"}),
            ),
            title=_("Credit limit exceeded"),
        )


def enqueue_fulfilment(doc, method=None):
    """Never call an external API inline from a document event."""
    frappe.enqueue(
        "acme_ops.integrations.wms.push_order",
        queue="short",
        job_name=f"wms-push-{doc.name}",
        sales_order=doc.name,
        enqueue_after_commit=True,
    )`,
    },
    {
      type: "callout",
      title: "Never block a save on a third party",
      text: "Any HTTP call inside `validate` or `on_submit` turns someone else's outage into your outage — users see a spinning save button and a timeout. Enqueue the work with `enqueue_after_commit=True` so the job only runs if the transaction actually committed.",
    },
    { type: "h2", text: "Integration patterns that hold up in production" },
    {
      type: "p",
      text: "Most ERPNext projects are really integration projects: a payment gateway, a shipping provider, a webstore, a CRM, a bank feed. Four patterns cover almost everything.",
    },
    {
      type: "ol",
      items: [
        "**Outbound push on document events.** Queue a background job from `on_submit` and record the result on the document, so failures are visible in the UI rather than only in the logs.",
        "**Inbound webhook into a staging DocType.** Never let an external system write straight into `Sales Order`. Land the raw payload in an integration-event DocType, validate it, then create the real document. You get replay, audit and idempotency for free.",
        "**Scheduled reconciliation.** Every push-based integration drifts. A nightly job that compares counts and re-syncs mismatches is worth more than any amount of retry logic.",
        "**Idempotency keys on everything.** Store the external reference on the ERPNext document and check it before creating. Webhooks get delivered twice; assume it.",
      ],
    },
    {
      type: "code",
      lang: "python",
      code: `# acme_ops/integrations/webstore.py
import frappe


@frappe.whitelist(allow_guest=True)
def order_webhook():
    """Land the payload first, process it second."""
    payload = frappe.request.get_json()
    external_id = payload.get("order_id")

    if frappe.db.exists("Webstore Order Event", {"external_id": external_id}):
        return {"status": "duplicate"}  # idempotent by construction

    event = frappe.get_doc(
        {
            "doctype": "Webstore Order Event",
            "external_id": external_id,
            "payload": frappe.as_json(payload),
            "status": "Queued",
        }
    ).insert(ignore_permissions=True)

    frappe.enqueue(
        "acme_ops.integrations.webstore.create_sales_order",
        queue="default",
        event=event.name,
        enqueue_after_commit=True,
    )
    return {"status": "accepted", "event": event.name}`,
    },
    { type: "h2", text: "Permissions, roles and the audit question" },
    {
      type: "p",
      text: "ERPNext permissions are layered: role permissions, user permissions, permission query conditions and field-level read-only. Getting them wrong is the most common way a compliant-looking deployment fails an actual audit.",
    },
    {
      type: "ul",
      items: [
        "Model roles on job function, not on individuals. `Warehouse Supervisor`, not a person's name.",
        "Use User Permissions to scope a role to a company, warehouse or territory rather than cloning roles per branch.",
        "Add a permission query condition in your custom app when the rule is dynamic — owner is the current user, or territory is in an assigned list.",
        "Enable version tracking on high-value DocTypes; `Version` rows are your change audit trail.",
        "Review `System Manager` membership quarterly. It is effectively root, and it accumulates.",
      ],
    },
    { type: "h2", text: "Performance: the four things that actually go wrong" },
    {
      type: "ol",
      items: [
        "**N+1 queries in custom code.** `frappe.get_doc` inside a loop over thousands of rows takes minutes. Use `frappe.get_all` with only the fields you need.",
        "**Unbounded list and report views.** A report view with no filters on a multi-million-row table will lock up a worker. Set default filters and add indexes.",
        "**Synchronous email and print.** Generating hundreds of PDFs inline will time out. Queue them.",
        "**Background queue starvation.** One long job on the `default` queue blocks everything behind it. Split work across `short`, `default` and `long` deliberately, and scale workers per queue.",
      ],
    },
    {
      type: "code",
      lang: "python",
      code: `# Slow: one query and one document load per row
total = 0
for name in order_names:
    doc = frappe.get_doc("Sales Order", name)
    total += doc.grand_total

# Fast: one query, only the columns you need
rows = frappe.get_all(
    "Sales Order",
    filters={"name": ["in", order_names]},
    fields=["name", "grand_total"],
)
total = sum(r.grand_total for r in rows)`,
    },
    { type: "h2", text: "A deployment pipeline you can trust" },
    {
      type: "p",
      text: "The difference between a hobby instance and a production ERP is whether you can rebuild it from scratch. Aim for a git repo per custom app, an environment-per-branch bench, migrations run by CI, and a restore drill you have actually performed.",
    },
    {
      type: "code",
      lang: "bash",
      code: `# Staging deploy, scripted
bench get-app acme_ops https://git.acme.dev/erp/acme_ops --branch release
bench --site staging.acme.local migrate
bench --site staging.acme.local run-tests --app acme_ops
bench restart

# Backups that include files, verified by a monthly restore drill
bench --site erp.acme.local backup --with-files`,
    },
    {
      type: "callout",
      title: "Where AI fits, and where it does not",
      text: "ERPNext is a system of record, and systems of record want determinism. Put AI at the edges: document extraction on inbound invoices, natural-language search over your own data, drafted replies, anomaly flags on purchase patterns. Keep posting rules, tax logic and approvals as plain code. [AI integration in business workflows](/blog/ai-integration-in-business-workflows) covers where that line belongs in more detail.",
    },
    { type: "h2", text: "A realistic implementation sequence" },
    {
      type: "ol",
      items: [
        "**Weeks 1–2 — Model the business, not the software.** Chart of accounts, item taxonomy, warehouses, tax templates, naming series. Most failed rollouts are bad masters, not bad code.",
        "**Weeks 3–4 — Stock configuration and a pilot department.** One real workflow, end to end, with real data.",
        "**Weeks 5–7 — Custom app.** DocTypes, hooks, print formats, reports — in git from day one.",
        "**Weeks 8–9 — Integrations.** Staging DocTypes, background jobs, reconciliation schedules.",
        "**Week 10 — Migration rehearsal.** Full data load into staging, timed, with a rollback plan.",
        "**Weeks 11–12 — Cutover and hypercare.** Freeze customisation, staff a support rota, fix in git only.",
      ],
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "Customisation that is not in git does not exist — treat the database as disposable.",
        "Fields and layout via Customize Form plus fixtures; logic via a custom app.",
        "Never call an external service inline from a document event; enqueue it.",
        "Land webhooks in a staging DocType and make every integration idempotent.",
        "Design DocTypes for the queries you will run, not only the forms you will fill.",
        "Rehearse the upgrade and the restore before you need either.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is ERPNext customisation upgrade-safe?",
      answer:
        "It is, if you keep customisation in a versioned custom app and export field-level changes as fixtures. Custom Fields and Property Setters survive upgrades cleanly. What breaks is undocumented Server Scripts and any change made directly inside the erpnext or frappe apps — those turn every upgrade into a manual merge.",
    },
    {
      question: "When should I build a custom app instead of using Server Scripts?",
      answer:
        "As soon as the logic has branches, touches more than one DocType, calls an external service, or needs a test. Server Scripts are database rows: they cannot be code-reviewed, unit-tested or deployed atomically with the rest of a release. Use them for a one-line validation and nothing more.",
    },
    {
      question: "How long does a typical ERPNext implementation take?",
      answer:
        "For a single-company deployment with two or three integrations, ten to fourteen weeks is realistic: two weeks of data modelling, four of configuration and custom app work, two of integration, and the rest for migration rehearsal, cutover and hypercare. Multi-company or multi-currency rollouts add four to six weeks.",
    },
    {
      question: "Can ERPNext handle custom manufacturing or industry-specific workflows?",
      answer:
        "Yes — that is what the Frappe framework is for. New business objects become DocTypes in your custom app, approvals become Workflows, and industry rules become document event hooks. The constraint is discipline, not capability: model new objects properly instead of overloading stock DocTypes with twenty custom fields.",
    },
    {
      question: "What is the most common cause of slow ERPNext instances?",
      answer:
        "N+1 query patterns in custom code and unbounded list or report views. Loading a full document inside a loop is the classic mistake; replacing it with a single frappe.get_all call that selects only the needed columns usually turns minutes into milliseconds. After that, look at background queue configuration and missing indexes on filtered fields.",
    },
  ],
};
