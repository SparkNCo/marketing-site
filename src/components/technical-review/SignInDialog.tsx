import { useEffect, useState } from "react";
import { supabase } from "../../pages/api/submissions/server";
import { ApiError, api } from "./api";
import { Spinner } from "../ui/spinner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

// "Sign in to save progress" on /assessment. A real Supabase Auth sign-up:
//   1. The backend emails a temporary passcode (POST /sign-in).
//   2. They type it with a new password (twice). The page checks the
//      passcode with Supabase Auth (verifyOtp), which signs them in, then
//      sets the new password (updateUser).
// Next time, or on another device, they sign in with email + password.
// Emails that already have a portal account (customers, developers…) get no
// passcode; they sign in with the password they have.

type Mode = "email" | "code" | "password" | "done";

const inputClass =
  "w-full bg-secondary px-3 py-2.5 text-smalltext text-[#0d0d0e] placeholder:text-[#0d0d0e]/50 focus:outline-none focus:ring-2 focus:ring-primary";
const primaryClass =
  "inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-smalltext font-bold text-black hover:opacity-90 disabled:opacity-50";
const linkClass = "text-sm text-foreground/70 underline hover:text-primary disabled:opacity-50";
const MIN_PASSWORD = 8;

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}

type Props = { open: boolean; onOpenChange: (open: boolean) => void; defaultEmail: string };

export function SignInDialog({ open, onOpenChange, defaultEmail }: Readonly<Props>) {
  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState(defaultEmail);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState<"sending" | "saving" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Opening it: always for the email now on the first page (they may have
  // changed it), sending the passcode right away. Once per address: reopening
  // keeps the code already sent; "Send a new code" sends another.
  useEffect(() => {
    if (!open) return;
    setError(null);
    setNotice(null);
    setPassword("");
    setConfirm("");
    const target = defaultEmail.trim();
    setEmail(target);
    if (!target) return setMode("email");
    if (sentTo === target) return setMode("code");
    void sendCode(target);
  }, [open]);

  async function sendCode(target: string) {
    setBusy("sending");
    setError(null);
    setNotice(null);
    try {
      await api.signIn(target);
      setSentTo(target);
      setCode("");
      setMode("code");
    } catch (err) {
      if (err instanceof ApiError && err.code === "has_account") {
        setEmail(target);
        setNotice(err.message);
        setMode("password");
      } else {
        setError(err instanceof Error ? err.message : "We couldn't send the passcode.");
        setMode("email");
      }
    } finally {
      setBusy(null);
    }
  }

  function passwordProblem(): string | null {
    if (password.length < MIN_PASSWORD) return `Use at least ${MIN_PASSWORD} characters for your password.`;
    if (password !== confirm) return "The two passwords don't match.";
    return null;
  }

  async function createPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!sentTo) return;
    const problem = passwordProblem();
    if (problem) return setError(problem);
    setBusy("saving");
    setError(null);
    try {
      const token = code.replace(/\s/g, "");
      // The passcode comes from a magic-link token; Supabase accepts it as
      // an email OTP, and as "magiclink" on older setups.
      let { error: verifyError } = await supabase.auth.verifyOtp({ email: sentTo, token, type: "email" });
      if (verifyError) ({ error: verifyError } = await supabase.auth.verifyOtp({ email: sentTo, token, type: "magiclink" }));
      if (verifyError) {
        setError("That passcode is wrong or has expired. Check the email, or send a new code.");
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        // Signed in by the passcode already; only the password didn't stick.
        setError(`You're signed in, but we couldn't set your password: ${updateError.message}`);
        return;
      }
      setMode("done");
    } finally {
      setBusy(null);
    }
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy("saving");
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) {
        setError("Wrong email or password. First time, or no password yet? Use \"Email me a passcode\" below.");
        return;
      }
      setMode("done");
    } finally {
      setBusy(null);
    }
  }

  const forgotOrSwitch = (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-2">
      {mode === "code" && sentTo && (
        <button type="button" className={linkClass} disabled={!!busy} onClick={() => void sendCode(sentTo)}>
          Send a new code
        </button>
      )}
      {mode === "code" && (
        <button type="button" className={linkClass} disabled={!!busy} onClick={() => setMode("email")}>
          Use a different email
        </button>
      )}
      {mode !== "password" ? (
        <button
          type="button"
          className={linkClass}
          disabled={!!busy}
          onClick={() => {
            setError(null);
            setNotice(null);
            setMode("password");
          }}
        >
          Already have a password? Sign in
        </button>
      ) : (
        <button
          type="button"
          className={linkClass}
          disabled={!!busy || !email.trim()}
          onClick={() => void sendCode(email.trim())}
        >
          Forgot it, or first time? Email me a passcode
        </button>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-foreground/20 bg-background p-6 text-foreground font-body sm:p-8">
        {mode === "done" ? (
          <div className="space-y-5">
            <DialogHeader className="gap-3">
              <DialogTitle className="text-heading2 font-bold text-foreground">You're signed in</DialogTitle>
              <DialogDescription className="text-smalltext text-foreground/80">
                Your progress now saves to your account. Sign in with your email and password to continue on any device.
              </DialogDescription>
            </DialogHeader>
            <button type="button" className={primaryClass} onClick={() => onOpenChange(false)}>
              Back to my assessment
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <DialogHeader className="gap-3">
              <DialogTitle className="text-heading2 font-bold text-foreground">
                {mode === "password" ? "Sign in" : "Save your progress"}
              </DialogTitle>
              <DialogDescription className="text-smalltext text-foreground/80">
                {mode === "code" && sentTo ? (
                  <>
                    We've sent a temporary passcode to <strong className="text-foreground">{sentTo}</strong>. Enter it below
                    and choose a password for your account.
                  </>
                ) : mode === "password" ? (
                  (notice ?? "Sign in with your email and password to continue where you left off.")
                ) : (
                  "We'll email you a temporary passcode. Then you choose a password, and you can continue on any device."
                )}
              </DialogDescription>
            </DialogHeader>

            {busy === "sending" && (
              <p className="flex items-center gap-2 text-smalltext text-foreground/80">
                <Spinner className="size-4 text-primary" /> Sending your passcode…
              </p>
            )}

            {mode === "email" && busy !== "sending" && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendCode(email.trim());
                }}
              >
                <Field label="Email">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </Field>
                <button type="submit" className={primaryClass} disabled={!email.trim()}>
                  Email me a passcode
                </button>
              </form>
            )}

            {mode === "code" && busy !== "sending" && (
              <form className="space-y-4" onSubmit={createPassword}>
                <Field label="Temporary passcode">
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className={`${inputClass} tracking-[0.3em]`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                  />
                </Field>
                <Field label="New password">
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    className={inputClass}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={`At least ${MIN_PASSWORD} characters`}
                  />
                </Field>
                <Field label="Confirm password">
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    className={inputClass}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </Field>
                <button type="submit" className={primaryClass} disabled={!!busy || !code.trim()}>
                  {busy === "saving" && <Spinner className="size-4" />}
                  {busy === "saving" ? "Saving…" : "Save password and sign in"}
                </button>
              </form>
            )}

            {mode === "password" && busy !== "sending" && (
              <form className="space-y-4" onSubmit={signInWithPassword}>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field label="Password">
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    className={inputClass}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <button type="submit" className={primaryClass} disabled={!!busy}>
                  {busy === "saving" && <Spinner className="size-4" />}
                  {busy === "saving" ? "Signing in…" : "Sign in"}
                </button>
              </form>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}
            {busy !== "sending" && forgotOrSwitch}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
