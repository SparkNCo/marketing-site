import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  CalendarSubmitData,
  FormData,
  FormStep,
} from "./utils/interfaces";
import { ContactForm } from "./forms/contact-form";
import { CompanyDetailsForm } from "./forms/company-details-form";
import { ProductIdeaForm } from "./forms/product-idea-form";
import { SuccessMessage } from "./utils/success-message";
import AnimatedStepper from "./utils/animated-stepper";
import CalendlyBooking, { type Slot } from "./utils/CalendlyBooking";

type AvailabilityResponse = {
  timezone: string;
  days: Record<string, Slot[]>;
};

export default function DealForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    industry: "",
    monthlybudget: { min: 10000, max: 100000 },
    estimateTimeline: { min: 1, max: 24 },
    productIdea: "",
    selectedDate: "",
    selectedTime: { start: "", end: "" },
    scheduling_url: "",
  });

  /* -----------------------------
   * Availability query
   * ----------------------------- */
  const availabilityQuery = useQuery({
    queryKey: ["calendly-availability"],
    queryFn: async (): Promise<AvailabilityResponse> => {
      const now = new Date();

      const start = new Date(now);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(now);
      end.setDate(end.getDate() + 5);
      end.setHours(23, 59, 59, 999);

      const res = await fetch(
        `/api/calendly/availability?` +
          new URLSearchParams({
            eventSlug: "discovery",
            start: start.toISOString(),
            end: end.toISOString(),
          }),
      );

      if (!res.ok) {
        throw new Error("Failed to load availability");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /* -----------------------------
   * Submission mutation
   * ----------------------------- */
  const submitMutation = useMutation({
    mutationFn: async (finalData: FormData) => {
      const res = await fetch(
        "http://127.0.0.1:54321/functions/v1/create-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      return res.json();
    },
    onSuccess: (_data, finalData) => {
      setFormData(finalData);
      setCurrentStep("success");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleCalendarSubmit = (data: CalendarSubmitData) => {
    const finalData: FormData = {
      ...formData,
      selectedDate: data.selectedDate,
      selectedTime: {
        start: data.selectedStartTime,
        end: data.selectedEndTime,
      },
      scheduling_url: data.scheduling_url,
    };

    submitMutation.mutate(finalData);
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
        flex flex-col items-center justify-center
        px-4 py-6 bg-background
      "
    >
      <div className="min-h-[10vh] sm:min-h-[15vh]" />

      <AnimatedStepper
        currentStep={stepIndex}
        totalSteps={5}
        setCurrentStep={setCurrentStep}
      />

      <div
        className={`w-full lg:max-w-2xl p-8 shadow-xl rounded-xl ${
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
            setName={(v) => setFormData((p) => ({ ...p, name: v }))}
            setEmail={(v) => setFormData((p) => ({ ...p, email: v }))}
            setCompany={(v) =>
              setFormData((p) => ({ ...p, companyName: v }))
            }
            setIndustry={(v) =>
              setFormData((p) => ({ ...p, industry: v }))
            }
          />
        )}

        {currentStep === "product" && (
          <ProductIdeaForm
            setCurrentStep={setCurrentStep}
            productIdea={formData.productIdea}
            setProductIdea={(value) =>
              setFormData((p) => ({ ...p, productIdea: value }))
            }
          />
        )}

        {currentStep === "company" && (
          <CompanyDetailsForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            budgetRange={[
              formData.monthlybudget.min,
              formData.monthlybudget.max,
            ]}
            setBudgetRange={(value) =>
              setFormData((p) => ({
                ...p,
                monthlybudget: { min: value[0], max: value[1] },
              }))
            }
            timelineRange={[
              formData.estimateTimeline.min,
              formData.estimateTimeline.max,
            ]}
            setTimelineRange={(value) =>
              setFormData((p) => ({
                ...p,
                estimateTimeline: { min: value[0], max: value[1] },
              }))
            }
          />
        )}

        {currentStep === "calendar" && (
          <CalendlyBooking
            onSubmit={handleCalendarSubmit}
            submitting={submitMutation.isPending}
            availability={availabilityQuery.data?.days ?? {}}
          />
        )}

        {currentStep === "success" && <SuccessMessage />}
      </div>
    </main>
  );
}
