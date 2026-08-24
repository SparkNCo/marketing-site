"use client";

export function IntroStep() {
  return (
    <div className="space-y-2">
      <h3 className="text-heading2 font-title font-bold text-foreground">
        Get your recommended architecture
      </h3>
      <p className="text-smalltext text-foreground/60">
        Takes about 2 minutes. No signup required.
      </p>
      <p className="pt-2 text-body leading-relaxed text-foreground/80">
        You&apos;ll describe the product, confirm what you&apos;re building, and
        tell us your team&apos;s expertise and priorities. We&apos;ll match you
        to a template stack we&apos;ve already built, with the reasoning behind
        each technical decision.
      </p>
    </div>
  );
}
