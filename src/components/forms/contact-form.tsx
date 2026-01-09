"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";
import type { ContactFormProps } from "../utils/types";

export function ContactForm({
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
    //  setCurrentStep("product");
      setCurrentStep("product");
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="">
        <h2 className="mb-4 text-3xl text-title font-bold">
          Tell us about yourself
        </h2>

        <div className="">
          {/* NAME */}
          <div className="text-surface font-body">
            <Label className="text-md text-title mt-3" htmlFor="name">
              First Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoFocus
              className="
                mt-3
                h-16 lg:h-10
                text-4xl lg:text-sm
                placeholder:text-3xl lg:placeholder:text-sm placeholder:text-body
                placeholder:opacity-60
                bg-secondary
                text-body
              "
            />
            {touchedNext && !isValidName && (
              <p className="mt-3 text-3xl lg:text-sm text-primary">
                Name must be at least 5 characters
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="text-surface font-body">
            <Label className="text-md text-title mt-3" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="
                mt-3
                h-16 lg:h-10
                text-4xl lg:text-sm
                placeholder:text-3xl lg:placeholder:text-sm placeholder:text-body
                placeholder:opacity-60
                bg-secondary
                text-body
              "
            />
            {touchedNext && !isValidEmail && (
              <p className="mt-3 text-3xl lg:text-sm text-primary">
                Mail format is not valid
              </p>
            )}
          </div>

          {/* COMPANY */}
          <div className="text-surface font-body">
            <Label className="text-md text-title mt-3" htmlFor="company">
              Company
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc"
              className="
                mt-3
                h-16 lg:h-10
                text-4xl lg:text-sm
                placeholder:text-3xl lg:placeholder:text-sm placeholder:text-body
                placeholder:opacity-60
                bg-secondary
                text-body
              "
            />
            {touchedNext && !isValidCompany && (
              <p className="mt-3 text-3xl lg:text-sm text-primary">
                Company must be at least 5 characters
              </p>
            )}
          </div>

          {/* INDUSTRY */}
          <div className="text-surface font-body">
            <Label className="text-md text-title mt-3" htmlFor="industry">
              Industry
            </Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Technology"
              className="
                mt-3
                h-16 lg:h-10
                text-4xl lg:text-sm
                placeholder:text-3xl lg:placeholder:text-sm placeholder:text-body
                placeholder:opacity-60
                bg-secondary
                text-body
              "
            />
            {touchedNext && !isValidIndustry && (
              <p className="mt-3 text-3xl lg:text-sm text-primary">
                Industry must be at least 5 characters
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-6 font-body lg:flex-row lg:justify-center lg:gap-0 w-full">
        <Button
          variant="nav"
          size="lg"
          className="mx-auto text-lg font-bold py-6  bg-background"
          onClick={handleNext}
          disabled={touchedNext && !canProceed}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
