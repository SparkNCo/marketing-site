# Technical Review Flow (SPA-586)

Source of truth for the public `/technical-review` questionnaire: every question, and the logic for whether it's shown. The question catalog and rules engine in code (`portal/supabase/functions/technical-review/engine/`) must match this file. **Change this file first, then the code.**

Spec: [`SPA-586_build-public-technical-review-route-on-marketing-site.pdf`](../SPA-586_build-public-technical-review-route-on-marketing-site.pdf)

## How to read this

- **Section 1** is the whole flow in one diagram. Every other section is a list of questions.
- Each question has a stable **ID** (e.g. `access_control`): the one the code uses. The same question keeps its ID in every branch, even when the wording changes a little per stage, so a question added by a module and a stage question with the same ID are asked once.
- **Shown when** says when the question appears. "Always" means always within that step or branch.
- Technical questions are **Yes / No / Unsure** unless stated, phrased so that **Yes is the good answer**, and show a plain question plus a technical subtitle (in italics). Wording never depends on the person's role.

---

## 1. Overall flow

```mermaid
flowchart TD
    START(["/technical-review"]) --> P1["Step 1 · Intro<br/>email, name, company, role"]
    P1 -.-> SAVE_LEAD[("Save lead<br/>as soon as intro is done")]
    P1 --> P2["Step 2 · Product stage<br/>Where is your product today?"]
    P2 --> P3["Step 3 · About your product<br/>3 free-text fields + privacy note"]
    P3 --> AI_PREFILL{{"AI prefill of step 4<br/>from the step 3 text"}}
    AI_PREFILL --> P4["Step 4 · Scope definition<br/>industry, who uses it, user scale, region, children<br/>user confirms or edits"]
    P4 --> STAGE{"stage?"}

    STAGE -->|"Just an idea"| IDEA_ENRICH{{"AI enrichment of Idea wording<br/>falls back to base wording"}}
    IDEA_ENRICH --> IDEA["Idea branch · I1–I7<br/>see section 7"]

    STAGE -->|"Building / MVP / Scaling"| INTAKE["Technical intake · T1–T3<br/>see section 3"]
    INTAKE --> AI_DETECT{{"AI backup detector<br/>reads step 3 text; can only ADD modules"}}
    AI_DETECT --> BUILD_LIST["Build the question list<br/>1. core checks for the stage<br/>2. + conditional checks from T2 features<br/>3. + context modules, deduped, cap ~8<br/>4. − questions hidden by context"]
    BUILD_LIST --> STAGE2{"stage?"}
    STAGE2 -->|Building| BQ["Building questions · section 4"]
    STAGE2 -->|MVP| MQ["MVP questions · section 4"]
    STAGE2 -->|Scaling| SQ["Scaling questions · section 4"]

    IDEA --> CONFIRM["Email confirmation<br/>We'll send your report to email. Is that right?<br/>Confirm · Edit email"]
    BQ --> CONFIRM
    MQ --> CONFIRM
    SQ --> CONFIRM

    CONFIRM --> RESULTS["Results page shown on screen<br/>see section 8"]
    CONFIRM -.->|"only after Confirm"| SEND_EMAIL[("Email the same report")]
    RESULTS --> OFFER{"Offer routing<br/>section 8"}
    OFFER --> BOOK["Book consult / repo review"]
    BOOK -.-> SAVE_BOOKED[("Save chosen offer + booked Y/N")]

    P2 -.-> SAVE_PROGRESS[("Save progress<br/>answers + last question reached")]
    P4 -.-> SAVE_PROGRESS
    INTAKE -.-> SAVE_PROGRESS
    BQ -.-> SAVE_PROGRESS
    MQ -.-> SAVE_PROGRESS
    SQ -.-> SAVE_PROGRESS
    IDEA -.-> SAVE_PROGRESS
```

A progress bar is shown on every step. Target times: Idea, Building and MVP < 4 min; Scaling < 5 min.

---

## 2. Shared pages (all branches)

### Step 1 · Intro

*Takes about 4 minutes. You'll get a personalized report at the end.* The lead is saved as soon as this step is done.

| ID | Question | Answers | Required | Shown when |
|---|---|---|:-:|---|
| `intro_email` | Where should we send your personalized report? | Email | Yes | Always |
| `intro_name` | Your name | Short text | Yes | Always |
| `intro_company` | Company name | Short text | No | Always |
| `intro_role` | What best describes you? | Founder · CTO / Head of Engineering · Product owner / PM · Operations · Other | Yes | Always. Internal only: never changes questions, wording, routing or results |

### Step 2 · Product stage

| ID | Question | Answers | Required | Shown when |
|---|---|---|:-:|---|
| `stage` | Where is your product today? | Just an idea — haven't started building · Building — work has started, not yet in users' hands · MVP — live with early users or customers · Scaling — growing usage, team or customers | Yes | Always. Picks the branch: Idea, Building, MVP or Scaling |

