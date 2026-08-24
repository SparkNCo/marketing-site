"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "../../../lib/utils";
import { EMPTY_ANSWERS } from "./types";
import type { ArchitectAnswers, PrefillResult, RecommendationResult } from "./types";
import { getBookingUrl } from "../../lib/booking";
import { ProductIdeaStep } from "./steps/ProductIdeaStep";
import { BuildTypeStep } from "./steps/BuildTypeStep";
import { TechExpertiseStep } from "./steps/TechExpertiseStep";
import { PriorityStep } from "./steps/PriorityStep";
import { RecommendationStep } from "./steps/RecommendationStep";

const STEPS = ["Idea", "Building", "Expertise", "Priorities", "Result"] as const;
const IDEA = 0;
const BUILD = 1;
const TECH = 2;
const PRIORITY = 3;
const RESULT = 4;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const uniqueMerge = (a: string[], b: string[] = []) =>
  Array.from(new Set([...a, ...b]));

type ArrayKey =
  | "buildTypes"
  | "functionalities"
  | "languages"
  | "frameworks"
  | "hosting";

export function ArchitectModal({ open, onOpenChange }: Readonly<Props>) {
  const [step, setStep] = useState(IDEA);
  const [answers, setAnswers] = useState<ArchitectAnswers>(EMPTY_ANSWERS);
  const [ideaError, setIdeaError] = useState<string | null>(null);
  const [prefilling, setPrefilling] = useState(false);

  const [recommending, setRecommending] = useState(false);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const bookingUrl = getBookingUrl();

  const toggle = (key: ArrayKey) => (value: string) => {
    setAnswers((prev) => {
      const list = prev[key];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [key]: next };
    });
  };

  const resetAll = () => {
    setStep(IDEA);
    setAnswers(EMPTY_ANSWERS);
    setResult(null);
    setRecommendError(null);
    setIdeaError(null);
  };

  const runPrefill = async () => {
    if (answers.productIdea.trim().length < 10) {
      setIdeaError("Please add a little more detail, or fill the form manually.");
      return;
    }
    setIdeaError(null);
    setPrefilling(true);
    try {
      const res = await fetch("/api/architect/prefill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIdea: answers.productIdea }),
      });
      if (res.ok) {
        const data: PrefillResult = await res.json();
        setAnswers((prev) => ({
          ...prev,
          buildTypes: uniqueMerge(prev.buildTypes, data.buildTypes),
          functionalities: uniqueMerge(prev.functionalities, data.functionalities),
          languages: uniqueMerge(prev.languages, data.languages),
          frameworks: uniqueMerge(prev.frameworks, data.frameworks),
          hosting: uniqueMerge(prev.hosting, data.hosting),
          priority: data.priority ?? prev.priority,
        }));
      }
    } catch (err) {
      console.error("prefill failed", err);
    } finally {
      setPrefilling(false);
      setStep(BUILD);
    }
  };

  const runRecommend = async () => {
    setStep(RESULT);
    setRecommending(true);
    setRecommendError(null);
    setResult(null);
    try {
      const res = await fetch("/api/architect/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("recommend failed");
      const data: RecommendationResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setRecommendError("We couldn't generate a recommendation. Please try again.");
    } finally {
      setRecommending(false);
    }
  };

  const sendEmail = async (email: string) => {
    if (!result) return { ok: false, error: "No recommendation yet." };
    try {
      const res = await fetch("/api/architect/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          stackName: result.stack.name,
          reasoning: result.reasoning,
          writeup: result.writeup,
          answers,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data?.error };
      return { ok: true, delivered: Boolean(data?.delivered) };
    } catch {
      return { ok: false, error: "Network error. Please try again." };
    }
  };

  const goNext = () => {
    if (step === IDEA) return runPrefill();
    if (step === PRIORITY) return runRecommend();
    setStep((s) => Math.min(RESULT, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(IDEA, s - 1));

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setTimeout(resetAll, 200);
      }}
    >
      <DialogContent className="max-h-[90vh] gap-0 overflow-hidden rounded-xl border-foreground/15 p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">Architecture diagnostic</DialogTitle>

        {/* Progress */}
        <div className="flex items-center gap-2 border-b border-foreground/10 px-6 py-4">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-primary" : "bg-foreground/15",
                )}
              />
            </div>
          ))}
        </div>

        <div className="max-h-[62vh] overflow-y-auto px-6 py-6">
          {step === IDEA && (
            <ProductIdeaStep
              value={answers.productIdea}
              onChange={(v) => setAnswers((p) => ({ ...p, productIdea: v }))}
              onManual={() => {
                setIdeaError(null);
                setStep(BUILD);
              }}
              error={ideaError}
            />
          )}

          {step === BUILD && (
            <BuildTypeStep
              buildTypes={answers.buildTypes}
              functionalities={answers.functionalities}
              onToggleBuildType={toggle("buildTypes")}
              onToggleFunctionality={toggle("functionalities")}
            />
          )}

          {step === TECH && (
            <TechExpertiseStep
              languages={answers.languages}
              frameworks={answers.frameworks}
              hosting={answers.hosting}
              onToggleLanguage={toggle("languages")}
              onToggleFramework={toggle("frameworks")}
              onToggleHosting={toggle("hosting")}
            />
          )}

          {step === PRIORITY && (
            <PriorityStep
              value={answers.priority}
              onChange={(v) => setAnswers((p) => ({ ...p, priority: v }))}
            />
          )}

          {step === RESULT && (
            <RecommendationStep
              loading={recommending}
              error={recommendError}
              result={result}
              bookingUrl={bookingUrl}
              onRetry={runRecommend}
              onSendEmail={sendEmail}
            />
          )}
        </div>

        {/* Footer nav */}
        {step !== RESULT && (
          <div className="flex items-center justify-between gap-3 border-t border-foreground/10 px-6 py-4">
            <button
              type="button"
              onClick={goBack}
              disabled={step === IDEA}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-smalltext font-medium text-foreground/70 transition hover:text-foreground disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={prefilling}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-background transition hover:opacity-90 disabled:opacity-60"
            >
              {prefilling ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  {step === IDEA
                    ? "Analyze & continue"
                    : step === PRIORITY
                      ? "See my stack"
                      : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
