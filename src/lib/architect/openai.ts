/**
 * Minimal OpenAI Chat Completions helper for the architect diagnostic.
 * Uses the platform `AIKEY` secret. Kept dependency-free (plain fetch) so it
 * works in the Astro/Vercel server runtime without extra bundle weight.
 */

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

function getApiKey(): string {
  const key = import.meta.env.AIKEY || import.meta.env.OPENAI_API_KEY;
  if (!key) throw new Error("AIKEY is not configured");
  return key as string;
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/** Call the model and return the raw assistant string. */
export async function chat(
  messages: ChatMessage[],
  opts: { json?: boolean; temperature?: number } = {},
): Promise<string> {
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: opts.temperature ?? 0.4,
      messages,
      ...(opts.json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI request failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

/** Call the model and parse the reply as JSON, tolerating code fences. */
export async function chatJson<T>(
  messages: ChatMessage[],
  opts: { temperature?: number } = {},
): Promise<T> {
  const raw = await chat(messages, { json: true, temperature: opts.temperature });
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}
