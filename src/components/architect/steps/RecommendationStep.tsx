"use client";

import { useState } from "react";
import { Check, Github, Loader2, Sparkles } from "lucide-react";
import type { RecommendationResult } from "../types";
import { MiniAxis } from "../MiniAxis";

type SendResult = { ok: boolean; delivered?: boolean; error?: string };

type Props = {
  loading: boolean;
  error: string | null;
  result: RecommendationResult | null;
  bookingUrl: string;
  onRetry: () => void;
  onSendEmail: (email: string) => Promise<SendResult>;
};

export function RecommendationStep({
  loading,
  error,
  result,
  bookingUrl,
  onRetry,
  onSendEmail,
}: Readonly<Props>) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<SendResult | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-body text-foreground/80">
          Analyzing your answers and matching a template stack…
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
        <p className="text-body text-red-400">
          {error ?? "We couldn't generate a recommendation."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-primary px-6 py-2 font-bold text-background"
        >
          Try again
        </button>
      </div>
    );
  }

  const { stack, writeup } = result;

  const handleSend = async () => {
    setEmailError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    const res = await onSendEmail(email.trim());
    setSending(false);
    if (res.ok) {
      setSent(res);
    } else {
      setEmailError(res.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-smalltext font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        One of our pre-built template stacks
      </span>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-heading2 font-title font-bold text-foreground">
            {stack.name}
          </h3>
          {stack.tagline ? (
            <p className="mt-1 text-body text-foreground/70">{stack.tagline}</p>
          ) : null}
        </div>
        <MiniAxis stack={stack} />
      </div>

      <p className="text-body leading-relaxed text-foreground/90">{writeup}</p>

      <div className="grid grid-cols-1 gap-3 rounded-lg border border-foreground/12 bg-foreground/[0.04] p-4 sm:grid-cols-3">
        <StackList title="Languages" items={stack.languages} />
        <StackList title="Frameworks" items={stack.frameworks} />
        <StackList title="Hosting" items={stack.hosting} />
      </div>

      {/* Email capture */}
      <div className="space-y-3 border-t border-foreground/12 pt-5">
        {sent ? (
          <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-4 text-foreground">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-smalltext">
              {sent.delivered
                ? "Sent! Check your inbox for a PDF with the reasoning behind these technical decisions and a link to the sample repo."
                : "Thanks! We've saved your request and will follow up with the PDF and sample repo link."}
            </p>
          </div>
        ) : (
          <>
            <p className="text-smalltext text-foreground/80">
              Enter your email to receive a PDF with the reasoning on these
              technical decisions, plus a link to the sample repo.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-lg border border-foreground/20 bg-foreground/[0.04] px-4 py-2.5 text-body text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-bold text-background transition hover:opacity-90 disabled:opacity-60"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send me the PDF"
                )}
              </button>
            </div>
            {emailError ? (
              <p className="text-smalltext text-red-400">{emailError}</p>
            ) : null}
            {stack.sample_repo_url ? (
              <a
                href={stack.sample_repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-smalltext font-medium text-foreground/70 hover:text-primary"
              >
                <Github className="h-4 w-4" />
                Preview the sample repo
              </a>
            ) : null}
          </>
        )}
      </div>

      {/* Booking */}
      <div className="border-t border-foreground/12 pt-5">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 transition hover:bg-primary/10"
        >
          <span className="text-body font-semibold text-foreground">
            Want to review your product? Book 20 minutes.
          </span>
          <span className="text-primary transition group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

function StackList({ title, items }: Readonly<{ title: string; items: string[] }>) {
  return (
    <div>
      <p className="mb-1 text-smalltext font-semibold uppercase tracking-wide text-primary">
        {title}
      </p>
      <p className="text-smalltext text-foreground/85">
        {items.length ? items.join(", ") : "—"}
      </p>
    </div>
  );
}
