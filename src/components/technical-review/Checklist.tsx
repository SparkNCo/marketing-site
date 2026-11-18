import { isAnswered, isShown } from "./conditions";
import { QuestionField } from "./QuestionField";
import { Spinner } from "../ui/spinner";
import type { AnswerValue, Answers, IdeaEnrichment, Question } from "./types";

// /assessment checklist: one menu item per module, opened in any order, each
// with its own progress. Product scope, Governance and Data privacy come
// first (context for the plan); then the plan's areas (Building / MVP /
// Scaling) or the Idea question groups.

export type ChecklistSection = {
  key: string;
  title: string;
  questions: Question[];
  copy?: string;
  note?: string; // privacy note under the title
  // Context module: submitting it (leaving it) recalculates the plan.
  context?: boolean;
};

const primaryButtonClass =
  "px-6 py-3 bg-primary text-smalltext font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50";
const backButtonClass =
  "inline-flex items-center gap-2 text-smalltext font-semibold text-foreground/70 hover:text-primary transition-colors";

// Required questions on screen (all on screen when none are required), and
// how many have an answer.
export function sectionProgress(section: ChecklistSection, answers: Answers) {
  const shown = section.questions.filter((q) => isShown(q, answers));
  const counted = shown.some((q) => q.required) ? shown.filter((q) => q.required) : shown;
  const answered = counted.filter((q) => isAnswered(answers[q.id])).length;
  return { answered, total: counted.length, done: answered === counted.length };
}

const pad = (n: number) => String(n).padStart(2, "0");

