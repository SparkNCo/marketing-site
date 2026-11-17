// Calls to the portal's `technical-review` Supabase function. All POST.
import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";
import type { Answers, IdeaEnrichment, Plan, Questionnaire, Results, ResumedReview, Score } from "./types";

const HEADERS = {
  "Content-Type": "application/json",
  apikey: import.meta.env.PUBLIC_SUPABASE_KEY,
  Authorization: `Bearer ${import.meta.env.PUBLIC_SUPABASE_KEY}`,
};

// A failed call: the backend's message, plus its status and `code` (e.g.
// "has_account" from /sign-in).
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
  }
}

// `token`: a signed-in user's access token, instead of the anon key.
async function post<T>(action: string, body: unknown = {}, token?: string): Promise<T> {
  const res = await fetch(supabaseFunctionsUrl(`technical-review/${action}`), {
    method: "POST",
    headers: token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(data?.error ?? "Something went wrong. Please try again.", res.status, data?.code);
  return data as T;
}

type Progress = { reviewId: string; answers: Answers; lastQuestion?: string };

export const api = {
  questions: () => post<Questionnaire>("questions"),
  start: (intro: { email: string; name: string; company?: string; role: string }) =>
    post<{ reviewId: string }>("start", intro),
  // The first page again on an existing run: updates the lead's details.
  intro: (reviewId: string, intro: { email: string; name: string; company?: string; role: string }) =>
    post<{ ok: true }>("intro", { reviewId, ...intro }),
  progress: (p: Progress) => post<{ ok: true }>("progress", p),
  prefill: (p: Progress) => post<{ scope: Answers }>("prefill", p),
  plan: (p: Progress) => post<{ plan: Plan }>("plan", p),
  enrich: (p: Progress) => post<{ enrichment: IdeaEnrichment }>("enrich", p),
  complete: (p: Progress) => post<Results>("complete", p),
  confirmEmail: (reviewId: string, email: string) =>
    post<{ ok: true; alreadySent?: boolean }>("confirm-email", { reviewId, email }),
  book: (reviewId: string, offer: string) => post<{ ok: true }>("book", { reviewId, offer }),
  // `completed`: question IDs of the finished modules.
  score: (reviewId: string, answers: Answers, completed: string[]) =>
    post<Score>("score", { reviewId, answers, completed }),
  // Emails a temporary passcode (409 "has_account": already a portal user).
  signIn: (email: string) => post<{ ok: true }>("sign-in", { email }),
  // `intro`: the first page's answers, kept on the lead rather than the run.
  resume: (token: string) => post<{ review: ResumedReview | null; intro?: Answers }>("resume", {}, token),
};
