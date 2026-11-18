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
import type { AnswerValue, Answers, IdeaEnrichment, Plan, Questionnaire, Results, ResumedReview } from "./types";

// /assessment (SPA-586):
//   1. First page, required: name, email, company, role and stage.
//   2. Checklist: Product scope, Governance (not in Idea) and Data privacy,
//      then the plan's areas (or the Idea question groups), in any order.
//      Finishing a context module recalculates the plan, which can add
//      modules or questions. The score (top right) updates when a module is
//      finished; only Yes / No / Unsure checks count.
//   3. All modules done → results, with an AGENTS.md for their repository.
// Progress is kept in localStorage; signing in also lets them continue on
// another device. The backend decides the questions and scores.

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

function checklistSections(qs: Questionnaire | null, stage: string | null, plan: Plan | null): ChecklistSection[] {
  if (!qs || !stage) return [];
  const c = qs.checklist;
  const isIdea = stage === "idea";
  const merged = plan?.sections.find((s) => s.area === c.dataPrivacy.mergesArea);
  const productScope: ChecklistSection = {
    key: c.productScope.key,
    title: c.productScope.title,
    copy: c.productScope.copy,
    note: c.productScope.privacyNote,
    questions: isIdea ? c.productScope.questions.idea : c.productScope.questions.technical,
    context: true,
  };
  const governance: ChecklistSection = { ...c.governance, context: true };
  const dataPrivacy: ChecklistSection = {
    key: c.dataPrivacy.key,
    title: c.dataPrivacy.title,
    copy: c.dataPrivacy.copy,
    questions: [...c.dataPrivacy.questions, ...(merged?.questions ?? [])],
    context: true,
  };
  if (isIdea) {
    return [productScope, dataPrivacy, ...qs.idea.map((p, i) => ({ key: `idea-${i}`, title: p.title, questions: p.questions }))];
  }
  const areas = (plan?.sections ?? [])
    .filter((s) => s !== merged)
    .map((s) => ({ key: s.area, title: s.label, questions: s.questions }));
  return [productScope, governance, dataPrivacy, ...areas];
}

// The plan depends on the answers of the finished context modules, the
// free text included (the AI reads it), not on the checks merged into Data
// privacy.
function planKeyOf(qs: Questionnaire | null, sections: ChecklistSection[], answers: Answers): string {
  if (!qs) return "";
  const c = qs.checklist;
  const contextIds = new Set(
    [...c.productScope.questions.technical, ...c.productScope.questions.idea, ...c.governance.questions, ...c.dataPrivacy.questions].map(
      (q) => q.id,
    ),
  );
  return sections
    .filter((s) => s.context && sectionProgress(s, answers).done)
    .map((s) => {
      const inputs = s.questions.filter((q) => contextIds.has(q.id));
      return `${s.key}=${JSON.stringify(inputs.map((q) => [q.id, answers[q.id] ?? null]))}`;
    })
    .join("|");
}

// A run from the server. The first page is done once the run has a stage;
// its other answers live on the lead, not the run, so they come from `intro`.
function fromServer(review: ResumedReview, intro: Answers): SavedAssessment {
  const answers: Answers = { ...intro, ...review.answers };
  return {
    ...emptyAssessment(),
    reviewId: review.reviewId,
    answers,
    plan: review.plan,
    intakeDone: !!str(answers.stage),
    leadTracked: true, // tracked when they first finished the first page
    updatedAt: review.updatedAt,
  };
}

