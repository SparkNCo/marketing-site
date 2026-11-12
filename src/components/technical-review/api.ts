// Calls to the portal's `technical-review` Supabase function. All POST.
import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";
import type { Answers, IdeaEnrichment, Plan, Questionnaire, Results } from "./types";

const HEADERS = {
  "Content-Type": "application/json",
  apikey: import.meta.env.PUBLIC_SUPABASE_KEY,
  Authorization: `Bearer ${import.meta.env.PUBLIC_SUPABASE_KEY}`,
};

async function post<T>(action: string, body: unknown = {}): Promise<T> {
  const res = await fetch(supabaseFunctionsUrl(`technical-review/${action}`), {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Something went wrong. Please try again.");
  return data as T;
}

type Progress = { reviewId: string; answers: Answers; lastQuestion?: string };

export const api = {
  questions: () => post<Questionnaire>("questions"),
  start: (intro: { email: string; name: string; company?: string; role: string }) =>
    post<{ reviewId: string }>("start", intro),
  progress: (p: Progress) => post<{ ok: true }>("progress", p),
  prefill: (p: Progress) => post<{ scope: Answers }>("prefill", p),
  plan: (p: Progress) => post<{ plan: Plan }>("plan", p),
  enrich: (p: Progress) => post<{ enrichment: IdeaEnrichment }>("enrich", p),
  complete: (p: Progress) => post<Results>("complete", p),
  confirmEmail: (reviewId: string, email: string) =>
    post<{ ok: true; alreadySent?: boolean }>("confirm-email", { reviewId, email }),
  book: (reviewId: string, offer: string) => post<{ ok: true }>("book", { reviewId, offer }),
};
