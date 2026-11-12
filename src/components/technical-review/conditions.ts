// In-page conditions ("(if yes) what did they say?"). Same logic as
// portal/supabase/functions/technical-review/engine/conditions.ts — keep both
// in sync. Everything else (which questions, scores, offers) is decided by the
// backend.
import type { Answers, Cond, Question } from "./types";

export function evalCond(cond: Cond, answers: Answers): boolean {
  if ("all" in cond) return cond.all.every((c) => evalCond(c, answers));
  if ("not" in cond) return !evalCond(cond.not, answers);
  const value = answers[cond.q];
  if ("in" in cond) return typeof value === "string" && cond.in.includes(value);
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return cond.anyOf.some((v) => list.includes(v));
}

export const isShown = (q: Question, answers: Answers) => !q.showIf || evalCond(q.showIf, answers);

export const questionText = (q: Question, answers: Answers) =>
  q.textVariants?.find((v) => evalCond(v.when, answers))?.text ?? q.text;

export function isAnswered(value: Answers[string]): boolean {
  if (Array.isArray(value)) return value.length > 0;
  return typeof value === "string" && value.trim() !== "";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The first problem on a page, or null when it can move on.
export function pageError(questions: Question[], answers: Answers): string | null {
  for (const q of questions) {
    if (!isShown(q, answers)) continue;
    const value = answers[q.id];
    if (q.required && !isAnswered(value)) return "Please answer every question marked as required.";
    if (q.type === "email" && isAnswered(value) && !EMAIL.test(String(value).trim())) return "Please enter a valid email.";
  }
  return null;
}