// The same run on the server, with nothing unsaved here: the server is as
// new or newer, so its answers win. This browser keeps what only it has
// (intro answers, the open module). A different stage
// over there means different questions, so then the server's run replaces it.
function mergeSameRun(local: SavedAssessment, review: ResumedReview, intro: Answers): SavedAssessment {
  if (str(review.answers.stage) && review.answers.stage !== local.answers.stage) {
    return { ...fromServer(review, intro), leadTracked: local.leadTracked };
  }
  return {
    ...local,
    answers: { ...local.answers, ...review.answers },
    plan: review.plan ?? local.plan,
    intakeDone: local.intakeDone || !!str(review.answers.stage),
    scoredKey: "", // score again with the merged answers
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
  const [planning, setPlanning] = useState(false);
  const [planRetry, setPlanRetry] = useState(0);
  // Modules the last recalculation added ("New") or added questions to
  // ("+2 new questions"), marked in the table of contents until opened.
  const [newKeys, setNewKeys] = useState<Map<string, string>>(new Map());
  const topRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const update = (patch: Partial<SavedAssessment>) =>
    setState((s) => ({ ...s, ...patch, updatedAt: new Date().toISOString() }));

  // ── Load: questionnaire, this browser's progress, the session ────────────
  useEffect(() => {
    api.questions().then(
      (q) =>
        // An older backend has no checklist modules yet (deploy order).
        q.checklist ? setQs(q) : setLoadError("The assessment is being updated. Please try again in a few minutes."),
      () => setLoadError("We couldn't load the assessment. Please refresh the page."),
    );
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
          const merged = mergeSameRun(local, review, introAnswers);
          setState(merged);
          if (merged.intakeDone && !local.intakeDone) setView({ kind: "home" });
          if (!merged.intakeDone) setView({ kind: "intake" });
          return;
        }
        // A different run, or a fresh start after "Start a new assessment":
        // keep whichever was touched last (a new device is dated 1970).
        if (new Date(local.updatedAt) >= new Date(review.updatedAt)) return;
        const next = fromServer(review, introAnswers);
        setState(next);
        setResults(null);
        setView(next.intakeDone ? { kind: "home" } : { kind: "intake" });
      },
      () => undefined,
    );
  }, [session, hydrated, qs, resumeTick]);

  // Signed in before the first page (it can be the first thing they do):
  // their account's email fills the empty email field.
  useEffect(() => {
    if (!session?.email || str(stateRef.current.answers.intro_email)) return;
    setState((s) => ({ ...s, answers: { ...s.answers, intro_email: session.email } }));
  }, [session?.email]);

  useEffect(() => {
    setShowMissing(false);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view]);

  // Remember the open module, so a reload (F5) comes back to it. Not a
  // change to their answers, so updatedAt stays as it is.
  useEffect(() => {
    if (!hydrated) return;
    const openSection = view.kind === "section" ? view.key : "";
    setState((s) => (s.openSection === openSection ? s : { ...s, openSection }));
  }, [view, hydrated]);

  const stage = str(state.answers.stage) || null;
  const isIdea = stage === "idea";
  const isTech = !!stage && TECH_STAGES.has(stage);
  const sections = useMemo(() => checklistSections(qs, stage, state.plan), [qs, stage, state.plan]);
  const done = sections.filter((s) => sectionProgress(s, state.answers).done);
  const completedKey = done
    .flatMap((s) => s.questions.map((q) => q.id))
    .sort()
    .join(",");
  const planKey = planKeyOf(qs, sections, state.answers);
  const planUpToDate = !!state.plan && planKey === state.plannedKey;
  // Inside a context module the plan waits: it's recalculated when they
  // submit it (leave it with Back or Next), not while they type.
  const inContextModule = view.kind === "section" && !!sections.find((s) => s.key === view.key)?.context;
  const scopeDone = !!sections[0] && done.includes(sections[0]);

  // ── Plan: on the first visit, then each time a context module is
  //    submitted with changed answers. The backend applies the rules and
  //    asks the AI whether the answers call for more modules or questions.
  useEffect(() => {
    if (!isTech || !state.intakeDone || !state.reviewId || planUpToDate) return;
    if (state.plan && inContextModule) return;
    const reviewId = state.reviewId;
    const key = planKey;
    const hadPlan = !!state.plan;
    setPlanning(true);
    const before = new Map(
      checklistSections(qs, stage, stateRef.current.plan).map((s) => [s.key, new Set(s.questions.map((q) => q.id))]),
    );
    api
      .plan({ reviewId, answers: stateRef.current.answers })
      .then(
        ({ plan }) => {
          setState((s) => ({ ...s, plan, plannedKey: key }));
          if (!hadPlan) return;
          const marks = new Map<string, string>();
          for (const s of checklistSections(qs, stage, plan)) {
            const had = before.get(s.key);
            if (!had) {
              marks.set(s.key, "New");
              continue;
            }
            const added = s.questions.filter((q) => !had.has(q.id)).length;
            if (added) marks.set(s.key, `+${added} new question${added === 1 ? "" : "s"}`);
          }
          if (marks.size) setNewKeys(marks);
        },
        // Try again shortly: results wait for an up-to-date plan.
        () => setTimeout(() => setPlanRetry((n) => n + 1), 5000),
      )
      .finally(() => setPlanning(false));
  }, [isTech, state.intakeDone, state.reviewId, planKey, planUpToDate, inContextModule, planRetry]);

  // ── Running score: when the set of finished modules changes ─────────────
  async function rescore(key: string) {
    const { reviewId, answers } = stateRef.current;
    if (!reviewId || !isTech) return;
    try {
      const score = await api.score(reviewId, answers, key ? key.split(",") : []);
      setState((s) => ({ ...s, score, scoredKey: key }));
    } catch {
      // The score catches up on the next finished module.
    }
  }
  useEffect(() => {
    if (!isTech || !state.intakeDone || !state.reviewId || completedKey === state.scoredKey) return;
    void rescore(completedKey);
  }, [completedKey, isTech, state.intakeDone, state.reviewId, state.scoredKey]);

  // Idea: AI examples for the question wording, once Product scope is done
  // (not stored; fetched again after a reload).
  useEffect(() => {
    if (!isIdea || !scopeDone || !state.reviewId || enrichment) return;
    api.enrich({ reviewId: state.reviewId, answers: state.answers }).then(
      ({ enrichment: e }) => {
        setEnrichment(e);
        if (e.whoGuess && !stateRef.current.answers.i3_who) {
          setState((s) => ({ ...s, answers: { ...s.answers, i3_who: e.whoGuess ?? undefined } }));
        }
      },
      () => undefined,
    );
  }, [isIdea, scopeDone, state.reviewId, enrichment]);

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
    if (stageChanged) {
      setEnrichment(null);
      setNewKeys(new Map());
    }
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [id]: value },
      dirty: true,
      ...(stageChanged && { plan: null, plannedKey: "", score: null, scoredKey: "", intakeDone: false }),
      updatedAt: new Date().toISOString(),
    }));
  }

  // ── First page ───────────────────────────────────────────────────────────
  const intro = qs?.checklist.intro;

  async function next() {
    if (!intro || busy) return;
    if (pageError(intro.questions, state.answers)) {
      setError(null);
      setShowMissing(true);
      const first = missingRequired(intro.questions, state.answers)[0];
      if (first) document.getElementById(`q-${first}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setShowMissing(false);
    setError(null);
    const answers = state.answers;
    setBusy("Saving…");
    try {
      const introDetails = {
        email: str(answers.intro_email),
        name: str(answers.intro_name),
        company: str(answers.intro_company) || undefined,
        role: str(answers.intro_role),
      };
      let reviewId = state.reviewId;
      // New run: creates the lead. Existing run (they edited their details):
      // updates it, so the report and the sign-in passcode use this email.
      if (reviewId) await api.intro(reviewId, introDetails);
      else reviewId = (await api.start(introDetails)).reviewId;
      await api.progress({ reviewId, answers: { stage: answers.stage }, lastQuestion: "stage" });
      // Done: open the checklist. The Lead event fires once.
      if (!stateRef.current.leadTracked) {
        trackMetaPixel("Lead", { content_name: "Spark Assessment", content_category: "Assessment Lead" });
      }
      update({ reviewId, intakeDone: true, leadTracked: true, dirty: false });
      setView({ kind: "home" });
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
    setNewKeys(new Map());
    setView({ kind: "intake" });
  }

  async function signOut() {
    await supabase.auth.signOut();
    resumedFor.current = null;
  }

  // ── Render ───────────────────────────────────────────────────────────────
  if (loadError) return <p className="text-body text-foreground">{loadError}</p>;
  if (!qs || !intro || !hydrated) {
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
      sectionsDone={state.intakeDone ? done.length : 0}
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
      // Changed answers in a finished module count right away.
      if (section && sectionProgress(section, stateRef.current.answers).done) void rescore(completedKey);
      setNewKeys((keys) => {
        if (!keys.has(view.key)) return keys;
        const rest = new Map(keys);
        rest.delete(view.key);
        return rest;
      });
    };
    body = (
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
        // Last topic: back to the checklist, and never a re-check — new
        // questions right after "Finish" would feel like it never ends. The
        // current plan is taken as final (the last topic is a stage area
        // anyway: the context modules come first). Results still score
        // exactly what they answered.
        onFinish={() => {
          leave();
          setState((s) => (s.plan ? { ...s, plannedKey: planKey } : s));
          setView({ kind: "home" });
        }}
      />
    );
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
          canFinish={isIdea || (planUpToDate && !planning)}
          updating={planning}
          newKeys={newKeys}
        />
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <button type="button" className={linkClass} onClick={() => setView({ kind: "intake" })}>
            Edit your details
          </button>
          <button type="button" className={linkClass} onClick={() => setConfirmReset(true)}>
            Start a new assessment
          </button>
        </p>
        <StartOverDialog open={confirmReset} onOpenChange={setConfirmReset} onConfirm={startOver} signedIn={!!session} />
      </div>
    );
  } else {
    body = (
      <IntakePage
        title={intro.title}
        copy={intro.copy}
        questions={intro.questions}
        answers={state.answers}
        onChange={setAnswer}
        busy={busy}
        showMissing={showMissing}
        error={error}
        onNext={next}
        onBack={state.intakeDone ? () => setView({ kind: "home" }) : null}
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
// confirm(). Escape or Cancel close it.
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
  title: string;
  copy?: string;
  questions: Questionnaire["checklist"]["intro"]["questions"];
  answers: Answers;
  onChange: (id: string, value: AnswerValue) => void;
  busy: string | null;
  showMissing: boolean;
  error: string | null;
  onNext: () => void;
  // Set when they came back to edit their details from the checklist.
  onBack: (() => void) | null;
};

function IntakePage({ title, copy, questions, answers, onChange, busy, showMissing, error, onNext, onBack }: Readonly<IntakeProps>) {
  // Recomputed as they answer, so the message and highlights clear on their own.
  const validation = showMissing ? pageError(questions, answers) : null;
  const missing = new Set(showMissing ? missingRequired(questions, answers) : []);
  const message = validation ?? error;

  return (
    <form
      className="space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">A quick introduction</p>
        <h1 className="text-heading1 font-bold leading-tight text-foreground md:text-[48px]">{title}</h1>
        {copy && <p className="text-body text-foreground/85">{copy}</p>}
      </header>

      {/* Locked while saving, so what's sent is what's on screen. */}
      <fieldset
        disabled={!!busy}
        aria-busy={!!busy}
        className={`space-y-8 transition-opacity ${busy ? "pointer-events-none opacity-60" : ""}`}
      >
        {questions
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
        {onBack && (
          <button type="button" className={buttonClass} onClick={onBack} disabled={!!busy}>
            Back
          </button>
        )}
        <button type="submit" className={`${nextButtonClass} inline-flex items-center gap-2`} disabled={!!busy}>
          {busy && <Spinner className="size-4" />}
          {busy ?? "Continue to your checklist"}
        </button>
      </div>
      {!onBack && <p className="text-sm text-foreground/50">No account needed. Your progress saves on this device.</p>}
    </form>
  );
}