### Step 3 · About your product

*Privacy note on the page: "We don't share this with anyone. We use it only to tailor the questions that follow and your report."*

| ID | Question | Answers | Required | Shown when |
|---|---|---|:-:|---|
| `about_company` | What does your company do? | Short text | Idea only | Always |
| `about_product` | What does (or will) your product do? | Short text | Idea only | Always |
| `about_audience` | Who is it for? | Short text | Idea only | Always |

### Step 4 · Scope definition

*Prefilled by AI from step 3; the person confirms or changes each answer.*

| ID | Question | Answers | Required | Shown when |
|---|---|---|:-:|---|
| `scope_industry` | Industry | SaaS / B2B software · Fintech / financial services · Healthcare / wellness · Insurance · E-commerce / retail · Education · Real estate · Legal · Media / content · Marketplace · Government / public sector · Internal tool · Other | Yes | Always |
| `scope_users` | Who uses it? | Multi-select: The public (consumers) · Small businesses · Large enterprises · Our internal team only · Government / public sector | Yes | Always |
| `scope_scale` | How many users do you have, or expect within 12 months? | Under 100 · 100–10,000 · 10,000–100,000 · 100,000+ | Yes | Always |
| `scope_region` | Where are your users? | Multi-select: US · Canada · EU / UK · Australia / NZ · Other · Not sure yet | Yes | Always |
| `scope_children` | Could children (under 16) use it? | Yes · No · Not sure | Yes | Only if `scope_users` includes "The public (consumers)" or "Government / public sector" (hidden when users are only businesses, enterprises or the internal team) |

How step 4 is used:
- **Idea:** feeds the AI enrichment of the Idea questions (section 7).
- **Building / MVP / Scaling:** adds context modules, hides questions that don't apply, and personalizes the results (sections 5–6).

---

## 3. Technical intake (Building, MVP and Scaling)

Asked once, before the stage questions. Not asked in Idea.

| ID | Question | Answers | Required | Shown when |
|---|---|---|:-:|---|
| `t1_team` | Who is working on the product? | Multi-select: Myself · Co-founder · Freelancer / agency · Internal team · Outsourced vendor | Yes | Building, MVP, Scaling |
| `t2_ai_tools` | Did you use any AI tools to build it? | Multi-select: Lovable · Bolt · V0 · Replit · Cursor · Claude Code · GitHub Copilot · Windsurf · Other · None | Yes | Building, MVP, Scaling |
| `t2_hosting` | Where is it hosted? | Vercel · Netlify · Cloudflare · AWS · Google Cloud · Azure · Supabase · Firebase · Railway / Render · Inside the AI tool's platform · Don't know | Yes | Building, MVP, Scaling |
| `t2_stack` | What is it built with? | Multi-select: React / Next.js · Vue / Nuxt · Node · Python · Supabase · Firebase · Mobile (iOS / Android / React Native / Flutter) · Other · Don't know | Yes | Building, MVP, Scaling |
| `t2_features` | Does your product… | Multi-select: Take payments · Store personal data · Use AI features (chat, generation, etc.) · Let users upload files · Have an admin area · Serve multiple companies / teams · None of these | Yes | Building, MVP, Scaling |

**Ownership (T3)** is scored as the Ownership area. Yes / No / Unsure unless stated.

| ID | Question | Answers | Shown when |
|---|---|---|---|
| `t3_code_control` | Who controls your code?<br/>*Code ownership* | I own and manage it myself · Our in-house engineering team manages it · An external agency / freelancer manages it · It lives only inside an AI tool's platform (e.g. a Lovable or Bolt account) · Mixed / shared · Not sure | Building, MVP, Scaling |
| `t3_accounts_owned` | Are your hosting account and domain registered to the company?<br/>*Account and IP ownership* | Yes · No · Unsure | Building, MVP, Scaling |
| `t3_takeover` | If the person or vendor managing it left tomorrow, could someone else take over?<br/>*Documentation, bus factor* | Yes · No · Unsure | Building, MVP, Scaling |

---

## 4. Stage questions (Building, MVP and Scaling)

One row per question. The **Building / MVP / Scaling** columns give the area it's asked under in that branch (— = not asked there). All are **Yes / No / Unsure** unless stated, phrased so that Yes is the good answer. Areas are asked in the order listed in each branch's scored areas.

- **Building** areas: Security foundations · Data & architecture foundations · Launch readiness · AI features
- **MVP** areas: Security · Reliability & recovery · Abuse & cost · Privacy & compliance · Releasing & quality · Visibility · Architecture · AI features
- **Scaling** areas: Security · Reliability & recovery · Performance & scale · Cost · Compliance & enterprise readiness · Visibility & vendors · Engineering process · AI features

