import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../pages/api/submissions/server";
import { trackMetaPixel } from "../../lib/metaPixel";
import { api } from "./api";
import { AssessmentBar } from "./AssessmentBar";
import { ChecklistHome, SectionView, sectionProgress, type ChecklistSection } from "./Checklist";
import { isShown, missingRequired, pageError } from "./conditions";
import { QuestionField } from "./QuestionField";
import { ResultsView } from "./ResultsView";
import { clearAssessment, emptyAssessment, loadAssessment, saveAssessment, type SavedAssessment } from "./storage";
import { Spinner } from "../ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import type { AnswerValue, Answers, IdeaEnrichment, Question, Questionnaire, Results, ResumedReview } from "./types";

// /assessment (SPA-586):
//   1. Initial form, required: Intro → Stage → About → Scope (→ T1–T3 for
//      Building / MVP / Scaling). It decides which checklist topics show.
//   2. Checklist: one topic per plan area (or Idea question group), opened in
//      any order. The score (top right) updates when a topic is finished.
//   3. All topics done → results, with an AGENTS.md for their repository.
// Progress is kept in localStorage; signing in also lets them continue on
// another device. The backend decides the questions and scores.

type PageDef = { key: string; title: string; copy?: string; note?: string; questions: Question[] };
type View = { kind: "intake" } | { kind: "home" } | { kind: "section"; key: string } | { kind: "results" };

// Same default as the backend; the results carry the live link.
const BOOKING_URL = "https://cal.com/kabir-malkani-glnivq/consult";

const buttonClass =
  "px-6 py-3 border-2 border-foreground text-smalltext font-semibold text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40";
const nextButtonClass =
  "px-6 py-3 bg-primary text-smalltext font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50";
const linkClass = "text-sm text-foreground/60 underline hover:text-primary";

const str = (v: AnswerValue | undefined) => (typeof v === "string" ? v.trim() : "");
const TECH_STAGES = new Set(["building", "mvp", "scaling"]);

function intakePages(qs: Questionnaire | null, stage: string | null, prefilled: boolean): PageDef[] {
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
  if (!stage || isIdea) return pages;
  return [...pages, ...qs.intake.map((p, i) => ({ key: `intake-${i}`, ...p }))];
}

function checklistSections(qs: Questionnaire | null, state: SavedAssessment): ChecklistSection[] {
  if (!qs) return [];
  if (state.answers.stage === "idea") return qs.idea.map((p, i) => ({ key: `idea-${i}`, title: p.title, questions: p.questions }));
  return (state.plan?.sections ?? []).map((s) => ({ key: s.area, title: s.label, questions: s.questions }));
}

// Where a run from the server picks up: the first initial-form page with a
// missing answer, or the checklist when the form is done. The intro page is
// already done (the run exists); its answers live on the lead, not the run,
// so they come from `intro` (the resume response / the session's email).
function fromServer(review: ResumedReview, qs: Questionnaire, intro: Answers): SavedAssessment {
  const answers: Answers = { ...intro, ...review.answers };
  const stage = str(answers.stage) || null;
  const pages = intakePages(qs, stage, false);
  const firstMissing = pages.findIndex((p) => p.key !== "intro" && pageError(p.questions, answers) !== null);
  const formDone = firstMissing === -1 && (stage === "idea" || !!review.plan);
  return {
    ...emptyAssessment(),
    reviewId: review.reviewId,
    answers,
    plan: review.plan,
    prefilled: true,
    intakeIndex: formDone ? 0 : firstMissing === -1 ? pages.length - 1 : Math.max(firstMissing, 1),
    intakeDone: formDone,
    leadTracked: true, // tracked when they first finished the form
    updatedAt: review.updatedAt,
  };
}

