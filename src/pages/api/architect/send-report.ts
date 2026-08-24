import type { APIRoute } from "astro";
import { Resend } from "resend";
import { render } from "@react-email/render";
import React from "react";
import pkg from "pg";
import { getStackByName } from "../../../lib/architect/stacks";
import { buildReportPdf } from "../../../lib/architect/reportPdf";
import { getBookingUrl } from "../../../lib/booking";
import ArchitectReportTemplate from "../../../components/ui/EmailTemplate/ArchitectReportTemplate";
import type { ArchitectAnswers } from "../../../components/architect/types";

export const prerender = false;

const { Pool } = pkg;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM =
  (import.meta.env.ARCHITECT_FROM_EMAIL as string | undefined) ||
  "spark/co <hello@buildwithspark.co>";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function captureLead(
  email: string,
  stackName: string,
  answers: ArchitectAnswers,
  sent: boolean,
) {
  const connectionString = import.meta.env.DIRECT_URL || import.meta.env.DATABASE_URL;
  if (!connectionString) return;
  const pool = new Pool({ connectionString, max: 1 });
  try {
    await pool.query(
      `insert into marketing.architect_leads (email, recommended_stack, answers, report_sent)
       values ($1, $2, $3::jsonb, $4)`,
      [email, stackName, JSON.stringify(answers ?? {}), sent],
    );
  } catch (err) {
    console.error("[architect/send-report] lead capture failed:", err);
  } finally {
    await pool.end();
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const stackName = typeof body?.stackName === "string" ? body.stackName : "";
    const reasoning = typeof body?.reasoning === "string" ? body.reasoning : "";
    const writeup = typeof body?.writeup === "string" ? body.writeup : "";
    const answers = (body?.answers ?? {}) as ArchitectAnswers;

    if (!EMAIL_RE.test(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }

    const stack = await getStackByName(stackName);
    if (!stack) {
      return json({ error: "Unknown stack." }, 400);
    }

    const bookingUrl = getBookingUrl();
    const apiKey = import.meta.env.RESEND_KEY as string | undefined;

    // Always capture the lead, even if email delivery is not configured.
    if (!apiKey) {
      await captureLead(email, stack.name, answers, false);
      console.warn("[architect/send-report] RESEND_KEY not set; lead captured only.");
      return json({ ok: true, delivered: false });
    }

    const pdfBytes = await buildReportPdf({ stack, reasoning, writeup, answers });

    const html = await render(
      React.createElement(ArchitectReportTemplate, {
        stackName: stack.name,
        tagline: stack.tagline ?? "",
        writeup: writeup || stack.description,
        sampleRepoUrl: stack.sample_repo_url ?? undefined,
        bookingUrl,
      }),
    );

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: `Your recommended stack: ${stack.name}`,
      html,
      attachments: [
        {
          filename: `spark-architecture-${stack.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`,
          content: Buffer.from(pdfBytes).toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("[architect/send-report] Resend error:", error);
      await captureLead(email, stack.name, answers, false);
      return json({ error: "We couldn't send the email right now." }, 502);
    }

    await captureLead(email, stack.name, answers, true);
    return json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[architect/send-report] error:", err);
    return json({ error: "Something went wrong sending your report." }, 500);
  }
};
