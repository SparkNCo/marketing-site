import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { Stack } from "./stacks";
import type { ArchitectAnswers } from "../../components/architect/types";

const ORANGE = rgb(0.969, 0.502, 0.208); // #f78035
const INK = rgb(0.067, 0.067, 0.067);
const MUTED = rgb(0.4, 0.4, 0.4);

type BuildArgs = {
  stack: Stack;
  reasoning: string;
  writeup: string;
  answers: ArchitectAnswers;
};

/**
 * Renders a one/two page PDF summarising the recommended template stack and the
 * reasoning behind the technical decisions. Pure pdf-lib so it runs anywhere.
 */
export async function buildReportPdf({
  stack,
  reasoning,
  writeup,
  answers,
}: BuildArgs): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const margin = 56;
  let page = doc.addPage([595.28, 841.89]); // A4
  const width = page.getSize().width;
  const maxWidth = width - margin * 2;
  let y = 841.89 - margin;

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) {
      page = doc.addPage([595.28, 841.89]);
      y = 841.89 - margin;
    }
  };

  const drawLines = (
    text: string,
    f: PDFFont,
    size: number,
    color = INK,
    gap = 4,
  ) => {
    for (const line of wrap(text, f, size, maxWidth)) {
      ensureSpace(size + gap);
      page.drawText(line, { x: margin, y, size, font: f, color });
      y -= size + gap;
    }
  };

  const heading = (text: string) => {
    y -= 10;
    ensureSpace(16);
    page.drawText(text.toUpperCase(), {
      x: margin,
      y,
      size: 11,
      font: bold,
      color: ORANGE,
    });
    y -= 18;
  };

  // Brand line
  page.drawText("spark/co", { x: margin, y, size: 12, font: bold, color: INK });
  y -= 28;

  // Title
  drawLines("Your Recommended Architecture", bold, 22);
  y -= 6;
  drawLines(
    "A pre-built template stack, selected for your product.",
    font,
    11,
    MUTED,
  );
  y -= 10;

  // Stack name card
  ensureSpace(60);
  page.drawRectangle({
    x: margin,
    y: y - 46,
    width: maxWidth,
    height: 52,
    color: rgb(0.968, 0.956, 0.941),
  });
  page.drawText(stack.name, {
    x: margin + 14,
    y: y - 16,
    size: 16,
    font: bold,
    color: INK,
  });
  if (stack.tagline) {
    page.drawText(truncate(stack.tagline, font, 11, maxWidth - 28), {
      x: margin + 14,
      y: y - 34,
      size: 11,
      font,
      color: MUTED,
    });
  }
  y -= 66;

  heading("Why this stack");
  drawLines(reasoning, font, 11);

  heading("The recommendation");
  drawLines(writeup, font, 11);

  heading("What's in the stack");
  drawLines(`Languages: ${stack.languages.join(", ") || "—"}`, font, 11);
  drawLines(`Frameworks: ${stack.frameworks.join(", ") || "—"}`, font, 11);
  drawLines(`Hosting: ${stack.hosting.join(", ") || "—"}`, font, 11);

  heading("Technical decisions & trade-offs");
  drawLines(stack.description, font, 11);
  y -= 4;
  drawLines(
    `Priority balance — speed ${stack.speed}/5, customizability ${stack.customizability}/5, portability ${stack.portability}/5, integrated ${stack.integrated}/5.`,
    font,
    11,
    MUTED,
  );

  heading("Your answers");
  drawLines(`Building: ${answers.buildTypes.join(", ") || "—"}`, font, 11);
  drawLines(`Functionalities: ${answers.functionalities.join(", ") || "—"}`, font, 11);
  const existing = [...answers.languages, ...answers.frameworks, ...answers.hosting];
  drawLines(`Existing expertise: ${existing.join(", ") || "—"}`, font, 11);

  if (stack.sample_repo_url) {
    heading("Sample repository");
    drawLines(stack.sample_repo_url, bold, 11, ORANGE);
  }

  y -= 16;
  ensureSpace(30);
  page.drawText(
    "Want a second opinion on your architecture? Book 20 minutes with spark/co.",
    { x: margin, y, size: 10, font, color: MUTED },
  );

  return doc.save();
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const cleaned = (text ?? "").replace(/\s+/g, " ").trim();
  if (!cleaned) return [""];
  const words = cleaned.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function truncate(text: string, font: PDFFont, size: number, maxWidth: number): string {
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text;
  let t = text;
  while (t.length > 1 && font.widthOfTextAtSize(`${t}…`, size) > maxWidth) {
    t = t.slice(0, -1);
  }
  return `${t}…`;
}
