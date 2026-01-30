"use client";

import { FileText } from "lucide-react";
import { Card } from "./ui/card";
import { FeaturesCollection } from "./forms/features-collection";
import { Textarea } from "./ui/textarea";
import React, { useEffect, useState } from "react";
import { Slider } from "./ui/slider2";
import { cn } from "../../lib/utils";
import type { Proposal } from "./proposals/Proposal";

export type DiscoveryFormState = {
  description: string;
  estimateTime_min: number;
  estimateTime_max: number;
  budget_min: number;
  budget_max: number;
  formatted_date: string;
  currentState: string;
};

export type DiscoveryFormProps = {
  proposal: Proposal | null;
  passcode: string;
  pageMode: PageMode;
  setPageMode: (mode: PageMode) => void;
};

export default function DiscoveryForm({
  proposal,
  passcode,
  pageMode,
  setPageMode,
}: DiscoveryFormProps) {
  const isEditable = true;

  const [state, setState] = useState<DiscoveryFormState | null>(null);

  useEffect(() => {
    if (!proposal?.lead) return;

    setState({
      description: proposal.lead.description ?? "",
      estimateTime_min: proposal.lead.estimateTime_min ?? 1,
      estimateTime_max: proposal.lead.estimateTime_max ?? 6,
      budget_min: proposal.lead.budget_min ?? 5000,
      budget_max: proposal.lead.budget_max ?? 50000,
      formatted_date: proposal.lead.formatted_date ?? "",
      currentState: "", // 👈 always empty by default
    });
  }, [proposal]);

  if (!state) return null;

  const {
    description,
    estimateTime_min,
    estimateTime_max,
    budget_min,
    budget_max,
    formatted_date,
    currentState,
  } = state;

  const formatReadableDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const year = String(date.getFullYear());
    return `${day} - ${month} - ${year}`;
  };

  const updateField =
    <K extends keyof DiscoveryFormState>(key: K) =>
    (value: DiscoveryFormState[K]) => {
      setState((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

  return (
    <section className="mt-28 mb-16 w-[80vw] mx-auto p-8">
      {/* Header */}
      <div className="mb-8 mt-10 flex items-center gap-3 mx-auto w-fit">
        <FileText className="h-12 w-12 text-primary" />
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Discovery
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-2xl text-foreground font-title mb-8 mx-auto w-fit">
        Here's an outline of what we'll be discussing on our call at{" "}
        <span className="font-medium text-primary">
          {formatReadableDate(formatted_date)}
        </span>
        . Please add as much detail as you can before we meet. See you soon!
      </p>

      {/* Content */}
      <Card className="border-border bg-background p-8">
        <div className="space-y-8 text-2xl font-title">
          {/* Requirement Overview */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">
              Requirement Overview
            </h3>
            <Textarea
              value={description}
              onChange={(e) =>
                updateField("description")(e.target.value)
              }
              disabled={!isEditable}
              className={cn(
                "mt-3 min-h-48 rounded-lg bg-secondary p-4 pb-8 placeholder:text-body text-body focus:ring-2 focus:ring-primary",
                !isEditable && "opacity-60 cursor-not-allowed",
              )}
              placeholder="Describe the main requirements..."
            />
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">Timeline</h3>

            <Slider
              min={1}
              max={24}
              step={1}
              value={[estimateTime_min, estimateTime_max]}
              disabled={!isEditable}
              onValueChange={(value) => {
                updateField("estimateTime_min")(value[0]);
                updateField("estimateTime_max")(value[1]);
              }}
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                {estimateTime_min} Months
              </span>
              <span className="text-foreground">to</span>
              <span className="text-xl font-bold text-primary">
                {estimateTime_max} Months
              </span>
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">Budget</h3>

            <Slider
              min={5000}
              max={200000}
              step={5000}
              value={[budget_min, budget_max]}
              disabled={!isEditable}
              onValueChange={(value) => {
                updateField("budget_min")(value[0]);
                updateField("budget_max")(value[1]);
              }}
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                ${budget_min.toLocaleString()}
              </span>
              <span className="text-foreground">to</span>
              <span className="text-xl font-bold text-primary">
                ${budget_max.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Current State */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">
              Current State
            </h3>
            <Textarea
              value={currentState}
              onChange={(e) =>
                updateField("currentState")(e.target.value)
              }
              className="mt-3 min-h-48 rounded-lg bg-secondary p-4 pb-8 placeholder:text-body text-body focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body"
              placeholder="Current resources, tools, and any restrictions..."
            />
          </div>

          {/* Features */}
          <FeaturesCollection
            proposal={proposal}
            submissionId={passcode}
            pageMode={pageMode}
            setPageMode={setPageMode}
            discoveryState={state}
          />
        </div>
      </Card>
    </section>
  );
}
