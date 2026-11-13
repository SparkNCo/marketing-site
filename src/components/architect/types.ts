export type Stack = {
  id: string;
  name: string;
  tagline: string | null;
  description: string;
  languages: string[];
  frameworks: string[];
  hosting: string[];
  best_for: string[];
  sample_repo_url: string | null;
  speed: number;
  customizability: number;
  portability: number;
  integrated: number;
};

/**
 * Where the user placed themselves on the priority diagram.
 * x: -1 = customizability (left) … +1 = speed (right)
 * y: -1 = integrated (bottom) … +1 = portability (top)
 */
export type PriorityAxis = {
  x: number;
  y: number;
};

/** Everything collected across the architect form pages. */
export type ArchitectAnswers = {
  productIdea: string;
  buildTypes: string[];
  functionalities: string[];
  languages: string[];
  frameworks: string[];
  hosting: string[];
  priority: PriorityAxis;
};

/** Response from the architect-recommend function. */
export type RecommendationResult = {
  stack: Stack;
  reasoning: string;
  writeup: string;
};

/** Partial answers returned from the architect-prefill function. */
export type PrefillResult = Partial<
  Pick<
    ArchitectAnswers,
    | "buildTypes"
    | "functionalities"
    | "languages"
    | "frameworks"
    | "hosting"
    | "priority"
  >
>;

export const EMPTY_ANSWERS: ArchitectAnswers = {
  productIdea: "",
  buildTypes: [],
  functionalities: [],
  languages: [],
  frameworks: [],
  hosting: [],
  priority: { x: 0, y: 0 },
};
