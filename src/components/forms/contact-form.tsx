"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import type { FormStep } from "../StepTwo";

interface ContactFormProps {
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;

  // Controlled values from parent:
  name: string;
  email: string;
  company: string;
  industry: string;

  // Setters from parent:
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setCompany: (v: string) => void;
  setIndustry: (v: string) => void;
}

export function ContactForm({
  currentStep,
  setCurrentStep,
  name,
  email,
  company,
  industry,
  setName,
  setEmail,
  setCompany,
  setIndustry,
}: ContactFormProps) {
  const [touchedNext, setTouchedNext] = useState(false);

  // validation
  const isValidName = name.trim().length >= 5;
  const isValidCompany = company.trim().length >= 5;
  const isValidIndustry = industry.trim().length >= 5;
  const isValidEmail =
    email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canProceed =
    isValidName && isValidEmail && isValidCompany && isValidIndustry;

  const handleNext = () => {
    setTouchedNext(true);

    if (canProceed) {
      setCurrentStep("company");
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="space-y-6">
        <h2 className="mb-6 text-2xl font-semibold text-surface ">
          Let's get to know you
        </h2>

        <div className="space-y-4">
          {/* NAME */}
          <div className="text-surface">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1.5"
            />
            {touchedNext && !isValidName && (
              <p className="text-sm text-primary">
                Name must be at least 5 characters
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="text-surface">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="mt-1.5"
            />
            {touchedNext && !isValidEmail && (
              <p className="text-sm text-primary">Mail format is not valid</p>
            )}
          </div>

          {/* COMPANY */}
          <div className="text-surface">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc"
              className="mt-1.5"
            />
            {touchedNext && !isValidCompany && (
              <p className="text-sm text-primary">
                Company must be at least 5 characters
              </p>
            )}
          </div>

          {/* INDUSTRY */}
          <div className="text-surface">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Technology"
              className="mt-1.5"
            />
            {touchedNext && !isValidIndustry && (
              <p className="text-sm text-primary">
                Industry must be at least 5 characters
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button
          variant={"nav"}
          size={"default"}
          onClick={() => setCurrentStep("contact")}
          disabled={currentStep === "contact"}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          variant={"nav"}
          size={"default"}
          onClick={handleNext}
          disabled={touchedNext && !canProceed}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
