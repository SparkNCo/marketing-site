"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onManual: () => void;
  error?: string | null;
};

export function ProductIdeaStep({ value, onChange, onManual, error }: Readonly<Props>) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-heading2 font-title font-bold text-foreground">
          Product idea
        </h3>
        <p className="text-smalltext text-foreground/70">
          Tell us what you&apos;re building in a few sentences.
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. A mobile app that lets gym members track workouts and get AI nutrition plans, with push notifications and progress analytics..."
        className="min-h-40 w-full resize-none rounded-lg border border-foreground/20 bg-foreground/[0.04] p-4 text-body text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
      />

      {error ? <p className="text-smalltext text-red-400">{error}</p> : null}

      <p className="text-smalltext text-foreground/60">
        This input is used to pre-fill the rest of the form. If you&apos;d like
        to fill the form manually,{" "}
        <button
          type="button"
          onClick={onManual}
          className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
        >
          please click here
        </button>
        .
      </p>
    </div>
  );
}
