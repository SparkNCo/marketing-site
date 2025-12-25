/* import { useState } from "react";
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

export default function MainForm() {
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
    <main className="flex flex-col items-center justify-start sm:justify-center px-4 py-6 ">
      <div className="mb-6 sm:mb-8 text-center px-2">
        <h1 className="mb-2 sm:mb-3 text-3xl sm:text-4xl md:text-5xl font-bold font-title text-title tracking-tight">
          Start Your Project
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-body text-body">
          Tell us about your vision and we'll bring it to life
        </p>

        <a href="/features?id=123"> Features</a>
      </div>
    </main>
  );
}
 */