import type { FormStep } from "./interfaces";

export type ContactFormProps = Readonly<{
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;
  name: string;
  email: string;
  company: string;
  industry: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setCompany: (v: string) => void;
  setIndustry: (v: string) => void;
  onNext: () => void;
  onPrev?: () => void;
}>;

export type CompanyDetailsFormProps = Readonly<{
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;
  budgetRange: [number, number];
  setBudgetRange: (value: [number, number]) => void;
}>;
