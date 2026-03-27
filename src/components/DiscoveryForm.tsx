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

export default function DiscoveryForm({
  proposal,
  passcode,
  pageMode,
  setPageMode,
}: DiscoveryFormProps) {
  const [state, setState] = useState<DiscoveryFormState | null>(null);

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
    if (!proposal?.lead) return;

    setState({
      description: proposal.lead.description ?? "",
      estimateTime_min: proposal.lead.estimateTime_min ?? 1,
      estimateTime_max: proposal.lead.estimateTime_max ?? 6,
      budget_min: proposal.lead.budget_min ?? 1000,
      budget_max: proposal.lead.budget_max ?? 50000,
      formatted_date: proposal.lead.formatted_date ?? "",
      currentState: "",
    });
  }, [proposal]);

  if (!state) return null;

  const updateField =
    <K extends keyof DiscoveryFormState>(key: K) =>
    (value: DiscoveryFormState[K]) => {
      setState((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

  const formatReadableDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, "0")} - ${date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase()} - ${date.getFullYear()}`;
  };
  return (
    <section
      className="mt-0 lg:mt-28 mb-12 md:mb-16 px-0 sm:px-6 lg:px-8 
 "
    >
      {/* Container */}
      <div className="max-w-5xl mx-auto mt-8 lg:mt-32 ">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center gap-3 justify-center mt-3 ">
          <FileText className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-primary" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Discovery
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-center text-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          Here's an outline of what we'll be discussing on our call at{" "}
          <span className="text-primary font-bold">
            {formatReadableDate(state.formatted_date)}
          </span>
          . Please add as much detail as you can before we meet. See you soon!
        </p>

        {/* Card */}
        <Card className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 ">
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
          />

          {/* Features */}
          <FeaturesCollection
            proposal={proposal}
            submissionId={passcode}
            pageMode={pageMode}
            setPageMode={setPageMode}
            discoveryState={state}
          />
        </Card>
      </div>
    </section>
  );
}
