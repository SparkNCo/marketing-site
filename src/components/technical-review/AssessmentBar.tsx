import { useEffect, useRef, useState } from "react";
import { api } from "./api";
import type { Score } from "./types";

// Top of /assessment: the running score (right) and "Sign in to save
// progress". Signing in emails a magic link; the account is a "lead" user
// with no portal access.

type Props = {
  // Technical stages only; null before the first section is finished.
  score: Score | null;
  showScore: boolean;
  sectionsDone: number;
  sectionsTotal: number;
  signedInEmail: string | null;
  defaultEmail: string;
  onSignOut: () => void;
};

function SignIn({ defaultEmail }: Readonly<{ defaultEmail: string }>) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(defaultEmail);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on a click outside the button and panel, or on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      await api.signIn(email.trim());
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't send the link.");
      setState("idle");
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="border-2 border-foreground px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          if (!email) setEmail(defaultEmail);
        }}
      >
        Sign in to save progress
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-[min(20rem,calc(100vw-3rem))] space-y-3 border border-foreground/20 bg-background p-4 shadow-xl">
          {state === "sent" ? (
            <p className="text-smalltext text-foreground">
              Check your inbox: we sent a sign-in link to <strong>{email.trim()}</strong>.
            </p>
          ) : (
            <form className="space-y-3" onSubmit={send}>
              <p className="text-smalltext text-foreground/85">
                We'll email you a link. No password needed, and you can continue on any device.
              </p>
              <input
                type="email"
                required
                className="w-full bg-secondary px-3 py-2 text-smalltext text-[#0d0d0e] focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email"
              />
              <button
                type="submit"
                className="w-full bg-primary px-4 py-2 text-sm font-bold text-black hover:opacity-90 disabled:opacity-50"
                disabled={state === "sending" || !email.trim()}
              >
                {state === "sending" ? "Sending…" : "Email me a sign-in link"}
              </button>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export function AssessmentBar({ score, showScore, sectionsDone, sectionsTotal, signedInEmail, defaultEmail, onSignOut }: Readonly<Props>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-5">
      <div className="text-sm text-foreground/70">
        {signedInEmail ? (
          <span>
            Saving to <strong className="text-foreground">{signedInEmail}</strong> ·{" "}
            <button type="button" className="underline hover:text-primary" onClick={onSignOut}>
              Sign out
            </button>
          </span>
        ) : (
          <span>Your progress saves on this device.</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!signedInEmail && <SignIn defaultEmail={defaultEmail} />}
        {sectionsTotal > 0 && (
          <div className="text-right" aria-live="polite">
            {showScore ? (
              <p className="text-heading2 font-bold leading-none text-primary">
                {score ? score.overall : "–"}
                <span className="text-sm text-foreground/50">/100</span>
              </p>
            ) : null}
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/60">
              {showScore ? "Score · " : ""}
              {sectionsDone} of {sectionsTotal} topics
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
