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
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    industry: "",
    monthlybudget: { min: 10000, max: 100000 },
    estimateTimeline: { min: 1, max: 24 },
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
    "contact",
    "product",
    "company",
    "calendar",
    "success",
  ].indexOf(currentStep);

  return (
    <main
      data-header="light"
      className="
    min-h-[88vh]
    sm:min-h-[40vh]
    md:min-h-[80vh]
    lg:min-h-[80vh]
    xl:min-h-[80vh]
    flex flex-col items-center justify-center
    px-4 py-6 bg-background
  "
    >
      {" "}
      <AnimatedStepper
        currentStep={stepIndex}
        totalSteps={5}
        setCurrentStep={setCurrentStep}
      />
      <div
        className={`w-full lg:max-w-2xl   p-8 shadow-xl rounded-xl ${
          currentStep === "contact" ? "bg-card" : "bg-background"
        }`}
      >
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

        {currentStep === "company" && (
          <CompanyDetailsForm
            budgetRange={[
              formData.monthlybudget.min,
              formData.monthlybudget.max,
            ]}
            setBudgetRange={(value) =>
              setFormData((prev) => ({
                ...prev,
                monthlybudget: { min: value[0], max: value[1] },
              }))
            }
            timelineRange={[
              formData.estimateTimeline.min,
              formData.estimateTimeline.max,
            ]}
            setTimelineRange={(value) =>
              setFormData((prev) => ({
                ...prev,
                estimateTimeline: { min: value[0], max: value[1] },
              }))
            }
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
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
