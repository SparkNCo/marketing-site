import type { Proposal } from "../proposals/Proposal";

export type DiscoveryFormState = {
  description: string;
  estimateTime_min: number;
  estimateTime_max: number;
  budget_min: number;
  budget_max: number;
  formatted_date: string;
  currentState: string;
};

export type DiscoveryFormProps = {
  proposal: Proposal | null;
  passcode: string;
  pageMode: PageMode;
  setPageMode: (mode: PageMode) => void;
};
