import type { APIRoute } from "astro";
import { chatJson } from "../../../lib/architect/openai";
import type { PrefillResult } from "../../../components/architect/types";
import {
  BUILD_TYPES,
  FUNCTIONALITIES,
  LANGUAGES,
  FRAMEWORKS,
  HOSTING,
} from "../../../components/architect/constants";

export const prerender = false;

type RawPrefill = {
  buildTypes?: unknown;
  functionalities?: unknown;
  languages?: unknown;
  frameworks?: unknown;
  hosting?: unknown;
  priority?: { x?: unknown; y?: unknown };
};

/** Keep only values that exist in the provided option catalogue. */
function keepKnown(value: unknown, allowed: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const set = new Set(allowed.map((a) => a.toLowerCase()));
  const out: string[] = [];
  for (const v of value) {
    const s = String(v);
    const canonical = allowed.find((a) => a.toLowerCase() === s.toLowerCase());
    if (canonical && set.has(canonical.toLowerCase()) && !out.includes(canonical)) {
      out.push(canonical);
    }
  }
  return out;
}

function clampAxis(v: unknown): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(-1, Math.min(1, n));
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const productIdea = typeof body?.productIdea === "string" ? body.productIdea : "";

    if (productIdea.trim().length < 10) {
      return json({ error: "Please describe your product idea in a bit more detail." }, 400);
    }

    const ai = await chatJson<RawPrefill>([
      {
        role: "system",
        content:
          "You extract structured product requirements from a founder's free-text idea. Only use the exact option strings provided. Respond as strict JSON.",
      },
      {
        role: "user",
        content: `Founder's product idea:\n"""${productIdea}"""\n\nMap it to these options (use only the exact strings, omit anything not clearly implied):\n- buildTypes (choose from): ${BUILD_TYPES.join(", ")}\n- functionalities (choose from): ${FUNCTIONALITIES.join(", ")}\n- languages (only if the idea clearly implies existing expertise/preference; choose from): ${LANGUAGES.join(", ")}\n- frameworks (same rule; choose from): ${FRAMEWORKS.join(", ")}\n- hosting (same rule; choose from): ${HOSTING.join(", ")}\n- priority: an object { "x": number, "y": number } where x is -1 (needs deep customizability) to 1 (needs fast delivery), and y is -1 (wants an all-in-one integrated platform) to 1 (needs portability / vendor independence).\n\nReturn JSON with those keys. Arrays may be empty.`,
      },
    ]);

    const result: PrefillResult = {
      buildTypes: keepKnown(ai.buildTypes, BUILD_TYPES),
      functionalities: keepKnown(ai.functionalities, FUNCTIONALITIES),
      languages: keepKnown(ai.languages, LANGUAGES),
      frameworks: keepKnown(ai.frameworks, FRAMEWORKS),
      hosting: keepKnown(ai.hosting, HOSTING),
      priority: {
        x: clampAxis(ai.priority?.x),
        y: clampAxis(ai.priority?.y),
      },
    };

    return json(result);
  } catch (err) {
    console.error("[architect/prefill] error:", err);
    return json({ error: "Could not analyze that idea. You can fill the form manually." }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
