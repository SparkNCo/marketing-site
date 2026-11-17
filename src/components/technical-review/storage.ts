// /assessment progress in this browser. Signing in adds a copy on the server
// (the same run, by reviewId), so it can continue on another device.
import type { Answers, Plan, Score } from "./types";

const KEY = "spark-assessment-v1";

export type SavedAssessment = {
  reviewId: string | null;
  answers: Answers;
  plan: Plan | null;
  prefilled: boolean;
  intakeIndex: number;
  intakeDone: boolean;
  score: Score | null;
  // Question IDs the score was last computed for (sorted, joined).
  scoredKey: string;
  // Context answers the plan was last computed for (see AssessmentFlow).
  plannedKey: string;
  leadTracked: boolean;
  // Checklist topic open when they left ("" = table of contents), so a
  // reload comes back to it.
  openSection: string;
  // Answers changed here and not saved to the run yet. When false, the
  // server's copy of the same run is as new or newer (e.g. they continued in
  // another browser), so signing in brings it here.
  dirty: boolean;
  updatedAt: string;
};

export const emptyAssessment = (): SavedAssessment => ({
  reviewId: null,
  answers: {},
  plan: null,
  prefilled: false,
  intakeIndex: 0,
  intakeDone: false,
  score: null,
  scoredKey: "",
  plannedKey: "",
  leadTracked: false,
  openSection: "",
  dirty: false,
  updatedAt: new Date(0).toISOString(),
});

export function loadAssessment(): SavedAssessment | null {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...emptyAssessment(), ...parsed } : null;
  } catch {
    return null;
  }
}

export function saveAssessment(state: SavedAssessment): void {
  try {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or storage full: progress just isn't kept on this device.
  }
}

export function clearAssessment(): void {
  try {
    globalThis.localStorage?.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
