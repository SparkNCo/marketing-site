// Shapes returned by the portal's `technical-review` Supabase function
// (portal/supabase/functions/technical-review). Flow and question IDs:
// docs/TECHNICAL_REVIEW_FLOW.md

export type Option = { value: string; label: string };

export type Cond =
  | { q: string; in: string[] }
  | { q: string; anyOf: string[] }
  | { all: Cond[] }
  | { not: Cond };

export type QuestionType = "email" | "text" | "long_text" | "single" | "multi" | "check";

export type Question = {
  id: string;
  text: string;
  subtitle?: string;
  type: QuestionType;
  options?: Option[];
  required: boolean;
  placeholder?: string;
  showIf?: Cond;
  textVariants?: { when: Cond; text: string }[];
  aiEnrich?: string;
  area?: string;
  module?: string;
};

export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue | undefined>;

type FixedPage = { title: string; copy?: string; questions: Question[] };

type ChecklistModule = { key: string; title: string; copy?: string; questions: Question[] };

export type Questionnaire = {
  // /assessment: page 1, then these modules first in the checklist.
  checklist: {
    intro: FixedPage;
    productScope: Omit<ChecklistModule, "questions"> & {
      privacyNote: string;
      questions: { idea: Question[]; technical: Question[] };
    };
    governance: ChecklistModule;
    dataPrivacy: ChecklistModule & { mergesArea: string };
  };
  intro: FixedPage;
  stage: FixedPage;
  about: { title: string; copy: string; privacyNote: string; questions: { idea: Question[]; technical: Question[] } };
  scope: FixedPage;
  intake: FixedPage[];
  idea: FixedPage[];
};

export type Plan = {
  stage: string;
  sections: { area: string; label: string; questions: Question[] }[];
  modules: { id: string; label: string; source: "rule" | "ai"; reason?: string }[];
  overflow: { id: string; text: string; module: string }[];
  hidden: string[];
  complianceAsked: boolean;
};

export type OfferInfo = { id: string; title: string; description: string };
export type Offers = { primary: OfferInfo; secondary: OfferInfo[] };

export type Finding = {
  id: string;
  title: string;
  explanation: string;
  whyItMatters: string;
  fixPrompt: string;
  engineerNote: string;
  diy: boolean;
};

export type TechnicalResults = {
  stage: "building" | "mvp" | "scaling";
  result: {
    overall: number;
    areas: { area: string; label: string; score: number; status: "good" | "gap" | "blind_spot" }[];
    flags: { id: string; title: string }[];
    blindSpots: string[];
    complianceAsked: boolean;
  };
  agentsMd: string;
  findings: Finding[];
  nextStage: { title: string; items: string[] };
  overflow: { id: string; text: string }[];
  modules: Plan["modules"];
  offers: Offers;
  invite: string;
  bookingUrl: string;
};

export type IdeaProfile = {
  product: string;
  audience: string;
  tags: string[];
  rows: { id: string; label: string; value: string; tone: "good" | "warn" | "neutral" }[];
};

export type IdeaResults = {
  stage: "idea";
  profile: IdeaProfile;
  gaps: { title: string; explanation: string; nextStep: string }[];
  agentsMd: string;
  offers: Offers;
  invite: string;
  bookingUrl: string;
};

export type Results = TechnicalResults | IdeaResults;

export type IdeaEnrichment = {
  questions: Record<string, { hint: string | null; placeholder: string | null }>;
  whoGuess: "external" | "internal" | "both" | null;
};

// /assessment: the running score after each finished checklist section.
export type Score = { overall: number; areas: TechnicalResults["result"]["areas"] };

// /assessment: the newest assessment of a signed-in lead.
export type ResumedReview = {
  reviewId: string;
  answers: Answers;
  plan: Plan | null;
  updatedAt: string;
  completed: boolean;
};
