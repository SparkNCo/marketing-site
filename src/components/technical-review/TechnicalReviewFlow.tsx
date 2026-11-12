import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "./api";
import { isShown, pageError } from "./conditions";
import { QuestionField } from "./QuestionField";
import { Spinner } from "../ui/spinner";
import { ResultsView } from "./ResultsView";
import type { AnswerValue, Answers, IdeaEnrichment, Plan, Question, Questionnaire, Results } from "./types";

// The questionnaire, one page at a time:
// Intro → Stage → About → Scope → (Idea questions | T1–T3 → stage checks) → Results.
// The backend decides which questions to ask and scores the answers; this
// component only shows pages, checks required fields and saves as it goes.

type PageDef = { key: string; title: string; copy?: string; note?: string; questions: Question[] };

// Pages still to come in Building / MVP / Scaling before the plan is known,
// so the progress bar doesn't jump back.
const ESTIMATED_PLAN_PAGES = 7;

const buttonClass =
  "px-6 py-3 border-2 border-foreground text-smalltext font-semibold text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40";
const nextButtonClass =
  "px-6 py-3 bg-primary text-smalltext font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50";

const str = (v: AnswerValue | undefined) => (typeof v === "string" ? v.trim() : "");

function buildPages(qs: Questionnaire | null, stage: string | null, plan: Plan | null, prefilled: boolean): PageDef[] {
  if (!qs) return [];
  const isIdea = stage === "idea";
  const pages: PageDef[] = [
    { key: "intro", ...qs.intro },
    { key: "stage", ...qs.stage },
    {
      key: "about",
      title: qs.about.title,
      copy: qs.about.copy,
      note: qs.about.privacyNote,
      questions: isIdea ? qs.about.questions.idea : qs.about.questions.technical,
    },
    {
      key: "scope",
      title: qs.scope.title,
      copy: prefilled ? qs.scope.copy : "A few quick questions so we can skip what doesn't apply to you.",
      questions: qs.scope.questions,
    },
  ];
  if (!stage) return pages;
  if (isIdea) return [...pages, ...qs.idea.map((p, i) => ({ key: `idea-${i}`, ...p }))];
  return [
    ...pages,
    ...qs.intake.map((p, i) => ({ key: `intake-${i}`, ...p })),
    ...(plan?.sections ?? []).map((s) => ({ key: `area-${s.area}`, title: s.label, questions: s.questions })),
  ];
}

