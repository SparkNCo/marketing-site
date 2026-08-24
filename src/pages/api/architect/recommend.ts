import type { APIRoute } from "astro";
import { getAllStacks, type Stack } from "../../../lib/architect/stacks";
import { chatJson } from "../../../lib/architect/openai";
import type { ArchitectAnswers } from "../../../components/architect/types";

export const prerender = false;

type AiPick = { stack: string; reasoning: string; writeup: string };

function normalizeAnswers(body: unknown): ArchitectAnswers {
  const b = (body ?? {}) as Partial<ArchitectAnswers>;
  const arr = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
  const priority = (b.priority ?? {}) as { x?: number; y?: number };
  return {
    productIdea: typeof b.productIdea === "string" ? b.productIdea : "",
    buildTypes: arr(b.buildTypes),
    functionalities: arr(b.functionalities),
    languages: arr(b.languages),
    frameworks: arr(b.frameworks),
    hosting: arr(b.hosting),
    priority: {
      x: Number.isFinite(priority.x) ? Number(priority.x) : 0,
      y: Number.isFinite(priority.y) ? Number(priority.y) : 0,
    },
  };
}

/** Deterministic scoring used as a fallback when the AI call is unavailable. */
function heuristicPick(answers: ArchitectAnswers, stacks: Stack[]): Stack {
  const wanted = new Set(
    [...answers.buildTypes, ...answers.functionalities].map((s) => s.toLowerCase()),
  );
  const wantLang = new Set(answers.languages.map((s) => s.toLowerCase()));
  const wantFw = new Set(answers.frameworks.map((s) => s.toLowerCase()));
  const wantHost = new Set(answers.hosting.map((s) => s.toLowerCase()));

  // Target axis leanings from the user's diagram position (-1..1 -> 1..5).
  const targetSpeed = 3 + answers.priority.x * 2;
  const targetCustom = 3 - answers.priority.x * 2;
  const targetPort = 3 + answers.priority.y * 2;
  const targetIntegrated = 3 - answers.priority.y * 2;

  let best = stacks[0];
  let bestScore = -Infinity;
  for (const s of stacks) {
    let score = 0;
    for (const b of s.best_for) if (wanted.has(b.toLowerCase())) score += 3;
    for (const l of s.languages) if (wantLang.has(l.toLowerCase())) score += 2;
    for (const f of s.frameworks) if (wantFw.has(f.toLowerCase())) score += 2;
    for (const h of s.hosting) if (wantHost.has(h.toLowerCase())) score += 1;
    // Penalise distance from the requested priority leanings.
    score -= Math.abs(s.speed - targetSpeed) * 0.5;
    score -= Math.abs(s.customizability - targetCustom) * 0.5;
    score -= Math.abs(s.portability - targetPort) * 0.5;
    score -= Math.abs(s.integrated - targetIntegrated) * 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }
  return best;
}

function axisLabel(answers: ArchitectAnswers): string {
  const h = answers.priority.x >= 0 ? "delivery speed" : "deep customizability";
  const v = answers.priority.y >= 0 ? "portability" : "an integrated platform";
  return `leaning towards ${h} and ${v}`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const answers = normalizeAnswers(body);

    const stacks = await getAllStacks();
    if (stacks.length === 0) {
      return json({ error: "No template stacks configured" }, 500);
    }

    const fallback = heuristicPick(answers, stacks);

    let picked: Stack = fallback;
    let reasoning = "";
    let writeup = "";

    try {
      const catalogue = stacks
        .map(
          (s) =>
            `- ${s.name}: ${s.tagline ?? ""} Languages: ${s.languages.join(", ")}. Frameworks: ${s.frameworks.join(", ")}. Hosting: ${s.hosting.join(", ")}. Best for: ${s.best_for.join(", ")}. Leanings (1-5): speed ${s.speed}, customizability ${s.customizability}, portability ${s.portability}, integrated ${s.integrated}.`,
        )
        .join("\n");

      const userSummary = [
        answers.productIdea ? `Product idea: ${answers.productIdea}` : "",
        `Building: ${answers.buildTypes.join(", ") || "unspecified"}`,
        `Functionalities: ${answers.functionalities.join(", ") || "unspecified"}`,
        `Existing expertise / partnerships / credits — languages: ${answers.languages.join(", ") || "none"}; frameworks: ${answers.frameworks.join(", ") || "none"}; hosting: ${answers.hosting.join(", ") || "none"}`,
        `Priorities: ${axisLabel(answers)}`,
      ]
        .filter(Boolean)
        .join("\n");

      const ai = await chatJson<AiPick>([
        {
          role: "system",
          content:
            "You are a senior software architect at spark/co. You MUST recommend exactly one of the pre-built template stacks provided. Never invent a new stack. Respond as strict JSON.",
        },
        {
          role: "user",
          content: `Here are our pre-built template stacks:\n${catalogue}\n\nHere is the prospect's diagnostic:\n${userSummary}\n\nChoose the single best-fit template stack. Return JSON with keys:\n- "stack": the EXACT name of one stack from the list above\n- "reasoning": 2-3 sentences on why this stack fits their answers\n- "writeup": a warm, confident 100-150 word recommendation written to the founder. Make it explicit that this is one of our pre-built template stacks, reference their specific choices, and mention that the trade-offs match their stated priorities.`,
        },
      ]);

      const match = stacks.find(
        (s) => s.name.toLowerCase() === (ai.stack ?? "").trim().toLowerCase(),
      );
      if (match) picked = match;
      reasoning = typeof ai.reasoning === "string" ? ai.reasoning : "";
      writeup = typeof ai.writeup === "string" ? ai.writeup : "";
    } catch (err) {
      console.error("[architect/recommend] AI call failed, using heuristic:", err);
    }

    if (!writeup) {
      writeup = `Based on your answers — ${axisLabel(answers)} — we'd start you on the "${picked.name}" template, one of our pre-built stacks. ${picked.description}`;
    }
    if (!reasoning) {
      reasoning = picked.tagline ?? "A strong fit for the priorities you described.";
    }

    return json({ stack: picked, reasoning, writeup });
  } catch (err) {
    console.error("[architect/recommend] error:", err);
    return json({ error: "Failed to generate a recommendation" }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