function ProgressBar({ value, total, label }: Readonly<{ value: number; total: number; label: string }>) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div
      className="h-1.5 w-full bg-foreground/10"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ left = false }: Readonly<{ left?: boolean }>) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d={left ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type HomeProps = {
  sections: ChecklistSection[];
  answers: Answers;
  onOpen: (key: string) => void;
  onResults: () => void;
  loadingResults: boolean;
  error: string | null;
  bookingUrl: string;
  // False while the plan is still being worked out (no results yet).
  canFinish: boolean;
  updating: boolean;
  // Modules the last recalculation added or added questions to, with the
  // mark to show ("New", "+2 new questions").
  newKeys: Map<string, string>;
};

export function ChecklistHome({
  sections,
  answers,
  onOpen,
  onResults,
  loadingResults,
  error,
  bookingUrl,
  canFinish,
  updating,
  newKeys,
}: Readonly<HomeProps>) {
  const progress = sections.map((s) => sectionProgress(s, answers));
  const answered = progress.reduce((n, p) => n + p.answered, 0);
  const total = progress.reduce((n, p) => n + p.total, 0);
  const allDone = canFinish && progress.every((p) => p.done);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-smalltext uppercase tracking-[0.2em] text-primary">Your assessment checklist</p>
        <h1 className="text-heading1 font-bold leading-tight text-foreground md:text-[48px]">
          Build with confidence. <span className="text-foreground/60">Start with the foundations.</span>
        </h1>
        <p className="text-body text-foreground/85">
          These topics are picked for what you're building. Work through them in any order and at your own pace.
        </p>
        <div className="flex items-center gap-4">
          <ProgressBar value={answered} total={total} label="Overall progress" />
          <span className="shrink-0 text-smalltext text-foreground">
            {answered} <span className="text-foreground/60">of {total} answered</span>
          </span>
        </div>
      </header>

      {allDone && (
        <section className="flex flex-col gap-4 border-2 border-primary bg-primary/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-heading2 font-bold text-foreground">Your results are ready</h2>
            <p className="text-smalltext text-foreground/85">
              See your score, what to fix first, and an AGENTS.md file for your repository.
            </p>
          </div>
          <button type="button" className={`${primaryButtonClass} inline-flex shrink-0 items-center gap-2`} onClick={onResults} disabled={loadingResults}>
            {loadingResults && <Spinner className="size-4" />}
            {loadingResults ? "Building your report…" : "See my results"}
          </button>
        </section>
      )}
      {error && (
        <p role="alert" className="text-smalltext text-red-400">
          {error}
        </p>
      )}

      <section className="space-y-4" aria-labelledby="contents-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="contents-heading" className="text-heading2 font-bold text-foreground">
            Table of contents
          </h2>
          <span className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground/60">
            {updating && <Spinner className="size-3.5 text-primary" />}
            {updating ? "Updating your checklist…" : `${pad(sections.length)} topics`}
          </span>
        </div>
        <ul className="space-y-3">
          {sections.map((s, i) => {
            const p = progress[i];
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => onOpen(s.key)}
                  className="group flex w-full items-center gap-4 border border-foreground/15 bg-foreground/5 px-5 py-4 text-left transition-colors hover:border-primary"
                >
                  <span className="text-smalltext font-semibold text-foreground/50">{pad(i + 1)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-body font-semibold text-foreground group-hover:text-primary">{s.title}</span>
                      {newKeys.has(s.key) && (
                        <span className="bg-primary px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-black">
                          {newKeys.get(s.key)}
                        </span>
                      )}
                    </span>
                    {s.copy && <span className="block text-sm text-foreground/70">{s.copy}</span>}
                    <span className="block text-sm text-foreground/50">
                      {p.total} question{p.total === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 text-sm font-semibold ${
                      p.done ? "bg-primary text-black" : "border border-foreground/20 text-foreground/80"
                    }`}
                  >
                    {p.done && <CheckIcon />}
                    {p.answered} / {p.total}
                  </span>
                  <Chevron />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Off-white with black text, so it stands out on the dark page. */}
      <aside className="flex flex-col gap-4 bg-secondary p-6 text-[#0d0d0e] sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.2em] text-[#0d0d0e]/60">A little extra guidance</p>
          <h2 className="text-body font-bold text-[#0d0d0e]">Want a second set of eyes?</h2>
          <p className="text-smalltext text-[#0d0d0e]/80">Talk through your project with someone who's built for what comes next.</p>
        </div>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${primaryButtonClass} shrink-0 text-center`}>
          Book a consult
        </a>
      </aside>
    </div>
  );
}

type SectionProps = {
  section: ChecklistSection;
  index: number;
  count: number;
  answers: Answers;
  onChange: (id: string, value: AnswerValue) => void;
  onBack: () => void;
  onNext: (() => void) | null;
  // The last topic's button instead of Next: back to the checklist.
  onFinish: () => void;
  enrichment: IdeaEnrichment | null;
};

export function SectionView({
  section,
  index,
  count,
  answers,
  onChange,
  onBack,
  onNext,
  onFinish,
  enrichment,
}: Readonly<SectionProps>) {
  const p = sectionProgress(section, answers);
  const shown = section.questions.filter((q) => isShown(q, answers));

  return (
    <section className="space-y-8" aria-labelledby="section-title">
      <button type="button" className={backButtonClass} onClick={onBack}>
        <Chevron left /> All topics
      </button>

      <header className="space-y-3">
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground/60">
          Assessment <span className="h-px w-8 bg-foreground/30" aria-hidden="true" /> {pad(index + 1)} / {pad(count)}
        </p>
        <h1 id="section-title" className="text-heading1 font-bold leading-tight text-foreground md:text-[48px]">
          {section.title}
        </h1>
        {section.copy && <p className="text-body text-foreground/85">{section.copy}</p>}
        {section.note && <p className="border-l-2 border-primary pl-4 text-smalltext text-foreground/85">{section.note}</p>}
      </header>

      <div className="space-y-2">
        <div className="flex justify-between text-smalltext text-foreground/70">
          <span>Section progress</span>
          <span>
            <strong className="text-foreground">{p.answered}</strong> of {p.total} answered
          </span>
        </div>
        <ProgressBar value={p.answered} total={p.total} label="Section progress" />
      </div>

      <ol className="space-y-8">
        {shown.map((q) => (
          <li key={q.id}>
            <QuestionField
              question={q}
              answers={answers}
              onChange={onChange}
              hint={enrichment?.questions[q.id]?.hint}
              placeholder={enrichment?.questions[q.id]?.placeholder}
            />
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-6">
        <button type="button" className={backButtonClass} onClick={onBack}>
          <Chevron left /> Back to all topics
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground/50">Progress saves automatically</span>
          {p.done && (
            <button type="button" className={primaryButtonClass} onClick={onNext ?? onFinish}>
              {onNext ? "Next topic" : "Finish"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
