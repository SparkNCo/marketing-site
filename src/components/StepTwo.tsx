/* ───────────────── Imports ───────────────── */
import { useState } from "react";

export type FormStep =
  | "contact"
  | "company"
  | "product"
  | "calendar"
  | "success";

interface BudgetRange {
  min: number;
  max: number;
}

interface FormData {
  name: string;
  email: string;
  companyName: string;
  industry: string;
  budget: BudgetRange;
  productIdea: string;
  selectedDate: string;
  selectedTime: string;
}

interface CalendarSubmitData {
  selectedDate: string;
  selectedTime: string;
}

interface StepOneProps {
  onSubmit?: (data: FormData) => void;
}

export default function StepTwo({ onSubmit }: StepOneProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    industry: "",
    budget: { min: 10000, max: 100000 },
    productIdea: "",
    selectedDate: "",
    selectedTime: "",
  });

  const handleCalendarSubmit = async (data: CalendarSubmitData) => {
    const finalData: FormData = {
      ...formData,
      selectedDate: data.selectedDate,
      selectedTime: data.selectedTime,
    };

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        console.error("Failed to submit form");
        return;
      }

      onSubmit?.(finalData);
      setCurrentStep("success");
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  const stepIndex = [
    "contact",
    "company",
    "product",
    "calendar",
    "success",
  ].indexOf(currentStep);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-secondary">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Start Your Project
        </h1>
        <p className="text-foreground">
          Tell us about your vision and we'll bring it to life
        </p>
      </div>

      <StepIndicator currentStep={stepIndex} totalSteps={5} />

      <div className="w-full max-w-2xl border-t-4 border-primary bg-card p-8 shadow-xl rounded-xl">
        {currentStep === "contact" && (
          <ContactForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            name={formData.name}
            email={formData.email}
            company={formData.companyName}
            industry={formData.industry}
            setName={(v: string) =>
              setFormData((prev) => ({ ...prev, name: v }))
            }
            setEmail={(v: string) =>
              setFormData((prev) => ({ ...prev, email: v }))
            }
            setCompany={(v: string) =>
              setFormData((prev) => ({ ...prev, companyName: v }))
            }
            setIndustry={(v: string) =>
              setFormData((prev) => ({ ...prev, industry: v }))
            }
          />
        )}

        {currentStep === "company" && (
          <CompanyDetailsForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            budgetRange={[formData.budget.min, formData.budget.max]}
            setBudgetRange={(value: [number, number]) =>
              setFormData((prev) => ({
                ...prev,
                budget: { min: value[0], max: value[1] },
              }))
            }
          />
        )}

        {currentStep === "product" && (
          <ProductIdeaForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            productIdea={formData.productIdea}
            setProductIdea={(value: string) =>
              setFormData((prev) => ({ ...prev, productIdea: value }))
            }
          />
        )}

        {currentStep === "calendar" && (
          <CalendarBooking
            onSubmit={handleCalendarSubmit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            submitting={submitting}
            setSubmitting={setSubmitting}
          />
        )}

        {currentStep === "success" && <SuccessMessage />}
      </div>
    </main>
  );
}
