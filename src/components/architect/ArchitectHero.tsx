"use client";

import { useState } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { ArchitectModal } from "./ArchitectModal";

export function ArchitectHero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-6 text-center lg:px-12">
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

      {/* The "form" that launches the diagnostic modal. */}
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-foreground/12 bg-foreground/[0.04] p-6 text-left shadow-sm">
        <p className="text-body font-semibold text-foreground">
          Get your recommended architecture
        </p>
        <p className="mt-1 text-smalltext text-foreground/60">
          Takes about 2 minutes. No signup required.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-body font-bold text-background transition hover:opacity-90"
        >
          Start the diagnostic
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <ArchitectModal open={open} onOpenChange={setOpen} />
    </section>
  );
}