// The same run on the server, with nothing unsaved here: the server is as
// new or newer, so its answers win. This browser keeps what only it has
// (intro answers, AI prefill guesses, the open topic). A different stage over
// there means different questions, so then the server's run replaces this one.
function mergeSameRun(local: SavedAssessment, review: ResumedReview, qs: Questionnaire, intro: Answers): SavedAssessment {
  const server = fromServer(review, qs, intro);
  if (str(review.answers.stage) && review.answers.stage !== local.answers.stage) {
    return { ...server, leadTracked: local.leadTracked };
  }
  const intakeDone = local.intakeDone || server.intakeDone;
  return {
    ...local,
    answers: { ...local.answers, ...review.answers },
    plan: review.plan ?? local.plan,
    intakeDone,
    intakeIndex: intakeDone ? 0 : Math.max(local.intakeIndex, server.intakeIndex),
    scoredSections: [], // score again with the merged answers
    dirty: false,
    updatedAt: review.updatedAt,
  };
}

export function AssessmentFlow() {
  const [qs, setQs] = useState<Questionnaire | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [state, setState] = useState<SavedAssessment>(emptyAssessment);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<View>({ kind: "intake" });
  const [enrichment, setEnrichment] = useState<IdeaEnrichment | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMissing, setShowMissing] = useState(false);
  const [session, setSession] = useState<{ token: string; email: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const update = (patch: Partial<SavedAssessment>) =>
    setState((s) => ({ ...s, ...patch, updatedAt: new Date().toISOString() }));

  // ── Load: questionnaire, this browser's progress, the session ────────────
  useEffect(() => {
    api.questions().then(setQs, () => setLoadError("We couldn't load the assessment. Please refresh the page."));
    const saved = loadAssessment();
    if (saved) {
      setState(saved);
      if (!saved.intakeDone) setView({ kind: "intake" });
      else setView(saved.openSection ? { kind: "section", key: saved.openSection } : { kind: "home" });
    }
    setHydrated(true);

    const apply = (s: { access_token: string; user: { email?: string } } | null) =>
      setSession(s ? { token: s.access_token, email: s.user.email ?? "" } : null);
    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => apply(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (hydrated) saveAssessment(state);
  }, [state, hydrated]);

  // Signed in: continue their newest run, unless this browser's is newer.
  // Checked on load and whenever they come back to the tab (they may have
  // continued in another browser meanwhile).
  const resumedFor = useRef<string | null>(null);
  const [resumeTick, setResumeTick] = useState(0);
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      resumedFor.current = null;
      setResumeTick((t) => t + 1);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);
  useEffect(() => {
    if (!session || !hydrated || !qs || resumedFor.current === session.email) return;
    resumedFor.current = session.email;
    api.resume(session.token).then(
      ({ review, intro }) => {
        const local = stateRef.current;
        if (!review) return;
        const introAnswers = { intro_email: session.email, ...intro };
        // Same run as this browser (e.g. continued in another browser).
        if (local.reviewId === review.reviewId) {
          // Unsaved changes here: keep them; the autosave sends them.
          if (local.dirty) return;
          const merged = mergeSameRun(local, review, qs, introAnswers);
          setState(merged);
          if (merged.intakeDone && !local.intakeDone) setView({ kind: "home" });
          if (!merged.intakeDone) setView({ kind: "intake" });
          return;
        }
        // A different run, or a fresh start after "Start a new assessment":
        // keep whichever was touched last (a new device is dated 1970).
        if (new Date(local.updatedAt) >= new Date(review.updatedAt)) return;
        const next = fromServer(review, qs, introAnswers);
        setState(next);
        setResults(null);
        setView(next.intakeDone ? { kind: "home" } : { kind: "intake" });
      },
      () => undefined,
    );
  }, [session, hydrated, qs, resumeTick]);

  useEffect(() => {
    setShowMissing(false);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view, state.intakeIndex]);

  // Remember the open topic, so a reload (F5) comes back to it. Not a change
  // to their answers, so updatedAt stays as it is.
  useEffect(() => {
    if (!hydrated) return;
    const openSection = view.kind === "section" ? view.key : "";
    setState((s) => (s.openSection === openSection ? s : { ...s, openSection }));
  }, [view, hydrated]);

  const stage = str(state.answers.stage) || null;
  const isIdea = stage === "idea";
  const isTech = !!stage && TECH_STAGES.has(stage);
  const pages = useMemo(() => intakePages(qs, stage, state.prefilled), [qs, stage, state.prefilled]);
  const sections = useMemo(() => checklistSections(qs, state), [qs, state.answers.stage, state.plan]);
  const completed = sections.filter((s) => sectionProgress(s, state.answers).done).map((s) => s.key);
  const completedKey = completed.join(",");

  // Idea: AI examples for the checklist wording (not stored; fetched again
  // after a reload).
  useEffect(() => {
    if (!isIdea || !state.intakeDone || !state.reviewId || enrichment) return;
    api.enrich({ reviewId: state.reviewId, answers: {} }).then(
      ({ enrichment: e }) => {
        setEnrichment(e);
        if (e.whoGuess && !stateRef.current.answers.i3_who) {
          setState((s) => ({ ...s, answers: { ...s.answers, i3_who: e.whoGuess ?? undefined } }));
        }
      },
      () => undefined,
    );
  }, [isIdea, state.intakeDone, state.reviewId, enrichment]);

  // ── Running score: when the set of finished topics changes ───────────────
  async function rescore(done: string[]) {
    const { reviewId, answers } = stateRef.current;
    if (!reviewId || !isTech) return;
    try {
      const score = await api.score(reviewId, answers, done);
      update({ score, scoredSections: done });
    } catch {
      // The score catches up on the next finished topic.
    }
  }
  useEffect(() => {
    if (!state.intakeDone || !isTech || !state.plan) return;
    if (completedKey !== state.scoredSections.join(",")) void rescore(completed);
  }, [completedKey, state.intakeDone, state.plan]);

  // ── Autosave the checklist answers to the run (for signing in elsewhere) ─
  useEffect(() => {
    if (!state.intakeDone || !state.reviewId) return;
    const reviewId = state.reviewId;
    const answers = state.answers;
    const t = setTimeout(() => {
      api.progress({ reviewId, answers }).then(
        // Saved, unless they changed something while it was sending.
        () => setState((s) => (s.answers === answers && s.dirty ? { ...s, dirty: false } : s)),
        () => undefined,
      );
    }, 1500);
    return () => clearTimeout(t);
  }, [state.answers, state.intakeDone, state.reviewId]);

  function setAnswer(id: string, value: AnswerValue) {
    if (busy) return;
    // A different stage means different questions.
    const stageChanged = id === "stage" && stateRef.current.answers.stage !== value;
    if (stageChanged) setEnrichment(null);
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [id]: value },
      dirty: true,
      ...(stageChanged && { plan: null, score: null, scoredSections: [], intakeDone: false }),
      updatedAt: new Date().toISOString(),
    }));
  }

  // The initial form is done: open the checklist. Lead event fires once.
  function finishIntake(patch: Partial<SavedAssessment>) {
    if (!stateRef.current.leadTracked) {
      trackMetaPixel("Lead", { content_name: "Spark Assessment", content_category: "Assessment Lead" });
    }
    update({ ...patch, intakeDone: true, intakeIndex: 0, leadTracked: true });
    setView({ kind: "home" });
  }

  // ── Initial form: one page at a time ─────────────────────────────────────
  const index = Math.min(state.intakeIndex, Math.max(pages.length - 1, 0));
  const page = pages[index];
  const isLastPage = !!page && !!stage && index === pages.length - 1;

  const pageAnswers = (p: PageDef): Answers =>
    Object.fromEntries(p.questions.filter((q) => state.answers[q.id] !== undefined).map((q) => [q.id, state.answers[q.id]]));

  async function next() {
    if (!page || busy) return;
    if (pageError(page.questions, state.answers)) {
      setError(null);
      setShowMissing(true);
      const first = missingRequired(page.questions, state.answers)[0];
      if (first) document.getElementById(`q-${first}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setShowMissing(false);
    setError(null);
    const shown = page.questions.filter((q) => isShown(q, state.answers));
    const lastQuestion = shown[shown.length - 1]?.id;
    const answers = state.answers;

    try {
      let reviewId = state.reviewId;
      if (page.key === "intro") {
        if (!reviewId) {
          setBusy("Saving…");
          reviewId = (
            await api.start({
              email: str(answers.intro_email),
              name: str(answers.intro_name),
              company: str(answers.intro_company) || undefined,
              role: str(answers.intro_role),
            })
          ).reviewId;
        }
        update({ reviewId, intakeIndex: index + 1, dirty: false });
        return;
      }
      if (!reviewId) throw new Error("Please start from the first step.");
      const progressBody = { reviewId, answers: pageAnswers(page), lastQuestion };

      if (page.key === "about") {
        setBusy("Reading your description…");
        const { scope } = await api.prefill(progressBody);
        // Only fill what they haven't answered; they confirm on the next page.
        const filled = { ...stateRef.current.answers };
        for (const [id, value] of Object.entries(scope)) if (filled[id] === undefined) filled[id] = value;
        update({ answers: filled, prefilled: Object.keys(scope).length > 0, intakeIndex: index + 1, dirty: false });
        return;
      }
      if (isLastPage && isTech) {
        setBusy("Tailoring your checklist…");
        const { plan } = await api.plan(progressBody);
        finishIntake({ plan, score: null, scoredSections: [], dirty: false });
        return;
      }
      setBusy("Saving…");
      await api.progress(progressBody);
      if (isLastPage && isIdea) finishIntake({ dirty: false });
      else update({ intakeIndex: index + 1, dirty: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  async function showResults() {
    const { reviewId, answers } = stateRef.current;
    if (!reviewId || busy) return;
    setBusy("Building your report…");
    setError(null);
    try {
      setResults(await api.complete({ reviewId, answers }));
      setView({ kind: "results" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  function startOver() {
    setConfirmReset(false);
    clearAssessment();
    // Dated now, so signing in doesn't bring back the run they just left.
    setState({ ...emptyAssessment(), updatedAt: new Date().toISOString() });
    setResults(null);
    setEnrichment(null);
    setView({ kind: "intake" });
  }

  async function signOut() {
    await supabase.auth.signOut();
    resumedFor.current = null;
  }

  // ── Render ───────────────────────────────────────────────────────────────
  if (loadError) return <p className="text-body text-foreground">{loadError}</p>;
  if (!qs || !hydrated) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  const bar = (
    <AssessmentBar
      score={state.score}
      showScore={isTech && state.intakeDone}
      sectionsDone={state.intakeDone ? completed.length : 0}
      sectionsTotal={state.intakeDone ? sections.length : 0}
      signedInEmail={session?.email || null}
      defaultEmail={str(state.answers.intro_email)}
      onSignOut={signOut}
    />
  );

  let body: React.ReactNode;
  if (view.kind === "results" && results && state.reviewId) {
    body = (
      <div className="space-y-6">
        <button type="button" className={linkClass} onClick={() => setView({ kind: "home" })}>
          ← Back to the checklist
        </button>
        <ResultsView results={results} reviewId={state.reviewId} email={str(state.answers.intro_email)} />
      </div>
    );
  } else if (view.kind === "section" && state.intakeDone && sections.some((s) => s.key === view.key)) {
    const i = sections.findIndex((s) => s.key === view.key);
    const section = sections[i];
    const leave = () => {
      // Changed answers in a finished topic count right away.
      if (section && sectionProgress(section, stateRef.current.answers).done) void rescore(completed);
    };
    body = section ? (
      <SectionView
        section={section}
        index={i}
        count={sections.length}
        answers={state.answers}
        onChange={setAnswer}
        enrichment={enrichment}
        onBack={() => {
          leave();
          setView({ kind: "home" });
        }}
        onNext={
          i < sections.length - 1
            ? () => {
                leave();
                setView({ kind: "section", key: sections[i + 1].key });
              }
            : null
        }
      />
    ) : null;
  } else if (view.kind !== "intake" && state.intakeDone) {
    body = (
      <div className="space-y-6">
        <ChecklistHome
          sections={sections}
          answers={state.answers}
          onOpen={(key) => setView({ kind: "section", key })}
          onResults={showResults}
          loadingResults={busy === "Building your report…"}
          error={error}
          bookingUrl={BOOKING_URL}
        />
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <button type="button" className={linkClass} onClick={() => setView({ kind: "intake" })}>
            Edit your project details
          </button>
          <button type="button" className={linkClass} onClick={() => setConfirmReset(true)}>
            Start a new assessment
          </button>
        </p>
        <StartOverDialog
          open={confirmReset}
          onOpenChange={setConfirmReset}
          onConfirm={startOver}
          signedIn={!!session}
        />
      </div>
    );
  } else if (page) {
    body = (
      <IntakePage
        page={page}
        index={index}
        total={stage ? pages.length : pages.length + (isIdea ? 0 : 2)}
        answers={state.answers}
        onChange={setAnswer}
        busy={busy}
        showMissing={showMissing}
        error={error}
        isLastPage={isLastPage}
        onNext={next}
        onBack={() => {
          setError(null);
          if (index === 0 && state.intakeDone) setView({ kind: "home" });
          else update({ intakeIndex: Math.max(0, index - 1) });
        }}
        canGoBack={index > 0 || state.intakeDone}
      />
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-32 space-y-10">
      {bar}
      {body}
    </div>
  );
}

// "Start a new assessment?" in the site's look, instead of the browser's
// confirm(). Escape, the overlay or Cancel close it.
function StartOverDialog({
  open,
  onOpenChange,
  onConfirm,
  signedIn,
}: Readonly<{ open: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; signedIn: boolean }>) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-none border-foreground/20 bg-background p-6 text-foreground font-body sm:p-8">
        <AlertDialogHeader className="gap-3">
          <AlertDialogTitle className="text-heading2 font-bold text-foreground">Start a new assessment?</AlertDialogTitle>
          <AlertDialogDescription className="text-smalltext text-foreground/80">
            Your current answers will be cleared and you'll start again from the first step.
            {signedIn && " You'll stay signed in."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 pt-2">
          <AlertDialogCancel className={`${buttonClass} h-auto rounded-none bg-transparent shadow-none hover:bg-transparent`}>
            Keep my answers
          </AlertDialogCancel>
          <AlertDialogAction className={`${nextButtonClass} h-auto rounded-none hover:bg-primary`} onClick={onConfirm}>
            Start over
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type IntakeProps = {
  page: PageDef;
  index: number;
  total: number;
  answers: Answers;
  onChange: (id: string, value: AnswerValue) => void;
  busy: string | null;
  showMissing: boolean;
  error: string | null;
  isLastPage: boolean;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
};

function IntakePage({ page, index, total, answers, onChange, busy, showMissing, error, isLastPage, onNext, onBack, canGoBack }: Readonly<IntakeProps>) {
  // Recomputed as they answer, so the message and highlights clear on their own.
  const validation = showMissing ? pageError(page.questions, answers) : null;
  const missing = new Set(showMissing ? missingRequired(page.questions, answers) : []);
  const message = validation ?? error;
  const pct = Math.round((index / Math.max(total, 1)) * 100);

  return (
    <form
      className="space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">
          A quick introduction · Step {index + 1} of {total}
        </p>
        <div
          className="h-1.5 w-full bg-foreground/10"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Initial form progress"
        >
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

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
            <QuestionField key={q.id} question={q} answers={answers} onChange={onChange} missing={missing.has(q.id)} />
          ))}
      </fieldset>

      {message && (
        <p role="alert" className="text-smalltext text-red-400">
          {message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {canGoBack && (
          <button type="button" className={buttonClass} onClick={onBack} disabled={!!busy}>
            Back
          </button>
        )}
        <button type="submit" className={`${nextButtonClass} inline-flex items-center gap-2`} disabled={!!busy}>
          {busy && <Spinner className="size-4" />}
          {busy ?? (isLastPage ? "Continue to your checklist" : index === 0 ? "Start" : "Next")}
        </button>
      </div>
      {index === 0 && <p className="text-sm text-foreground/50">No account needed. Your progress saves on this device.</p>}
    </form>
  );
}
