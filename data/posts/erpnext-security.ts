import type { BlogPost } from "../../utils/blog-types";

export const erpnextSecurity: BlogPost = {
  slug: "erpnext-security",
  title: "ERPNext Security: A Hardening Checklist for Frappe",
  heading: "ERPNext Security Hardening Checklist",
  description:
    "A practical ERPNext security checklist for self-hosted Frappe deployments: patching, roles and permission levels, 2FA and password policy, API key hygiene, safe whitelisted methods, server hardening, encrypted backups, file uploads, audit trails and Server Script risk.",
  focusKeyword: "ERPNext security",
  keywords: [
    "ERPNext security",
    "Frappe security",
    "ERPNext hardening",
    "secure ERPNext deployment",
    "ERPNext permissions",
    "Frappe whitelist allow_guest",
    "ERPNext two factor authentication",
    "ERPNext backup encryption",
    "Frappe server script security",
    "self-hosted ERPNext",
  ],
  published: "2026-10-12",
  updated: "2026-10-12",
  readingMinutes: 9,
  excerpt:
    "An ERP holds your money, your customers and your payroll. Here is the hardening checklist I work through on self-hosted ERPNext, from permission levels to Redis ports.",
  related: ["erpnext-development", "ai-security-engineer", "ai-integration-in-business-workflows"],
  blocks: [
    {
      type: "p",
      text: "**ERPNext security** gets less attention than it deserves because the framework ships with sensible defaults and a mature permission system, so teams assume the job is done. It is not. A self-hosted ERPNext site is a web application, a Python runtime, a MariaDB database, several Redis instances and a Linux server, and the weakest of those decides how safe your ledgers, payroll and customer data are. This checklist covers what I check, in the order I check it.",
    },
    {
      type: "callout",
      title: "Two questions that find most problems",
      text: "Who can reach this server, and who can run code on it? Exposed database and Redis ports, shared System Manager accounts, guest-accessible whitelisted methods and enabled Server Scripts all answer one of those questions badly.",
    },
    { type: "h2", text: "The hardening checklist at a glance" },
    {
      type: "table",
      head: ["Area", "Check", "Why"],
      rows: [
        [
          "Patching",
          "Frappe, ERPNext and custom apps on a supported, current release; security advisories watched",
          "Most real compromises use known, already-fixed bugs",
        ],
        [
          "Roles",
          "Roles by job function; System Manager limited to a named few",
          "System Manager is effectively root inside the application",
        ],
        [
          "Data scope",
          "User Permissions and permission levels applied to sensitive DocTypes and fields",
          "Role permissions alone grant every record of a DocType",
        ],
        [
          "Login",
          "Two-factor auth, password policy, lockout and session expiry set in System Settings",
          "Credential stuffing and phishing are the cheapest attacks",
        ],
        [
          "API access",
          "Keys on dedicated integration users with minimal roles; rotated and revoked",
          "An API key acts with the full rights of its user",
        ],
        [
          "Custom code",
          "Every whitelisted method checks permissions; guest methods reviewed and rate-limited",
          "Whitelisting only exposes a function; it does not authorise the caller",
        ],
        [
          "Server Scripts",
          "Left disabled unless needed; changes reviewed",
          "Anyone who can edit them can run server-side code",
        ],
        [
          "Server",
          "Only 80, 443 and SSH open; Redis and MariaDB on localhost; TLS; fail2ban",
          "Exposed Redis or MariaDB bypasses every application control",
        ],
        [
          "Backups",
          "Encrypted, off-server, restore-tested; keys from `site_config.json` stored separately",
          "Without the keys, encrypted backups and stored passwords cannot be recovered",
        ],
        [
          "Files",
          "Allowed extensions and size limits set; private by default; guest uploads off",
          "Upload features are a classic route to malware and data exposure",
        ],
        [
          "Audit",
          "Track Changes on high-value DocTypes; Access and Activity logs reviewed",
          "You cannot investigate what you did not record",
        ],
      ],
    },
    { type: "h2", text: "1. Patch the framework, the apps and the bench" },
    {
      type: "p",
      text: "Frappe and ERPNext move quickly, and security fixes land in point releases. The Frappe team publishes advisories on the [Frappe GitHub security page](https://github.com/frappe/frappe/security/advisories); someone on your team should be watching it. Stay on a supported major version, apply minor updates on a schedule rather than \"when something breaks\", and remember that custom and third-party apps need the same discipline. Rehearse every update on a staging copy first, as described in the [ERPNext development](/blog/erpnext-development) guide, so patching is routine rather than a risk.",
    },
    { type: "h2", text: "2. Roles, User Permissions and permission levels" },
    {
      type: "p",
      text: "Frappe's permission model has three layers, and most deployments only use the first. The [users and permissions documentation](https://docs.frappe.io/framework/user/en/basics/users-and-permissions) covers each in detail.",
    },
    {
      type: "ul",
      items: [
        "**Role permissions**, managed in the Role Permissions Manager, decide which DocTypes a role can read, write, create, submit, cancel, amend, export or print. Grant `Export` and `Print` deliberately; they are the easiest way to take data out in bulk.",
        "**User Permissions** restrict which records a user sees, based on a Link field value: a company, a branch, a warehouse, a territory. Without them, a role that can read Sales Invoice can read every Sales Invoice.",
        "**Permission levels** group fields so that, for example, salary or margin fields sit at a higher level that only some roles can read or write. Use them for the handful of fields that are sensitive on otherwise ordinary forms.",
        "**\"If the user is owner\"** limits a rule to documents the user created, which is useful for self-service forms.",
      ],
    },
    {
      type: "p",
      text: "Then deal with the powerful accounts. `Administrator` should not be anyone's daily login, and its password should be long, unique and stored in a password manager. Membership of `System Manager` should be a short, named list reviewed every quarter, because it accumulates quietly: one consultant during go-live, one manager who needed a report, one integration that \"just needed access\". The **Restrict IP** field on the User record can pin high-privilege accounts to office or VPN addresses.",
    },
    { type: "h2", text: "3. Login: 2FA, password policy and lockout" },
    {
      type: "p",
      text: "System Settings holds the login controls, and they are worth ten minutes of anyone's time:",
    },
    {
      type: "ul",
      items: [
        "**Enable Two Factor Auth** and choose the method; an OTP app is stronger than SMS or email. Be careful with the bypass options for restricted-IP users, which trade security for convenience.",
        "**Enable Password Policy** with a sensible **Minimum Password Score**, and use **Force User to Reset Password** if you want periodic rotation.",
        "**Allow Consecutive Login Attempts** and **Allow Login After Fail** together give you an account lockout. Set them, rather than relying on nginx alone.",
        "**Session Expiry** controls the idle timeout. ERP sessions on shared warehouse or front-desk machines should not last for days.",
        "**Logout All Sessions on Password Reset** should be on, so a reset actually evicts an attacker.",
      ],
    },
    { type: "h2", text: "4. API keys and integration users" },
    {
      type: "p",
      text: "Frappe's [REST API](https://docs.frappe.io/framework/user/en/api/rest) authenticates with an `Authorization: token api_key:api_secret` header, using keys generated from a User record. The secret is shown once. The important point is that the key carries every right its user has, so the user matters more than the key.",
    },
    {
      type: "ul",
      items: [
        "Create a dedicated user per integration with a purpose-built role that grants only the DocTypes and actions it needs. Never generate keys on an Administrator or System Manager account.",
        "Keep secrets in the integration's secret store, not in scripts, spreadsheets, browser extensions or chat history.",
        "Regenerate keys when a vendor or staff member with access leaves, and disable the user entirely when the integration is retired.",
        "Turn on **Log API Requests** in System Settings where your version supports it, so you can see what each integration actually calls.",
      ],
    },
    { type: "h2", text: "5. Whitelisted methods and guest access in custom apps" },
    {
      type: "p",
      text: "This is where I find the most serious issues in custom apps. The `@frappe.whitelist()` decorator makes a Python function callable over HTTP at `/api/method/...`. It checks that the caller is logged in. It does **not** check whether that user may read or change the records the function touches. Adding `allow_guest=True` removes even the login requirement, so the function is callable by anyone on the internet.",
    },
    {
      type: "p",
      text: "Two framework details make this worse in practice. `frappe.get_all` ignores permissions by design, whereas `frappe.get_list` applies them, so a whitelisted function that uses `get_all` returns data regardless of the caller's role. And `ignore_permissions=True` on an insert or save inside a whitelisted method turns the endpoint into a privilege bypass. A properly checked method looks like this:",
    },
    {
      type: "code",
      lang: "python",
      code: `import frappe
from frappe import _
from frappe.rate_limiter import rate_limit


@frappe.whitelist(methods=["POST"])
def approve_vendor_payout(name: str, remarks: str | None = None):
    # 1. Role gate: raises PermissionError if the caller lacks the role.
    frappe.only_for("Payout Approver")

    # 2. Record-level check: role permissions, User Permissions and
    #    sharing are all evaluated for this specific document.
    doc = frappe.get_doc("Vendor Payout", name)
    doc.check_permission("write")

    # 3. Business rule checks on server-side state, never on client input.
    if doc.docstatus != 0 or doc.status != "Pending Approval":
        frappe.throw(_("Only pending payouts can be approved."))

    doc.status = "Approved"
    doc.approval_remarks = remarks
    doc.save()  # no ignore_permissions
    return {"name": doc.name, "status": doc.status}


@frappe.whitelist(allow_guest=True, methods=["POST"])
@rate_limit(limit=5, seconds=60 * 60)
def submit_enquiry(email: str, message: str):
    # Guest endpoints do one narrow thing, validate everything,
    # and return nothing about existing records.
    frappe.utils.validate_email_address(email, throw=True)
    frappe.get_doc({
        "doctype": "Website Enquiry",
        "email": email,
        "message": message[:2000],
    }).insert(ignore_permissions=True)  # deliberate, reviewed, single DocType
    return {"ok": True}`,
    },
    {
      type: "ul",
      items: [
        "Restrict HTTP methods with `methods=[\"POST\"]` on anything that changes state.",
        "Grep every custom app for `allow_guest=True`, `ignore_permissions=True` and `frappe.get_all` inside whitelisted functions, and justify each one in code review.",
        "Use `frappe.has_permission(..., throw=True)` or `doc.check_permission()` rather than hand-rolled role checks.",
        "Rate-limit guest endpoints with Frappe's `rate_limit` decorator.",
      ],
    },
    { type: "h2", text: "6. Server Scripts and other code in the database" },
    {
      type: "p",
      text: "Server Scripts let users write Python in the browser that runs on the server. Frappe runs them in a restricted environment, but they still execute with access to your data, and anyone with rights to edit them can change business logic without a deploy, review or git history. From version 15, the [Server Script documentation](https://docs.frappe.io/framework/user/en/desk/scripting/server-script) states they are disabled by default and enabled with `bench set-config -g server_script_enabled true`. Leave them off unless you have a reason, and when you do enable them, limit who can create or edit Server Script and Client Script records and move stable logic into a versioned custom app.",
    },
    { type: "h2", text: "7. Server hardening: the bench, nginx, Redis and MariaDB" },
    {
      type: "p",
      text: "When I (Sheikh Mujtaba) harden a Frappe server, I start from the same place as on any web host I have cleaned up after a compromise: assume the application will eventually have a bug, and make sure that bug cannot reach the rest of the machine. My work on backdoor removal, hosting hardening and obfuscated PHP malware analysis taught me that attackers look for writable directories that are also served, credentials sitting in config files, and internal services listening on public interfaces. ERPNext servers have all three to think about.",
    },
    {
      type: "ul",
      items: [
        "**Run the bench as a dedicated non-root user.** Use `bench setup sudoers` for the narrow sudo rights it needs rather than broad root access.",
        "**Use production mode** (`bench setup production`) so nginx and supervisor or systemd manage processes, not `bench start`.",
        "**Serve only HTTPS.** `bench setup lets-encrypt <site>` issues and installs a certificate; redirect HTTP to HTTPS.",
        "**Close every port except web and SSH.** `bench setup firewall` blocks all ports except 80, 443 and your SSH port. MariaDB (3306) and the bench Redis instances (by default 11000 and 13000) must listen on localhost or a private network only. An exposed Redis instance can be used to tamper with queues and cache; an exposed MariaDB is the whole ERP.",
        "**Add brute-force protection** with `bench setup fail2ban`, and use key-only SSH.",
        "**Keep secrets readable only by the bench user.** `site_config.json` holds the database password, the `encryption_key` and, if backups are encrypted, the `backup_encryption_key`; it should never be world-readable or committed to git.",
        "**Never serve executable content from file directories.** Public files are served directly by nginx; confirm nothing under them can be executed and watch for unexpected file types.",
      ],
    },
    { type: "h2", text: "8. Backups and the encryption key" },
    {
      type: "p",
      text: "Frappe encrypts stored passwords (such as Password fields and integration credentials) with the `encryption_key` in the site's `site_config.json`. If you restore a database without the matching key, those values cannot be decrypted. [Backup encryption](https://docs.frappe.io/framework/user/en/guides/basics/how-to-enable-backup-encryption), switched on with **Encrypt Backups** in System Settings, uses a separate `backup_encryption_key` that Frappe generates and stores in the same `site_config.json`; a System Manager can also retrieve it from the Download Backups page.",
    },
    {
      type: "ol",
      items: [
        "Back up with files (`bench --site <site> backup --with-files`) and copy backups off the server.",
        "Store both `encryption_key` and `backup_encryption_key` separately from the backups, in a password manager or secret store. A backup that sits next to its key is not encrypted in any meaningful sense.",
        "Perform a restore drill on a clean server. Untested backups are a hope, not a control.",
        "Limit who can download backups from the desk; that page is effectively a full data export.",
      ],
    },
    { type: "h2", text: "9. File uploads" },
    {
      type: "ul",
      items: [
        "Set **Allowed File Extensions** and **Max File Size** in System Settings to what the business actually uses.",
        "Keep **Allow Guests to Upload Files** off unless a web form genuinely needs it.",
        "Make attachments private by default; public files are reachable by anyone with the URL.",
        "Scan uploaded files on the server if your users exchange documents with outside parties.",
      ],
    },
    { type: "h2", text: "10. Audit trails and monitoring" },
    {
      type: "p",
      text: "Enable **Track Changes** on DocTypes that hold money, prices, bank details or approvals, so every edit produces a Version record showing who changed what. Review the Activity Log and Access Log for unusual logins, exports and report access. Ship nginx and application logs off the server, because an attacker with shell access will edit local logs first. Alerts on new System Manager assignments, new API keys and bulk exports catch most of the activity that matters.",
    },
    {
      type: "callout",
      title: "Where AI integrations change the picture",
      text: "Connecting an LLM or agent to ERPNext adds a new caller with API keys and a new route for injected instructions. Give it its own least-privilege user, and read [AI integration in business workflows](/blog/ai-integration-in-business-workflows) and [AI agent security](/blog/ai-agent-security) before it touches anything that posts or pays. If you want this checklist applied to your own deployment, that is part of the [services I offer](/services).",
    },
    { type: "h2", text: "Key takeaways" },
    {
      type: "ul",
      items: [
        "Patch Frappe, ERPNext and custom apps on a schedule, and watch the Frappe security advisories.",
        "Use User Permissions and permission levels, not just role permissions, and keep System Manager to a named few.",
        "Turn on 2FA, password policy, lockout and sensible session expiry in System Settings.",
        "Whitelisting exposes a function; it never authorises the caller. Check permissions in every whitelisted method.",
        "Leave Server Scripts disabled unless needed, and move stable logic into a versioned custom app.",
        "Keep MariaDB and Redis off the internet, serve only HTTPS, and run the bench as a non-root user.",
        "Encrypt and test backups, and store the encryption key away from them.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is ERPNext secure out of the box?",
      answer:
        "The framework has a solid permission model and reasonable defaults, but a self-hosted deployment is only as secure as its configuration and server. Two-factor authentication, password policy, User Permissions, firewalling of MariaDB and Redis, TLS and encrypted off-server backups all need to be set up deliberately.",
    },
    {
      question: "What is the risk of frappe.whitelist(allow_guest=True)?",
      answer:
        "It makes the function callable over HTTP by anyone, without logging in. Combined with frappe.get_all or ignore_permissions=True, it can expose or modify data with no authentication at all. Guest methods should do one narrow thing, validate all input, return nothing about existing records, and be rate-limited.",
    },
    {
      question: "Does @frappe.whitelist() check permissions?",
      answer:
        "Without allow_guest it requires a logged-in user, but it does not check whether that user may access the records the function reads or changes. Add frappe.only_for for role gates and doc.check_permission or frappe.has_permission with throw=True for record-level checks.",
    },
    {
      question: "What happens if I lose the encryption_key in site_config.json?",
      answer:
        "Stored passwords and credentials in the database cannot be decrypted after a restore. Encrypted backups depend on a separate backup_encryption_key in the same file, so lose site_config.json and you can lose both. Keep copies of both keys in a password manager or secret store, separate from the backups themselves.",
    },
    {
      question: "Should I enable Server Scripts in ERPNext?",
      answer:
        "Only if you need them. They are disabled by default from version 15 because anyone who can edit them can run server-side code. If you enable them, restrict who can edit them and move stable logic into a custom app under version control.",
    },
  ],
};
