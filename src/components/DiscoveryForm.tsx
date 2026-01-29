"use client";

import { FileText } from "lucide-react";
import { Card } from "./ui/card";
import { FeaturesCollection } from "./forms/features-collection";
import { Textarea } from "./ui/textarea";
import React from "react";
import { Slider } from "./ui/slider2";
import { cn } from "../../lib/utils";

export type DiscoveryFormState = {
  requirementOverview: string;
  timelineRange: [number, number];
  budgetRange: [number, number];
  currentState: string;
};

export type DiscoveryFormProps = {
  proposal: Proposal | null;
  passcode: string;
  leadId: string;
  pageMode: PageMode;
  setPageMode: (mode: PageMode) => void;
  state: DiscoveryFormState | null;
  setState: React.Dispatch<React.SetStateAction<DiscoveryFormState | null>>;
};

export default function DiscoveryForm({
  proposal,
  passcode,
  pageMode,
  setPageMode,
  state,
  setState,
}: DiscoveryFormProps) {
  const isEditable = true;
  const { requirementOverview, timelineRange, budgetRange, currentState } =
    state;
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
          {formatReadableDate(proposal?.lead?.formatted_date)}
        </span>
        . Please add as much detail as you can before we meet. See you soon!
      </p>

      {/* Content */}
      <Card className="border-border bg-background p-8">
        <div className="space-y-8 text-2xl font-title">
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">
              Requirement Overview
            </h3>
            <Textarea
              value={requirementOverview}
              onChange={(e) =>
                updateField("requirementOverview")(e.target.value)
              }
              disabled={!isEditable}
              className={cn(
                "mt-3 min-h-48  rounded-lg bg-secondary p-4 pb-8 lg:placeholder:text-sm placeholder:text-body bg-secondary text-body focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body",
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
              value={timelineRange}
              disabled={!isEditable}
              onValueChange={(value) =>
                updateField("timelineRange")(value as [number, number])
              }
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                {timelineRange[0]} Months
              </span>
              <span className="text-foreground">to</span>
              <span className="text-xl font-bold text-primary">
                {timelineRange[1]} Months
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
              value={budgetRange}
              disabled={!isEditable}
              onValueChange={(value) =>
                updateField("budgetRange")(value as [number, number])
              }
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                ${budgetRange[0].toLocaleString()}
              </span>
              <span className="text-foreground">to</span>
              <span className="text-xl font-bold text-primary">
                ${budgetRange[1].toLocaleString()}
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
              onChange={(e) => updateField("currentState")(e.target.value)}
              className="mt-3 min-h-48  rounded-lg bg-secondary p-4 pb-8 lg:placeholder:text-sm placeholder:text-body bg-secondary text-body focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body"
              placeholder="Current resources, tools, and any restrictions..."
            />
          </div>

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
