import type { AnswerValue, Answers, Question } from "./types";
import { questionText } from "./conditions";

// Options that mean "none of the above": picking one clears the others.
const EXCLUSIVE = new Set(["none", "dont_know", "not_sure"]);
const EXCLUSIVE_BY_QUESTION: Record<string, string[]> = { scope_users: ["internal"] };

const inputClass =
  "w-full px-4 py-3 bg-secondary text-[#0d0d0e] text-smalltext font-body focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-[#0d0d0e]/50";

function choiceClass(selected: boolean) {
  return [
    "px-4 py-3 border-2 text-left text-smalltext font-body transition-colors",
    selected
      ? "border-primary bg-primary text-black font-semibold"
      : "border-foreground/30 text-foreground hover:border-primary hover:text-primary",
  ].join(" ");
}

type Props = {
  question: Question;
  answers: Answers;
  onChange: (id: string, value: AnswerValue) => void;
  hint?: string | null;
  placeholder?: string | null;
  // Required and still unanswered after they pressed Next.
  missing?: boolean;
};

export function QuestionField({ question: q, answers, onChange, hint, placeholder, missing = false }: Readonly<Props>) {
  const value = answers[q.id];
  const labelId = `${q.id}-label`;

  const toggle = (option: string) => {
    const current = Array.isArray(value) ? value : [];
    if (current.includes(option)) return onChange(q.id, current.filter((v) => v !== option));
    const exclusive = EXCLUSIVE.has(option) || EXCLUSIVE_BY_QUESTION[q.id]?.includes(option);
    const kept = exclusive
      ? []
      : current.filter((v) => !EXCLUSIVE.has(v) && !EXCLUSIVE_BY_QUESTION[q.id]?.includes(v));
    onChange(q.id, [...kept, option]);
  };

  return (
    <fieldset
      id={`q-${q.id}`}
      className={`space-y-3 scroll-mt-32 ${missing ? "border-l-2 border-red-400 pl-4" : ""}`}
      aria-labelledby={labelId}
      aria-invalid={missing || undefined}
    >
      <legend id={labelId} className="text-body font-semibold text-foreground">
        {questionText(q, answers)}
        {q.required && (
          <>
            <span aria-hidden="true" className="ml-1 text-primary">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
        {!q.required && <span className="ml-2 text-smalltext font-normal text-foreground/50">(optional)</span>}
        {missing && <span className="ml-2 text-smalltext font-normal text-red-400">Required</span>}
      </legend>
      {q.subtitle && <p className="-mt-2 text-sm italic text-foreground/60">{q.subtitle}</p>}
      {hint && <p className="-mt-1 text-sm text-primary/90">{hint}</p>}

      {(q.type === "email" || q.type === "text") && (
        <input
          type={q.type === "email" ? "email" : "text"}
          autoComplete={q.type === "email" ? "email" : q.id === "intro_name" ? "name" : q.id === "intro_company" ? "organization" : "off"}
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          placeholder={placeholder ?? q.placeholder ?? ""}
          onChange={(e) => onChange(q.id, e.target.value)}
          aria-labelledby={labelId}
        />
      )}

      {q.type === "long_text" && (
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          value={typeof value === "string" ? value : ""}
          placeholder={placeholder ?? q.placeholder ?? "One per line"}
          onChange={(e) => onChange(q.id, e.target.value)}
          aria-labelledby={labelId}
        />
      )}

      {(q.type === "single" || q.type === "check") && (
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          className={q.type === "check" ? "flex flex-wrap gap-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}
        >
          {q.options?.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={value === o.value}
              className={`${choiceClass(value === o.value)} ${q.type === "check" ? "min-w-24 text-center" : ""}`}
              onClick={() => onChange(q.id, o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}

      {q.type === "multi" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-labelledby={labelId}>
          {q.options?.map((o) => {
            const selected = Array.isArray(value) && value.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                role="checkbox"
                aria-checked={selected}
                className={choiceClass(selected)}
                onClick={() => toggle(o.value)}
              >
                {o.label}
              </button>
            );
          })}
          <p className="text-sm text-foreground/50 sm:col-span-2">Pick all that apply.</p>
        </div>
      )}
    </fieldset>
  );
}
