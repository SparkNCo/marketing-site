import { useEffect, useState } from "react";
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
import CalendlyBooking from "./utils/CalendlyBooking";

type AvailabilityResponse = {
  timezone: string;
  days: Record<string, Slot[]>;
};

export default function DealForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");
  const [submitting, setSubmitting] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

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

  const handleCalendarSubmit = async (data: CalendarSubmitData) => {
    const finalData: FormData = {
      ...formData,
      selectedDate: data.selectedDate,
      selectedTime: {
        start: data.selectedStartTime,
        end: data.selectedEndTime,
      },
      scheduling_url: data.scheduling_url,
    };
    try {
      setSubmitting(true);
      const res = await fetch("/api/submissions/post-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitting(false);
      setFormData(finalData);
      setCurrentStep("success");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const stepIndex = [
    "contact",
    "product",
    "company",
    "calendar",
    "success",
  ].indexOf(currentStep);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const now = new Date();

        // Tomorrow at 00:00
        const start = new Date(now);
        start.setDate(start.getDate() + 1);
        start.setHours(0, 0, 0, 0);

        // 5 days from today at 23:59
        const end = new Date(now);
        end.setDate(end.getDate() + 5);
        end.setHours(23, 59, 59, 999);

        const res = await fetch(
          `/api/calendly/availability?` +
            new URLSearchParams({
              eventSlug: "15min",
              start: start.toISOString(),
              end: end.toISOString(),
            })
        );

        if (!res.ok) throw new Error("Failed to load availability");

        const data = await res.json();
        console.log("data", data);

        setAvailability(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load availability");
      }
    };

    fetchAvailability();
  }, []);

  return (
    <main
      data-header="light"
      className="
    min-h-[88vh]
    flex flex-col items-center justify-center
    px-4 py-6 bg-background
  "
    >
      <div
        className="
    min-h-[10vh]     
    sm:min-h-[15vh]
    md:min-h-[15vh]
    lg:min-h-[15vh]
    xl:min-h-[15vh]"
      ></div>{" "}
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

        {currentStep === "calendar" &&
          (() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            console.log(
              "Calendly URL:",
              `https://calendly.com/${import.meta.env.PUBLIC_CALENDLY_USERNAME}/interview?back=1&month=${year}-${month}`
            );
            return (
              <CalendlyBooking
                onSubmit={handleCalendarSubmit}
                submitting={submitting}
                availability={availability?.days}
              />
            );
          })()}

        {currentStep === "success" && <SuccessMessage />}
      </div>
    </main>
  );
}