| ID | Question | Building | MVP | Scaling | Shown when |
|---|---|---|---|---|---|
| `access_control` | Have you checked that one user can never see another user's data?<br/>*Access control, row-level security* | Security foundations | Security | — | Always |
| `auth_provider` | Is login handled by a trusted provider (e.g. Supabase Auth, Clerk, Auth0) rather than custom-built?<br/>*Authentication* | Security foundations | — | — | Always |
| `secrets_audit` | Have you checked that no passwords or API keys are visible in your code or website?<br/>*Secrets audit* | Security foundations | Security | — | Always |
| `mfa_infra` | Do the accounts that control your product (hosting, code, database, domain) require two-step login?<br/>*MFA on infrastructure accounts*<br/>*Scaling wording: "Do the accounts that control your product require two-step login?"* | Security foundations | Security | Security | Always |
| `input_validation` | Is what users type into forms checked before it's saved or shown?<br/>*Input validation, SQL injection, XSS* | Security foundations | — | — | Always |
| `data_model` | Will your data structure still work if usage grows 10x or you add major features?<br/>*Data model / schema design* | Data & architecture foundations | — | — | Always |
| `tenant_isolation` | Is each company's data clearly kept separate?<br/>*Multi-tenancy / tenant isolation* | Data & architecture foundations | — | — | Only if T2 includes "Serve multiple companies / teams" |
| `idempotency` | Are you protected against charging a customer twice if a payment or webhook is sent twice?<br/>*Idempotency* | Data & architecture foundations | Architecture | Performance & scale | Only if T2 includes "Take payments" |
| `upload_security` | Are uploaded files checked for type and size, and kept private where needed?<br/>*Object storage, upload security*<br/>*Building wording: "Are uploaded files kept in proper file storage, checked for type and size, and private where needed?"* | Data & architecture foundations | Security | — | Only if T2 includes "Let users upload files" |
| `staging` | Is there a separate test version of the app, apart from the live one?<br/>*Staging environment*<br/>*Building wording: "Is there a separate test version of the app, apart from the one users will use?"* | Launch readiness | Releasing & quality | — | Always |
| `backups` | Are automatic database backups switched on?<br/>*Backups* | Launch readiness | — | — | Always |
| `error_monitoring` | Would you find out if the app broke at 2am — before a customer told you?<br/>*Error monitoring, alerting*<br/>*Building wording: "Once you launch, would you find out if the app broke — before a user told you?"* | Launch readiness | Reliability & recovery | — | Always |
| `legal_basics` | Do you have a privacy policy and terms of service?<br/>*Legal basics*<br/>*Building wording: "Do you have a privacy policy and terms of service ready?"* | Launch readiness | Privacy & compliance | — | Always |
| `consent` | Do you ask users for permission before collecting their data (e.g. cookies, emails)?<br/>*Consent management*<br/>*Building wording: "Will you ask users for permission before collecting their data (e.g. cookies, emails)?"* | Launch readiness | Privacy & compliance | — | Hidden if users are the internal team only |
| `pci_scope` | Are card details handled entirely by your payment provider, never stored by you?<br/>*PCI scope*<br/>*Building wording: "Are card details handled entirely by your payment provider (e.g. Stripe), never stored by you?"* | Launch readiness | Privacy & compliance | — | Only if T2 includes "Take payments" |
| `cross_browser` | Have you tested on different browsers and phones?<br/>*Cross-browser / device testing* | Launch readiness | — | — | Always |
| `product_analytics` | Do you know how people actually use the product (which features, where they drop off)?<br/>*Product analytics*<br/>*Building wording: "Will you be able to see how people use the product (which features, where they drop off)?"* | Launch readiness | Visibility | — | Hidden if internal team only **and** under 100 users |
| `ai_prompt_injection` | Could a user trick the AI into ignoring its instructions or leaking data? (We've checked)<br/>*Prompt injection* | AI features | AI features | — | Only if T2 includes "Use AI features" |
| `ai_data_exposure` | Do you know what customer data gets sent to the AI provider?<br/>*Data exposure to model vendors* | AI features | AI features | — | Only if T2 includes "Use AI features" |
| `ai_token_quota` | Do you know what each user costs you in AI usage, and is there a cap?<br/>*Token quotas, LLM cost per user*<br/>*Building wording: "Is there a cap on how much AI usage one user can run up?"* | AI features | Abuse & cost | Cost | Only if T2 includes "Use AI features" |
| `dependency_scan` | Do you check the third-party packages you use for known security problems?<br/>*Dependency vulnerability scanning* | — | Security | Security | Always |
| `admin_access` | Is the admin area locked down so only the right people can reach it?<br/>*Admin access control* | — | Security | — | Only if T2 includes "Have an admin area" |
| `backup_restore` | If your database disappeared tomorrow, could you restore it — and have you tried?<br/>*Backups and tested restore*<br/>*Scaling wording: "If your database disappeared tomorrow, could you restore it — and have you tested it recently?"* | — | Reliability & recovery | Reliability & recovery | Always |
| `uptime` | Would you know if the whole site went down?<br/>*Uptime monitoring* | — | Reliability & recovery | — | Always |
| `rollback` | Can you undo a bad release quickly?<br/>*Rollback* | — | Reliability & recovery | — | Always |
| `third_party_failure` | If a service you depend on (payments, email, AI provider) goes down, does your app handle it gracefully?<br/>*Third-party failure handling* | — | Reliability & recovery | — | Always |
| `rate_limit` | Is it protected against one person (or a bot) overloading it with requests?<br/>*Rate limiting* | — | Abuse & cost | — | Always |
| `cost_alerts` | Do you get an alert if your hosting or service bills spike?<br/>*Cloud cost alerts, budget caps* | — | Abuse & cost | Cost | Always |
| `gdpr_deletion` | Could you delete everything you hold about a user if they asked?<br/>*GDPR / data subject requests* | — | Privacy & compliance | Compliance & enterprise readiness | Always |
| `pii_masking` | Do you hide sensitive information (names, emails, card details) in logs and screens where it isn't needed?<br/>*PII masking / redaction* | — | Privacy & compliance | — | Always |
| `code_review` | Does someone review code changes before they go live?<br/>*Code review / pull requests* | — | Releasing & quality | — | Always |
| `e2e_tests` | Are the most important flows (sign-up, login, payment) tested automatically?<br/>*E2E tests on critical paths* | — | Releasing & quality | — | Always |
| `db_migrations` | Are database changes made in a controlled, reversible way?<br/>*Database migrations* | — | Releasing & quality | Engineering process | Always |
| `logging` | If something went wrong last week, could you look up what happened?<br/>*Logging* | — | Visibility | — | Always |
| `race_conditions` | If two people do the same thing at the same moment, does the app handle it correctly?<br/>*Race conditions, concurrency*<br/>*MVP wording: "If two people do the same thing at the same moment (e.g. book the last slot, edit the same record), does the app handle it correctly?"* | — | Architecture | Performance & scale | Always |
| `ai_output_validation` | Do you check AI answers before they're shown or acted on (e.g. wrong facts, unsafe content)?<br/>*Output validation, guardrails*<br/>*Scaling wording: "Do you check AI answers before they're shown or acted on?"* | — | AI features | AI features | Only if T2 includes "Use AI features" |
| `ai_human_loop` | Is there a human check for high-stakes AI actions (e.g. sending emails, changing records, money)?<br/>*Human-in-the-loop*<br/>*Scaling wording: "Is there a human check for high-stakes AI actions?"* | — | AI features | AI features | Only if T2 includes "Use AI features" |
| `least_privilege` | Does each person and service only have access to what they need?<br/>*Least privilege / RBAC* | — | — | Security | Always |
| `pentest` | Has anyone tried to break into it on purpose in the last year?<br/>*Penetration test, SAST/DAST* | — | — | Security | Always |
| `audit_trail` | Can you see who changed important data or settings, and when?<br/>*Audit trail* | — | — | Security | Always |
| `incident_runbook` | Is there a written plan for what to do when something goes badly wrong?<br/>*Incident response / runbook* | — | — | Reliability & recovery | Always |
| `no_spof` | Could the app keep running if any single part of it failed?<br/>*No single points of failure* | — | — | Reliability & recovery | Always |
| `retries` | When outside services fail or are slow, does the app retry sensibly instead of breaking?<br/>*Retries, timeouts, circuit breakers* | — | — | Reliability & recovery | Always |
| `load_testing` | Do you know how many users it can handle at once?<br/>*Load testing* | — | — | Performance & scale | Hidden if internal team only **and** under 100 users |
| `autoscaling` | Can the app automatically handle a sudden spike in traffic?<br/>*Auto-scaling* | — | — | Performance & scale | Hidden if internal team only **and** under 100 users |
| `db_performance` | Do pages stay fast as your data grows?<br/>*Database indexing, query performance* | — | — | Performance & scale | Always |
| `background_jobs` | Are slow tasks (emails, reports, AI processing) run in the background, so users aren't left waiting?<br/>*Background jobs / queues* | — | — | Performance & scale | Always |
| `soc2` | Have customers asked for security certifications?<br/>*SOC 2 / ISO 27001*<br/>Answers: Yes, we have one · Yes, we don't yet · Not yet asked · Unsure | — | — | Compliance & enterprise readiness | Always |
| `dpas` | Do you have data agreements with the services that handle your users' data?<br/>*DPAs with sub-processors* | — | — | Compliance & enterprise readiness | Always |
| `data_residency` | Do you know which country your users' data is stored in?<br/>*Data residency* | — | — | Compliance & enterprise readiness | Hidden if no EU / UK users (unless the Enterprise or Government module is on) |
| `data_retention` | Do you have a rule for how long you keep data?<br/>*Data retention policy* | — | — | Compliance & enterprise readiness | Always |
| `accessibility` | Can people using screen readers or keyboards use your product?<br/>*Accessibility / WCAG* | — | — | Compliance & enterprise readiness | Always |
| `vendor_sbom` | Do you have a list of every outside service and library your product depends on?<br/>*Vendor audit / SBOM* | — | — | Visibility & vendors | Always |
| `log_retention` | Are logs kept long enough to investigate problems from weeks or months ago?<br/>*Log retention* | — | — | Visibility & vendors | Always |
| `cicd` | Are releases automated and reviewed, rather than done by hand?<br/>*CI/CD, code review* | — | — | Engineering process | Always |
| `regression_tests` | When you change something, is there an automatic check that you didn't break something else?<br/>*Automated regression tests* | — | — | Engineering process | Always |
| `feature_flags` | Can you turn a new feature on for some users only?<br/>*Feature flags* | — | — | Engineering process | Always |
| `prod_access` | Is it clear who is allowed to release to the live app?<br/>*Production access control* | — | — | Engineering process | Always |
| `ai_vendor_retention` | Is the AI provider prevented from training on or keeping your customers' data?<br/>*Vendor data retention / training opt-out* | — | — | AI features | Only if T2 includes "Use AI features" |
| `ai_fallback` | If the AI provider is down or slow, does your app still work?<br/>*Model fallback, timeouts* | — | — | AI features | Only if T2 includes "Use AI features" |
| `ai_evals` | Do you have a way to test whether AI quality changes when you update prompts or models?<br/>*Evals / AI regression testing* | — | — | AI features | Only if T2 includes "Use AI features" |

---

## 5. Context modules (Building, MVP and Scaling)

Step 4 answers add short packs of questions. Rules:

1. **Rules first.** Fixed rules on the step 4 selects, so the same answers always give the same questions.
2. **AI only adds.** When step 3's text clearly points to a context the selects missed, AI may add a module (only those marked "AI detects"). It never removes questions, and the results page says why it added one.
3. **Stage-aware.** A question is only added in the stages listed (B = Building, M = MVP, S = Scaling).
4. **Asked once.** A module question that's already a stage question isn't repeated and doesn't count toward the cap.
5. **Cap: 8 extra questions in total**, filled in the module order below (highest risk first). What doesn't fit is listed on the results page as "Also worth checking".
6. **Not legal advice.** Compliance questions are framed as "have you checked", with a disclaimer on the results page.

### 1. Healthcare / wellness

**Added when:** `scope_industry` = Healthcare / wellness, **or** AI detects health data in step 3

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `hc_hipaa_scope` | Do you know whether the health information you handle is legally protected (e.g. HIPAA in the US)?<br/>*HIPAA / PHI scope* | B M S | — |
| `hc_baa` | Do the services that touch health data (hosting, database, email, AI provider) sign agreements to protect it?<br/>*Business Associate Agreements (BAAs)* | B M S | US users |
| `hc_phi_min` | Is health information kept out of logs, analytics and AI prompts unless it's needed?<br/>*PHI minimization* | M S | — |
| `hc_audit_log` | Is every view or change of health records recorded?<br/>*Access audit logging* | M S | — |
| `hc_gdpr_art9` | Are you treating health data as "special category" data with extra protections?<br/>*GDPR Article 9* | B M S | EU / UK users |

### 2. Education and children

**Added when:** `scope_children` = Yes or Not sure, **or** `scope_industry` = Education

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `edu_parental_consent` | Do you get a parent's permission before collecting a child's data?<br/>*COPPA (US), GDPR-K / Age Appropriate Design Code (UK/EU)* | B M S | Children could use it |
| `edu_age_check` | Do you check users' ages at sign-up?<br/>*Age assurance* | B M | Children could use it |
| `edu_ferpa` | Do you know your obligations for student records?<br/>*FERPA* | B M S | Industry = Education **and** US users |

### 3. Fintech / financial services / insurance

**Added when:** `scope_industry` = Fintech / financial services or Insurance, **or** AI detects it

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `fin_reg_scope` | Do you know which financial regulations apply to you (e.g. money transmission, lending, investment advice)?<br/>*Regulatory scope* | B M S | — |
| `fin_kyc` | Is identity checking handled by a specialist provider rather than built yourself?<br/>*KYC / AML provider* | B M S | — |
| `fin_ledger` | Is every change to money or account balances recorded and impossible to edit after the fact?<br/>*Immutable ledger, audit trail* | M S | — |
| `fin_open_banking` | Do you use a bank-data provider (e.g. Plaid) rather than storing users' bank logins?<br/>*Open banking / credential handling* | B M | — |

### 4. Government / public sector

**Added when:** `scope_industry` = Government, **or** `scope_users` includes Government, **or** AI detects it

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `gov_accessibility` | Do you know the accessibility standard your public-sector customers require?<br/>*Section 508 / WCAG 2.1 AA / EN 301 549* | B M S | — |
| `gov_sovereignty` | Do customers require data to stay in their country, or a government security approval?<br/>*Data sovereignty, FedRAMP / IRAP / G-Cloud* | M S | — |

### 5. Large enterprises as customers

**Added when:** `scope_users` includes Large enterprises

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `ent_sso` | Can customers log in with their company accounts (e.g. Okta, Microsoft)?<br/>*SSO / SAML* | M S | — |
| `ent_rbac` | Can customer admins control what each of their staff can see and do?<br/>*Role-based permissions* | B M S | — |
| `soc2` | Have customers asked for security certifications?<br/>*SOC 2 / ISO 27001* | M | — |
| `ent_export_delete` | Can a customer export or fully delete their company's data?<br/>*Data portability, offboarding* | M S | — |
| `dpas` | Do you have data agreements with the services that handle your users' data?<br/>*DPAs with sub-processors* | M | EU / UK users (Region) · always (Enterprise) |

### 6. Marketplace

**Added when:** `scope_industry` = Marketplace, **or** AI detects buyers and sellers

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `mkt_payouts` | Are payouts to sellers handled by a payment platform built for marketplaces?<br/>*Stripe Connect / split payments, KYC of sellers* | B M S | T2 includes Take payments |
| `mkt_reporting` | Can users report bad listings, people or content, and does someone review reports?<br/>*Trust & safety, content moderation* | M S | — |
| `mkt_fraud` | Do you have checks for fake accounts and fraudulent transactions?<br/>*Fraud detection* | M S | — |

### 7. Where your users are

**Added when:** `scope_region` includes US, Canada, EU / UK or Australia / NZ

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `gdpr_deletion` | Could you delete everything you hold about a user if they asked?<br/>*GDPR / data subject requests* | B M S | EU / UK users |
| `data_residency` | Do you know which country your users' data is stored in?<br/>*Data residency* | B M S | EU / UK users |
| `dpas` | Do you have data agreements with the services that handle your users' data?<br/>*DPAs with sub-processors* | B M S | EU / UK users (Region) · always (Enterprise) |
| `reg_ccpa` | Do you let California users opt out of their data being sold or shared?<br/>*CCPA / CPRA* | M S | US users **and** The public |
| `reg_pipeda` | Do you know your obligations for personal data and breach reporting?<br/>*PIPEDA, Quebec Law 25* | M S | Canada users |
| `reg_au_privacy` | Do you know your obligations under the Privacy Act, including breach notification?<br/>*Notifiable Data Breaches scheme* | M S | Australia / NZ users |

### 8. The public (consumers)

**Added when:** `scope_users` includes The public

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `pub_bot_protection` | Is sign-up protected against bots and fake accounts?<br/>*Bot protection, CAPTCHA, email verification* | B M S | — |
| `pub_ugc_moderation` | If users post content others can see, can it be reported and removed?<br/>*User-generated content moderation* | M S | — |

### 9. Large user base

**Added when:** `scope_scale` = 10,000–100,000 or 100,000+

| ID | Question | Stages | Also requires |
|---|---|:-:|---|
| `load_testing` | Do you know how many users it can handle at once?<br/>*Load testing* | B M | — |
| `autoscaling` | Can the app automatically handle a sudden spike in traffic?<br/>*Auto-scaling* | B M | — |
| `db_performance` | Do pages stay fast as your data grows?<br/>*Database indexing, query performance* | M | — |
| `cdn` | Are images and static files served from a CDN?<br/>*Caching, CDN* | B M S | — |
| `background_jobs` | Are slow tasks (emails, reports, AI processing) run in the background, so users aren't left waiting?<br/>*Background jobs / queues* | B M | — |
| `no_spof` | Could the app keep running if any single part of it failed?<br/>*No single points of failure* | M | 100,000+ users |
| `incident_runbook` | Is there a written plan for what to do when something goes badly wrong?<br/>*Incident response / runbook* | M | 100,000+ users |

Where module questions go: Privacy & compliance (Building: Launch readiness; Scaling: Compliance) · Security · Performance & scale (Building: Data & architecture; MVP: Architecture) · Abuse & cost (Building / Scaling: Security).

---

## 6. Questions hidden by context

Applied **after** modules are added. Hidden questions are **excluded from scoring**, not scored as zero.

| Context | Hidden question IDs |
|---|---|
| `scope_users` = internal team only **and** `scope_scale` = Under 100 | `load_testing`, `autoscaling`, `cdn`, `consent`, `product_analytics`, `pub_bot_protection` |
| `scope_users` = internal team only (any size) | `consent`, `reg_ccpa`, `pub_bot_protection`, `pub_ugc_moderation` |
| `scope_users` only Small businesses / Large enterprises / Internal team | `scope_children`, `edu_parental_consent`, `edu_age_check` |
| `scope_scale` = Under 100 **and** stage ≠ Scaling | `autoscaling`, `cdn` |
| `scope_region` has no EU / UK | `data_residency`, unless the Enterprise or Government module was triggered |

---

## 7. Idea branch

Quick picks plus short free text. AI may add examples, placeholders and the person's audience to the wording ("AI enrichment"); it never changes the answer options or the meaning, and if it isn't ready the base wording shows.

### Your users

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i1_talked` | Have you talked to your target users about this problem? | Yes, 10+ · A few · Not yet | Yes | Always | Name the audience they gave, e.g. "Have you talked to independent physiotherapists about this?" |
| `i1_needs` | What did they say they needed most? | Short text | No | Only if `i1_talked` is "Yes, 10+" or "A few" | Example needs as placeholder, e.g. "e.g. fewer no-shows, faster booking" |

### Existing options

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i2_looked` | Have you looked at existing tools that might already solve this? | Yes, none fit · Yes, some partly fit · Not yet | Yes | Always | Name likely real alternatives, e.g. "e.g. Jira or Linear" for a ticketing app |
| `i2_missing` | What's missing from them? | Short text | No | Only if `i2_looked` is "Yes, some partly fit" | Placeholder with typical gaps for that category |

### Getting it adopted

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i3_who` | Who will use it? | External customers · Internal team · Both | Yes | Always | Pre-select the likely answer from the product description |
| `i3_plan` | Do you have a go-to-market plan to get it into their hands?<br/>*If `i3_who` is "Internal team": "Do you have a rollout / change-management plan to get it into their hands?"* | Yes · Rough idea · Not yet | Yes | Always | Mention a relevant example channel, e.g. "e.g. app marketplaces, industry associations" |

### Integrations and data

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i4_depends` | Does it depend on any data source or other system to work? | Yes · No · Unsure | Yes | Always | Suggest likely integrations, e.g. "e.g. Stripe, Xero, Google Calendar" for a booking tool |
| `i4_names` | Which ones? | Short text | No | Only if `i4_depends` is "Yes" | None |

### Blockers

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i5_blockers` | What's stopped you from getting started so far? | Multi-select: Time · Budget · Not sure how to build it · Not sure it's worth building · Finding the right people · Other | Yes | Always | None |
| `i5_other` | What else? | Short text | No | Only if `i5_blockers` includes "Other" | None |

### Scope

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i6_must` | What are the must-have features? | Free text | Yes | Always | Placeholder with 2–3 typical core features for that product type |
| `i6_nice` | What would be nice to have? | Free text | No | Always | Placeholder with typical "later" features |

### Build approach

| ID | Question | Answers | Required | Shown when | AI enrichment |
|---|---|---|:-:|---|---|
| `i7_build` | How are you thinking of building it? | Multi-select: AI tools myself · Hire a freelancer / agency · Internal team · Buy / configure an existing tool · Haven't decided | Yes | Always | None |

### AI gap analysis

The AI gap analysis must look for at least:
- Building before talking to users (`i1_talked` = Not yet)
- Off-the-shelf tools not checked, or "partly fit" with small gaps (buying or configuring may be enough)
- No rollout or go-to-market plan (`i3_plan`)
- Integrations that are expensive, restricted or slow to access (`i4_names`), especially in regulated industries
- Must-have list too long for an MVP (more than ~5–7 items in `i6_must`)
- Build route doesn't match the blockers (e.g. `i5` Not sure how to build it + `i7` AI tools myself)
- Industry requirements implied by step 4 (healthcare → patient data rules; fintech → payments / KYC)

Tone: constructive, specific, refers to their own answers. Never "you need to hire us".

---

## 8. Scoring, results and offer routing

### Scoring (Building, MVP, Scaling)

- Yes = 2, Unsure = 1, No = 0. Hidden or non-applicable questions are excluded.
- Score per scored area (section 4) plus an overall readiness score out of 100.
- Scores are relative to the stage ("readiness for launch" / "readiness for growth").
- Weighting:
  - Security, backups and privacy count more if T2 has Take payments or Store personal data.
  - Module questions count toward the area they sit in.
  - Healthcare, fintech or children weight Privacy & compliance more.
  - 10,000+ users weights Performance & scale more.
- **Area label:** 2+ Unsure answers in an area = **Blind spot**. Otherwise **Gap** or **Good** by score (threshold to be decided).

### Critical flags (always shown at the top; they override the score)

| Flag | Condition | B | M | S |
|---|---|:-:|:-:|:-:|
| Data isolation | `access_control` = No / Unsure | ✓ | ✓ | |
| Exposed secrets | `secrets_audit` = No / Unsure **and** `t2_ai_tools` ≠ None | ✓ | ✓ | |
| Backups | `backups` / `backup_restore` = No / Unsure | ✓ | ✓ | ✓ |
| Ownership | `t3_code_control` = Only inside an AI tool's platform or Not sure, **or** `t3_accounts_owned` = No | ✓ | ✓ | ✓ |
| Double charge | Take payments **and** `idempotency` = No / Unsure | ✓ | ✓ | ✓ |
| No MFA | `mfa_infra` = No | | ✓ | ✓ |
| Single point of failure | `no_spof` = No / Unsure | | | ✓ |
| Health BAAs | Healthcare **and** US **and** `hc_baa` = No / Unsure | ✓ | ✓ | ✓ |
| Children consent | Children could use it **and** `edu_parental_consent` = No / Unsure | ✓ | ✓ | ✓ |
| Enterprise permissions | Large enterprises **and** `ent_rbac` = No | | ✓ | ✓ |
| Scale readiness | 10,000+ users **and** (`load_testing` or `autoscaling` = No / Unsure) | | ✓ | |

### Results page and offer routing

**What the results page shows**

| Branch | Results, in order |
|---|---|
| Idea | 1. Summary of what they told us · 2. AI gap analysis: 3 gaps with next steps · 3. Invite to a free consult, personalized from `i5_blockers` |
| Building / MVP / Scaling | 1. Stage-relative score and each area as Gap / Blind spot / Good · 2. Critical flags at the top · 3. Top 3–5 risk-library findings, each with an explanation and a copy-paste fix prompt · 4. "You can fix these yourself" vs "Where teams usually bring in an engineer" · 5. "Coming up at your next stage": 2–3 items · 6. "Also worth checking": module questions cut by the cap, and why AI added a module · 7. "Not legal advice" disclaimer when compliance questions were asked · 8. Invite naming their blind spots |

The report is emailed only after the email is confirmed (Confirm · Edit email); the results show on screen at the same time.

**Which offer is shown**

| Branch | When | Offer |
|---|---|---|
| Idea | Always | Free consult |
| Building | Any critical flag | Free pre-launch repo review (primary) + consult |
| Building | No critical flag | Free consult (primary); repo review offered as a "before you launch" next step |
| MVP | Any critical flag, or 2+ blind-spot areas | Free repo review (primary) + consult |
| MVP | Otherwise | Free consult (primary); repo review as next step |
| Scaling | Any critical flag, or 2+ blind-spot areas | Free repo + architecture review (primary) + consult |
| Scaling | High score, no critical flag | Congratulate; consult on the next stage (enterprise readiness, SOC 2, due diligence prep) |
| Scaling | Otherwise (not in the spec, assumption #12) | Free consult (primary) + repo review |

Routing never uses `intro_role`. The repo review scope is stated on the page: 30-minute review of their top 3 risks, read-only access, access revoked afterwards, written summary delivered.

### Lead data captured

Email, name, company, role (internal only), stage, step 4 answers, modules triggered (and whether by rule or AI), T2 tools / stack / features, score per area, critical flags, blind-spot areas, `i5_blockers`, last question reached, email confirmed Y/N, chosen offer, booked Y/N.

---

## Open questions and assumptions

The spec leaves these open. Until someone confirms, the questions and logic above use the **assumption** in each row.

| # | Topic | Assumption used |
|---|---|---|
| 1 | `scope_children` when users include Government but not The public | Shown (the spec only hides it for businesses / enterprises / internal) |
| 2 | Does `scope_children` = Not sure trigger the children questions? | Yes, treated like Yes (safer) |
| 3 | "If schools are customers (US)" — how do we know? | `scope_industry` = Education **and** `scope_region` has US |
| 4 | Order of modules 4–9 for the cap | Government → Enterprise → Marketplace → Region → Public → Large user base |
| 5 | Does a hide rule beat a module that adds the same question? | Yes, except the stated `data_residency` exception |
| 6 | Internal + under 100 also hides `load_testing` / `autoscaling` in **Scaling** core? | Yes (literal reading of the spec) |
| 7 | Which Building area module questions go into (Building has no Privacy area) | Launch readiness |
| 8 | How to score `t3_code_control` (single select, not Yes / No / Unsure) | Own / In-house = 2 · Agency / Mixed = 1 · AI platform only / Not sure = 0 + critical flag |
| 9 | How to score `soc2` (4 options) | We have one = 2 · Not yet asked = excluded · Unsure = 1 · We don't yet = 0 |
| 10 | `pub_ugc_moderation` starts with "If users post content…" but no T2 option covers it | Always asked when the Public module triggers; answer options are Yes / No / Unsure |
| 11 | Exact weights, Gap / Good threshold and Scaling "high score" threshold | To define with Spark & Co |
| 12 | Scaling with no flags, < 2 blind spots, but **not** a high score | Free consult (primary) + repo review |
| 13 | `i3_plan` wording when `i3_who` = Both | Go-to-market wording (external users are the harder case) |
| 14 | "Store personal data" is listed as a conditional in the acceptance criteria, but no question depends on it | Only affects weighting |
