"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";
import type { ContactFormProps } from "../utils/types";
import { NextButton } from "../landing/components/NextFormButton";
import { trackMetaPixel } from "../../lib/metaPixel";

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

  const isValidName = name.trim().length >= 2;
  const isValidCompany = company.trim().length >= 2;
  const isValidIndustry = industry.trim().length >= 2;
  const isValidEmail =
    email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canProceed =
    isValidName && isValidEmail && isValidCompany && isValidIndustry;

  const handleNext = () => {
    setTouchedNext(true);
    if (canProceed) {
      trackMetaPixel("CompleteRegistration");
      setCurrentStep("product");
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full md:px-4 lg:px-4 lg:px-0 text-foreground">
      {" "}
      <div className="w-full mx-auto">
        <h2 className="mb-4 text-2xl sm:text-3xl text-title  ">
          Tell us about yourself
        </h2>

        <div className="space-y-6 sm:space-y-4">
          {/* NAME */}
          <div className="text-surface font-body">
            <Label className="text-body  mt-3" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoFocus
              className="
                mt-3
                h-14 sm:h-16 lg:h-10
                text-bodysm:text-body lg:text-sm
                placeholder:text-xl sm:placeholder:text-3xl lg:placeholder:text-sm
                placeholder:text-background placeholder:opacity-60
                bg-secondary text-background focus:ring-primary
                selection:bg-primary selection:text-black selection:font-bold
              "
            />
            {touchedNext && !isValidName && (
              <p className="mt-2 text-lg sm:text-3xl lg:text-sm text-primary">
                Name must be at least 2 characters
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="text-surface font-body">
            <Label className="text-body  mt-3" htmlFor="email">
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
                h-14 sm:h-16 lg:h-10
                text-bodysm:text-body lg:text-sm
                placeholder:text-xl sm:placeholder:text-3xl lg:placeholder:text-sm
                placeholder:text-background placeholder:opacity-60
                bg-secondary text-background focus:ring-primary
                selection:bg-primary selection:text-black selection:font-bold
              "
            />
            {touchedNext && !isValidEmail && (
              <p className="mt-2 text-lg sm:text-3xl lg:text-sm text-primary">
                Please enter a valid email address
              </p>
            )}
          </div>

          {/* COMPANY */}
          <div className="text-surface font-body">
            <Label className="text-body mt-3" htmlFor="company">
              Company
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc"
              className="
                mt-3
                h-14 sm:h-16 lg:h-10
                text-bodysm:text-body lg:text-sm
                placeholder:text-xl sm:placeholder:text-3xl lg:placeholder:text-sm
                placeholder:text-background placeholder:opacity-60
                bg-secondary text-background focus:ring-primary
                selection:bg-primary selection:text-black selection:font-bold
              "
            />
            {touchedNext && !isValidCompany && (
              <p className="mt-2 text-lg sm:text-3xl lg:text-sm text-primary">
                Company must be at least 2 characters
              </p>
            )}
          </div>

          {/* INDUSTRY */}
          <div className="text-surface font-body">
            <Label className="text-body mt-3" htmlFor="industry">
              Industry
            </Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Technology"
              className="
                mt-3
                h-14 sm:h-16 lg:h-10
                text-bodysm:text-body lg:text-sm
                placeholder:text-xl sm:placeholder:text-3xl lg:placeholder:text-sm
                placeholder:text-background placeholder:opacity-60
                bg-secondary text-background focus:ring-primary
                selection:bg-primary selection:text-black selection:font-bold
              "
            />
            {touchedNext && !isValidIndustry && (
              <p className="mt-2 text-lg sm:text-3xl lg:text-sm text-primary">
                Industry must be at least 2 characters
              </p>
            )}
          </div>
        </div>
      </div>
      <NextButton
        onClick={handleNext}
        disabled={touchedNext && !canProceed}
        buttonClassName="
    w-full
    h-14 sm:h-16 lg:h-10
    bg-foreground text-background
    hover:bg-foreground active:bg-foreground 
  "
      />
    </div>
  );
}
