"use client";

import { FileText } from "lucide-react";
import { Card } from "./ui/card";
import { FeaturesCollection } from "./forms/features-collection";
import { useEffect, useState } from "react";
import type { AIResponse } from "./forms/product-idea-form";

import { RangeSliderSection } from "./discorveryForm/RangeSliderSection";
import { AnalyzedTextareaSection } from "./discorveryForm/AnalyzedTextareaSection";
import type {
  DiscoveryFormProps,
  DiscoveryFormState,
} from "./discorveryForm/DiscoveryFormProps";
import type { Feature } from "./forms/SortableFeatureCard";

export default function DiscoveryForm({
  proposal,
  passcode,
  pageMode,
  setPageMode,
  readOnly = false,
  features,
  discoveryState: discoveryStateProp,
  formatted_date,
}: DiscoveryFormProps & {
  readOnly?: boolean;
  features?: Feature[];
  discoveryState?: DiscoveryFormState;
  formatted_date?: string;
}) {
  const [state, setState] = useState<DiscoveryFormState | null>(
    discoveryStateProp ?? null,
  );

  const [analysis, setAnalysis] = useState<AIResponse>({
    audience: false,
    problem: false,
    idea: false,
    stage: false,
  });

  const [currentStateAnalysis, setCurrentStateAnalysis] = useState({
    user: false,
    capability: false,
    reason: false,
    limitations: false,
  });

  useEffect(() => {
    if (discoveryStateProp) return;
    if (!proposal?.lead) return;
    setState({
      description: proposal.lead.description ?? "",
      estimateTime_min: proposal.lead.estimateTime_min ?? 1,
      estimateTime_max: proposal.lead.estimateTime_max ?? 6,
      budget_min: proposal.lead.budget_min ?? 1000,
      budget_max: proposal.lead.budget_max ?? 50000,
      formatted_date: proposal.lead.formatted_date ?? undefined,
      currentState: "",
    });
  }, [proposal, discoveryStateProp, formatted_date]);

  if (!state) return null;

  const updateField =
    <K extends keyof DiscoveryFormState>(key: K) =>
    (value: DiscoveryFormState[K]) => {
      setState((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

  const formatReadableDate = (isoDate?: string) => {
    if (!isoDate) return "No date";

    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return "Invalid date";

    return `${String(date.getDate()).padStart(2, "0")} - ${date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase()} - ${date.getFullYear()}`;
  };
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 font-body">
      <div className="space-y-8 md:space-y-10 ">
        <header className="flex flex-col items-center gap-4 text-center text-foreground">
          <div className="flex items-center justify-center gap-3">
            <FileText
              className="h-8 w-8 shrink-0 text-primary md:h-9 md:w-9"
              aria-hidden
            />
            <h2 className="text-heading2 font-title font-bold tracking-tight text-foreground">
              Discovery
            </h2>
          </div>
          <p className="text-body max-w-2xl leading-relaxed text-foreground/90">
            Here&apos;s an outline of what we&apos;ll be discussing on our call
            at{" "}
            {state.formatted_date !== "" ? (
              <span className="font-semibold text-primary">
                {formatReadableDate(state.formatted_date)}
              </span>
            ) : (
              <span className="font-semibold text-primary">
                {formatReadableDate(formatted_date)}
              </span>
            )}
            . Please add as much detail as you can before we meet. See you soon!
          </p>
        </header>

        <Card className="space-y-6 border border-foreground/10 p-4 shadow-sm sm:p-6 md:space-y-8 md:p-8">
          {/* Description */}
          <AnalyzedTextareaSection
            title="Requirement Overview"
            value={state.description}
            onChange={updateField("description")}
            endpoint="/debounce?type=idea"
            analysis={analysis}
            setAnalysis={setAnalysis}
            tips={[
              { key: "audience", text: "Who is your target audience?" },
              { key: "problem", text: "What problem are you solving?" },
              { key: "idea", text: "Describe what your product does." },
              { key: "stage", text: "What stage is your business in?" },
            ]}
            placeholder="Describe the main requirements..."
            readOnly={readOnly}
          />

          {/* Timeline + Budget (GRID on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <RangeSliderSection
              title="Timeline"
              min={1}
              max={24}
              step={1}
              value={[state.estimateTime_min, state.estimateTime_max]}
              onChange={([min, max]) => {
                updateField("estimateTime_min")(min);
                updateField("estimateTime_max")(max);
              }}
              format={(v) => `${v} Months`}
              readOnly={readOnly}
            />

            <RangeSliderSection
              title="Budget"
              min={1000}
              max={50000}
              step={5000}
              value={[state.budget_min, state.budget_max]}
              onChange={([min, max]) => {
                updateField("budget_min")(min);
                updateField("budget_max")(max);
              }}
              format={(v) => `$${v.toLocaleString()}`}
              readOnly={readOnly}
            />
          </div>

          {/* Current State */}
          <AnalyzedTextareaSection
            title="Current State"
            value={state.currentState}
            onChange={updateField("currentState")}
            endpoint="/debounce?type=current-state"
            analysis={currentStateAnalysis}
            setAnalysis={setCurrentStateAnalysis}
            tips={[
              { key: "user", text: "Who will use the system?" },
              { key: "capability", text: "What capabilities exist?" },
              { key: "reason", text: "Why now?" },
              { key: "limitations", text: "Any limitations?" },
            ]}
            placeholder="Current resources, tools..."
            readOnly={readOnly}
          />

          {/* Features */}
          <FeaturesCollection
            proposal={proposal}
            submissionId={passcode}
            pageMode={pageMode}
            setPageMode={setPageMode}
            discoveryState={state}
            initialFeatures={features}
            readOnly={readOnly}
          />
        </Card>
      </div>
    </section>
  );
}
