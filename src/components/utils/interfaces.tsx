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
  selectedTime: {
    start: string;
    end: string;
  };
  scheduling_url: string;
}

export type FeaturesFormProps = Readonly<{
  onSubmit: () => void;
}>;

export type DealFormProps = Readonly<{
  onSubmit?: (data: FormData) => void;
}>;

export type CalendarSubmitData = {
  selectedDate: string;
  selectedTime: string;
  selectedStartTime: string;
  selectedEndTime: string;
  scheduling_url: string;
};

export interface FormIslandProps {
  initialStep: FormStage;
  submissionId: string;
}
export interface HeroSectionProps {
  initialStep: FormStage;
  submissionId: string;
  setMode: (mode: "index" | "form") => void;
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
