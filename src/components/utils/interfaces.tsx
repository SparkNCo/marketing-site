export interface BudgetRange {
  min: number;
  max: number;
}

export interface FormData {
  name: string;
  email: string;
  companyName: string;
  industry: string;
  budget: BudgetRange;
  productIdea: string;
  selectedDate: string;
  selectedTime: string;
}

export type FeaturesFormProps = Readonly<{
  onSubmit: () => void;
}>;

export type DealFormProps = Readonly<{
  onSubmit?: (data: FormData) => void;
}>;

export interface CalendarSubmitData {
  selectedDate: string;
  selectedTime: string;
}

export interface FormIslandProps {
  initialStep: FormStage;
  submissionId: string;
}

export interface ProposalIslandProps {
  mode: string;
  submissionId?: string;

}

export type FormStage = "initial" | "features";

export type FormStep =
  | "contact"
  | "company"
  | "product"
  | "calendar"
  | "success";
