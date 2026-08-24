"use client";

import { MultiSelectButtons } from "../MultiSelectButtons";
import { LANGUAGES, FRAMEWORKS, HOSTING } from "../constants";

type Props = {
  languages: string[];
  frameworks: string[];
  hosting: string[];
  onToggleLanguage: (value: string) => void;
  onToggleFramework: (value: string) => void;
  onToggleHosting: (value: string) => void;
};

export function TechExpertiseStep({
  languages,
  frameworks,
  hosting,
  onToggleLanguage,
  onToggleFramework,
  onToggleHosting,
}: Readonly<Props>) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-heading2 font-title font-bold text-foreground">
          Existing expertise
        </h3>
        <p className="text-smalltext text-foreground/70">
          Anything your team already has expertise, partnerships or cloud
          credits in. Leave blank if you&apos;re starting fresh.
        </p>
      </div>

      <MultiSelectButtons
        label="Languages"
        options={LANGUAGES}
        selected={languages}
        onToggle={onToggleLanguage}
      />
      <MultiSelectButtons
        label="Frameworks"
        options={FRAMEWORKS}
        selected={frameworks}
        onToggle={onToggleFramework}
      />
      <MultiSelectButtons
        label="Cloud & hosting"
        options={HOSTING}
        selected={hosting}
        onToggle={onToggleHosting}
      />
    </div>
  );
}
