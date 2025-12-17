/* import type {
  CalendarSubmitData,
  StepOneProps,
  FormData,
} from "./utils/interfaces";

import { useState } from "react";
import { StepIndicator } from "./utils/step-indicator";
import { ContactForm } from "./forms/contact-form";
import { CompanyDetailsForm } from "./forms/company-details-form";
import { ProductIdeaForm } from "./forms/product-idea-form";
import { CalendarBooking } from "./utils/calendar-booking";
import { SuccessMessage } from "./utils/success-message";

export default function StepOne({ onSubmit }: StepOneProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");
  const [submitting, setSubmitting] = useState(false);

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
      const res = await fetch("/api/submissions/post-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      onSubmit?.(finalData);
      setCurrentStep("success");
    } catch (err) {
      console.error(err);
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
            setName={(v) => setFormData((prev) => ({ ...prev, name: v }))}
            setEmail={(v) => setFormData((prev) => ({ ...prev, email: v }))}
            setCompany={(v) =>
              setFormData((prev) => ({ ...prev, companyName: v }))
            }
            setIndustry={(v) =>
              setFormData((prev) => ({ ...prev, industry: v }))
            }
          />
        )}

        {currentStep === "company" && (
          <CompanyDetailsForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            budgetRange={[formData.budget.min, formData.budget.max]}
            setBudgetRange={(value) =>
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
            setProductIdea={(value) =>
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
 */