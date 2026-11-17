import { useState } from "react";
import { SignInDialog } from "./SignInDialog";
import type { Score } from "./types";

// Top of /assessment: the running score (right) and "Sign in to save
// progress" (a temporary passcode by email, then their own password; the
// account is a "lead" user with no portal access).

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
  return (
    <>
      <button
        type="button"
        className="border-2 border-foreground px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        onClick={() => setOpen(true)}
      >
        Sign in to save progress
      </button>
      <SignInDialog open={open} onOpenChange={setOpen} defaultEmail={defaultEmail} />
    </>
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
