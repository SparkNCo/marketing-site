"use client";

import { Compass } from "lucide-react";
import { ArchitectDiagnostic } from "./ArchitectDiagnostic";

export function ArchitectHero() {
  return (
    <section className="mx-auto max-w-3xl px-6 lg:px-12">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-smalltext font-semibold text-primary">
          <Compass className="h-4 w-4" />
          Architecture diagnostic
        </div>

        <h1 className="text-heading1 font-title font-bold leading-tight text-foreground md:text-[56px]">
          Building a new software product?
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-largeBody leading-relaxed text-foreground/80 md:text-heading2">
          Answer a few quick questions and we&apos;ll recommend one of the
          template stacks we&apos;ve already built — with the reasoning behind
          every technical decision.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <ArchitectDiagnostic />
      </div>
    </section>
  );
}
