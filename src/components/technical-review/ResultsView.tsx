import { useState } from "react";
import { api } from "./api";
import type { Finding, IdeaResults, OfferInfo, Results, TechnicalResults } from "./types";

const STAGE_COPY: Record<TechnicalResults["stage"], string> = {
  building: "Readiness for launch",
  mvp: "Readiness for your early users",
  scaling: "Readiness for growth",
};

const STATUS: Record<string, { label: string; className: string }> = {
  good: { label: "Good", className: "text-emerald-400 border-emerald-400/40" },
  gap: { label: "Gap", className: "text-primary border-primary/50" },
  blind_spot: { label: "Blind spot", className: "text-yellow-300 border-yellow-300/40" },
};

const buttonClass =
  "px-5 py-3 border-2 border-foreground text-smalltext font-semibold text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50";
const primaryButtonClass =
  "px-5 py-3 bg-primary text-smalltext font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50";

function Section({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="space-y-4 border-t border-foreground/10 pt-10">
      <h2 className="text-heading2 font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

// "We'll send your report to [email]. Is that right?" — the report is only
// sent after this.
function ConfirmEmail({ reviewId, initialEmail }: Readonly<{ reviewId: string; initialEmail: string }>) {
  const [email, setEmail] = useState(initialEmail);
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setState("sending");
    setError(null);
    try {
      await api.confirmEmail(reviewId, email.trim());
      setState("sent");
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't send the email.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <p className="border-l-2 border-primary pl-4 text-body text-foreground">
        Your report is on its way to <strong>{email.trim()}</strong>.
      </p>
    );
  }

  return (
    <div className="space-y-3 border-2 border-primary/60 p-5">
      {editing ? (
        <input
          type="email"
          className="w-full bg-secondary px-4 py-3 text-smalltext text-[#0d0d0e] focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email for your report"
        />
      ) : (
        <p className="text-body text-foreground">
          We'll send your report to <strong>{email}</strong>. Is that right?
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button type="button" className={primaryButtonClass} onClick={confirm} disabled={state === "sending" || !email.trim()}>
          {state === "sending" ? "Sending…" : editing ? "Send to this email" : "Confirm"}
        </button>
        {!editing && (
          <button type="button" className={buttonClass} onClick={() => setEditing(true)}>
            Edit email
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

function FindingCard({ finding }: Readonly<{ finding: Finding }>) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(finding.fixPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <article className="space-y-3 border border-foreground/15 p-5">
      <h3 className="text-body font-bold text-foreground">{finding.title}</h3>
      <p className="text-smalltext text-foreground/85">
        {finding.explanation} {finding.whyItMatters}
      </p>
      <div className="space-y-2">
        <p className="text-sm text-foreground/60">Fix prompt — paste into Cursor, Lovable or Claude:</p>
        <pre className="whitespace-pre-wrap bg-foreground/5 p-3 text-sm text-foreground/90">{finding.fixPrompt}</pre>
        <button type="button" className="text-sm font-semibold text-primary hover:underline" onClick={copy}>
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <p className="text-sm text-foreground/60">{finding.engineerNote}</p>
    </article>
  );
}

function Invite({ results, reviewId }: Readonly<{ results: Results; reviewId: string }>) {
  async function book(offer: OfferInfo) {
    // Open first so pop-up blockers allow it; recording the choice can follow.
    window.open(results.bookingUrl, "_blank", "noopener");
    api.book(reviewId, offer.id).catch(() => undefined);
  }
  const { primary, secondary } = results.offers;
  return (
    <section className="space-y-5 bg-foreground/5 p-6 md:p-8">
      <p className="text-body text-foreground md:text-heading2">{results.invite}</p>
      <div className="space-y-2">
        <h3 className="text-body font-bold text-primary">{primary.title}</h3>
        <p className="text-smalltext text-foreground/85">{primary.description}</p>
        <button type="button" className={primaryButtonClass} onClick={() => book(primary)}>
          Book a time
        </button>
      </div>
      {secondary.length > 0 && (
        <div className="space-y-2 border-t border-foreground/10 pt-4">
          {secondary.map((offer) => (
            <div key={offer.id} className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-smalltext text-foreground/85">
                <span className="font-semibold text-foreground">{offer.title}</span> — {offer.description}
              </p>
              <button type="button" className={buttonClass} onClick={() => book(offer)}>
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function TechnicalView({ results }: Readonly<{ results: TechnicalResults }>) {
  const { result } = results;
  const diy = results.findings.filter((f) => f.diy);
  const engineer = results.findings.filter((f) => !f.diy);
  const aiModules = results.modules.filter((m) => m.source === "ai");

  return (
    <>
      <header className="space-y-2">
        <p className="text-smalltext uppercase tracking-[0.2em] text-foreground/60">{STAGE_COPY[results.stage]}</p>
        <p className="text-[64px] font-bold leading-none text-primary md:text-[88px]">
          {result.overall}
          <span className="text-heading2 text-foreground/50">/100</span>
        </p>
        <p className="text-smalltext text-foreground/60">Measured against what matters at your stage, not against bigger products.</p>
      </header>

      {result.flags.length > 0 && (
        <section className="space-y-3 border-2 border-red-400/60 p-5">
          <h2 className="text-heading2 font-bold text-red-300">Critical issues</h2>
          <ul className="list-disc space-y-1 pl-5 text-body text-foreground">
            {result.flags.map((f) => (
              <li key={f.id}>{f.title}</li>
            ))}
          </ul>
        </section>
      )}

      <Section title="By area">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {result.areas.map((a) => (
            <li key={a.area} className="flex items-center justify-between gap-3 border border-foreground/15 px-4 py-3">
              <span className="text-smalltext text-foreground">{a.label}</span>
              <span className="flex items-center gap-3">
                <span className="text-smalltext font-semibold text-foreground">{a.score}</span>
                <span className={`border px-2 py-0.5 text-xs font-semibold uppercase ${STATUS[a.status]?.className ?? ""}`}>
                  {STATUS[a.status]?.label ?? a.status}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {diy.length > 0 && (
        <Section title="You can fix these yourself">
          {diy.map((f) => (
            <FindingCard key={f.id} finding={f} />
          ))}
        </Section>
      )}
      {engineer.length > 0 && (
        <Section title="Where teams usually bring in an engineer">
          {engineer.map((f) => (
            <FindingCard key={f.id} finding={f} />
          ))}
        </Section>
      )}

      <Section title={`Coming up: ${results.nextStage.title}`}>
        <ul className="list-disc space-y-1 pl-5 text-smalltext text-foreground/85">
          {results.nextStage.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Section>

      {results.overflow.length > 0 && (
        <Section title="Also worth checking">
          <ul className="list-disc space-y-1 pl-5 text-smalltext text-foreground/85">
            {results.overflow.map((o) => (
              <li key={o.id}>{o.text}</li>
            ))}
          </ul>
        </Section>
      )}

      {aiModules.length > 0 && (
        <Section title="Why we asked some extra questions">
          {aiModules.map((m) => (
            <p key={m.id} className="text-smalltext text-foreground/85">
              <strong className="text-foreground">{m.label}:</strong> {m.reason}
            </p>
          ))}
        </Section>
      )}

      {result.complianceAsked && (
        <p className="text-sm text-foreground/50">
          The compliance questions are a checklist, not legal advice. Check with a lawyer what applies to you.
        </p>
      )}
    </>
  );
}

const TONE: Record<string, { dot: string; label: string }> = {
  good: { dot: "bg-emerald-400", label: "Looks good" },
  warn: { dot: "bg-primary", label: "Worth a look" },
  neutral: { dot: "bg-foreground/30", label: "" },
};

// "What you told us" as a product card.
function ProductCard({ profile }: Readonly<{ profile: IdeaResults["profile"] }>) {
  return (
    <section className="space-y-4">
      <h2 className="text-heading2 font-bold text-foreground">What you told us</h2>
      <div className="border border-foreground/15">
        <div className="space-y-4 border-l-4 border-primary bg-foreground/5 p-6 md:p-8">
          {profile.product && (
            <blockquote className="text-body font-title font-semibold leading-snug text-foreground md:text-heading2">
              &ldquo;{profile.product}&rdquo;
            </blockquote>
          )}
          {profile.audience && <p className="text-smalltext text-foreground/70">For {profile.audience}</p>}
          {profile.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Scope">
              {profile.tags.map((t) => (
                <li key={t} className="border border-primary/50 px-3 py-1 text-sm font-semibold text-primary">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        <dl className="divide-y divide-foreground/10">
          {profile.rows.map((r) => (
            <div key={r.id} className="grid grid-cols-1 gap-1 px-6 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 md:px-8">
              <dt className="flex items-center gap-3 text-sm text-foreground/70">
                <span
                  className={`size-2.5 shrink-0 rounded-full ${TONE[r.tone]?.dot ?? ""}`}
                  title={TONE[r.tone]?.label || undefined}
                  aria-hidden="true"
                />
                {r.label}
                {TONE[r.tone]?.label && <span className="sr-only">({TONE[r.tone]?.label})</span>}
              </dt>
              <dd
                className={`whitespace-pre-line text-smalltext sm:pl-0 pl-5 ${r.tone === "warn" ? "font-semibold text-primary" : "text-foreground"}`}
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/50">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-emerald-400" aria-hidden="true" /> Looks good
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" /> Worth a look — see the gaps below
        </span>
      </p>
    </section>
  );
}

function IdeaView({ results }: Readonly<{ results: IdeaResults }>) {
  return (
    <>
      <ProductCard profile={results.profile} />
      <Section title="3 gaps to look at">
        {results.gaps.map((g) => (
          <article key={g.title} className="space-y-2 border border-foreground/15 p-5">
            <h3 className="text-body font-bold text-foreground">{g.title}</h3>
            <p className="text-smalltext text-foreground/85">{g.explanation}</p>
            <p className="text-smalltext text-foreground">
              <span className="font-semibold text-primary">Next step:</span> {g.nextStep}
            </p>
          </article>
        ))}
      </Section>
    </>
  );
}

export function ResultsView({
  results,
  reviewId,
  email,
}: Readonly<{ results: Results; reviewId: string; email: string }>) {
  return (
    <div className="space-y-10">
      <h1 className="text-heading1 font-bold text-foreground md:text-[56px]">Your report</h1>
      <ConfirmEmail reviewId={reviewId} initialEmail={email} />
      {results.stage === "idea" ? <IdeaView results={results} /> : <TechnicalView results={results} />}
      <Invite results={results} reviewId={reviewId} />
    </div>
  );
}
