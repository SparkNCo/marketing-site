import { useState } from "react";
import type {
  CalendarSubmitData,
  FormData,
  FormStep,
} from "./utils/interfaces";
import { ContactForm } from "./forms/contact-form";
import { CompanyDetailsForm } from "./forms/company-details-form";
import { ProductIdeaForm } from "./forms/product-idea-form";
import { CalendarBooking } from "./utils/calendar-booking";
import { SuccessMessage } from "./utils/success-message";
import AnimatedStepper from "./utils/animated-stepper";

export default function DealForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("product");
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
      setCurrentStep("success");
    } catch (err) {
      console.error(err);
    }
  };

  const stepIndex = [
    "product",
    "contact",
    "company",
    "calendar",
    "success",
  ].indexOf(currentStep);

  return (
    <main className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col gap-12 px-6 pb-20 pt-4 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <section className="flex flex-col gap-6 pt-6">
        <span className="w-fit rounded-full border border-foreground/20 bg-card/50 px-4 py-1 text-xs uppercase tracking-[0.25em] text-secondary">
          Toyfight inspired
        </span>
        <h2 className="text-4xl font-title text-foreground sm:text-5xl">
          Brands that feel like a joyride.
        </h2>
        <p className="max-w-lg text-base text-foreground/70">
          We build bold, playful digital experiences with a punchy palette,
          layered motion, and curious detail. Share your product idea and we’ll
          craft the story together.
        </p>
        <div className="grid max-w-md grid-cols-2 gap-4">
          {[
            { label: "Founded", value: "2018" },
            { label: "Projects", value: "120+" },
            { label: "Avg. launch", value: "6 weeks" },
            { label: "Team", value: "Global" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-foreground/10 bg-card/70 p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                {item.label}
              </p>
              <p className="text-lg font-semibold text-secondary">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative">
        <div className="absolute -inset-4 -z-10 rounded-[32px] bg-primary/20 blur-2xl" />
        <div className="rounded-[32px] border border-foreground/10 bg-card/90 p-8 shadow-2xl backdrop-blur">
          <AnimatedStepper
            currentStep={stepIndex}
            totalSteps={5}
            setCurrentStep={setCurrentStep}
          />
          <div className="mt-6">
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
        </div>
      </section>
    </main>
  );
}