export function TechnicalReviewFlow() {
  const [qs, setQs] = useState<Questionnaire | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [prefilled, setPrefilled] = useState(false);
  const [enrichment, setEnrichment] = useState<IdeaEnrichment | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.questions().then(setQs, () => setLoadError("We couldn't load the questionnaire. Please refresh the page."));
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [index, results]);

  const stage = str(answers.stage) || null;
  const isIdea = stage === "idea";
  const pages = useMemo(() => buildPages(qs, stage, plan, prefilled), [qs, stage, plan, prefilled]);
  const page = pages[index];
  const lastIntakeKey = qs ? `intake-${qs.intake.length - 1}` : "";
  const isLastPage = !!page && index === pages.length - 1 && (isIdea || (!!plan && page.key.startsWith("area-")));

  const totalPages = pages.length + (stage && !isIdea && !plan ? ESTIMATED_PLAN_PAGES : 0) + (stage ? 0 : 6);
  const progress = results ? 100 : Math.round((index / Math.max(totalPages, 1)) * 100);

  function setAnswer(id: string, value: AnswerValue) {
    if (busy) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    // A different stage (or context) means different questions.
    if (id === "stage") {
      setPlan(null);
      setEnrichment(null);
    }
  }

  const pageAnswers = (p: PageDef): Answers =>
    Object.fromEntries(p.questions.filter((q) => answers[q.id] !== undefined).map((q) => [q.id, answers[q.id]]));

  async function next() {
    if (!page || busy) return;
    const problem = pageError(page.questions, answers);
    if (problem) return setError(problem);
    setError(null);

    const shown = page.questions.filter((q) => isShown(q, answers));
    const lastQuestion = shown[shown.length - 1]?.id;

    try {
      if (page.key === "intro") {
        if (!reviewId) {
          setBusy("Saving…");
          const started = await api.start({
            email: str(answers.intro_email),
            name: str(answers.intro_name),
            company: str(answers.intro_company) || undefined,
            role: str(answers.intro_role),
          });
          setReviewId(started.reviewId);
        }
        return setIndex(index + 1);
      }
      if (!reviewId) throw new Error("Please start from the first step.");
      const progressBody = { reviewId, answers: pageAnswers(page), lastQuestion };

      if (isLastPage) {
        setBusy("Building your report…");
        setResults(await api.complete(progressBody));
        return;
      }

      if (page.key === "about") {
        setBusy("Reading your description…");
        const { scope } = await api.prefill(progressBody);
        // Only fill what they haven't answered; they confirm on the next page.
        setAnswers((prev) => {
          const filled = { ...prev };
          for (const [id, value] of Object.entries(scope)) if (prev[id] === undefined) filled[id] = value;
          return filled;
        });
        setPrefilled(Object.keys(scope).length > 0);
      } else if (page.key === lastIntakeKey) {
        setBusy("Tailoring your questions…");
        setPlan((await api.plan(progressBody)).plan);
      } else {
        setBusy("Saving…");
        await api.progress(progressBody);
        if (page.key === "scope" && isIdea && !enrichment) {
          // Not awaited: the questions show their base wording until it's ready.
          api.enrich({ reviewId, answers: {} }).then(
            ({ enrichment: e }) => {
              setEnrichment(e);
              if (e.whoGuess) setAnswers((prev) => (prev.i3_who ? prev : { ...prev, i3_who: e.whoGuess ?? undefined }));
            },
            () => undefined,
          );
        }
      }
      setIndex(index + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  function back() {
    setError(null);
    setIndex((i) => Math.max(0, i - 1));
  }

  if (loadError) return <p className="text-body text-foreground">{loadError}</p>;
  if (!qs || !page) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-32 space-y-10">
      <div
        className="h-1.5 w-full bg-foreground/10"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
      >
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {results && reviewId ? (
        <ResultsView results={results} reviewId={reviewId} email={str(answers.intro_email)} />
      ) : (
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            void next();
          }}
        >
          <header className="space-y-3">
            <h1 className="text-heading1 font-bold leading-tight text-foreground md:text-[48px]">{page.title}</h1>
            {page.copy && <p className="text-body text-foreground/85">{page.copy}</p>}
            {page.note && <p className="border-l-2 border-primary pl-4 text-smalltext text-foreground/85">{page.note}</p>}
          </header>

          {/* Locked while Next is saving, so what's sent is what's on screen. */}
          <fieldset
            disabled={!!busy}
            aria-busy={!!busy}
            className={`space-y-8 transition-opacity ${busy ? "pointer-events-none opacity-60" : ""}`}
          >
            {page.questions
              .filter((q) => isShown(q, answers))
              .map((q) => (
                <QuestionField
                  key={q.id}
                  question={q}
                  answers={answers}
                  onChange={setAnswer}
                  hint={enrichment?.questions[q.id]?.hint}
                  placeholder={enrichment?.questions[q.id]?.placeholder}
                />
              ))}
          </fieldset>

          {error && (
            <p role="alert" className="text-smalltext text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {index > 0 && (
              <button type="button" className={buttonClass} onClick={back} disabled={!!busy}>
                Back
              </button>
            )}
            <button type="submit" className={`${nextButtonClass} inline-flex items-center gap-2`} disabled={!!busy}>
              {busy && <Spinner className="size-4" />}
              {busy ?? (isLastPage ? "See my report" : index === 0 ? "Start" : "Next")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
