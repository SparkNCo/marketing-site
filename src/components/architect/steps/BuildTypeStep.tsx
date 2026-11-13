"use client";

import { MultiSelectButtons } from "../MultiSelectButtons";
import { BUILD_TYPES, FUNCTIONALITIES } from "../constants";

type Props = {
  buildTypes: string[];
  functionalities: string[];
  onToggleBuildType: (value: string) => void;
  onToggleFunctionality: (value: string) => void;
};

export function BuildTypeStep({
  buildTypes,
  functionalities,
  onToggleBuildType,
  onToggleFunctionality,
}: Readonly<Props>) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-heading2 font-title font-bold text-foreground">
          What you&apos;re building
        </h3>
        <p className="text-smalltext text-foreground/70">
          Select everything that applies.
        </p>
      </div>

      <MultiSelectButtons
        options={BUILD_TYPES}
        selected={buildTypes}
        onToggle={onToggleBuildType}
      />

      <div className="space-y-3">
        <MultiSelectButtons
          label="Basic functionalities"
          options={FUNCTIONALITIES}
          selected={functionalities}
          onToggle={onToggleFunctionality}
        />
      </div>
    </div>
  );
}
