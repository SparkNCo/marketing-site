import React, { useState, lazy } from "react";
import type { HeroSectionProps } from "../utils/interfaces";
import { Button } from "../ui/button";
import { Cloud } from "lucide-react";

/* ───────────────── Types ───────────────── */

export type FormStep = "initial" | "features";

/* ───────────────── Lazy steps ───────────────── */
const StepOne = lazy(() => import("../DealForm"));

/* ───────────────── Component ───────────────── */

const HeroSection: React.FC<HeroSectionProps> = ({ initialStep }) => {
  const [step, setStep] = useState<FormStep>(initialStep);

  return (
    <main
      className="
    min-h-[88vh]
    sm:min-h-[40vh]
    md:min-h-[80vh]
    lg:min-h-[80vh]
    xl:min-h-[80vh]
    flex flex-col items-start justify-center
 bg-background
  "
    >
      <section className="container relative px-6 pt-32 pb-20 bg-foreground w-1/2">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-background mb-6 text-balance leading-tight">
            Hands-free Software Delivery
          </h1>
          <p className="text-4xl mb-12  max-w-2xl">
            Take the first step towards enterprise grade software, at next
            generation speeds
          </p>

          {/* Technology Icons */}
          <div className="flex items-center gap-8 mb-16">
            {/* AWS */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/awsIcon.png"
                alt="AWS"
                className="w-full h-full object-contain"
              />
            </div>

            {/* GCP */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/gcpIcon.png"
                alt="Google Cloud"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Azure */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/azureIcon.png"
                alt="Azure"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Supabase (sbase) */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/sbaseIcon.png"
                alt="Supabase"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Build Card */}
          <div className="bg-background p-8 max-w-lg ">
            <h2 className="text-3xl font-bold text-foreground mb-4">Build</h2>
            <p className="text-foreground mb-6 leading-relaxed">
              Launch your new business or product line with Spark & Co's fully
              managed software delivery system.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary-foreground/20 text-foreground text-2xl font-bold"
            >
              Scale
            </Button>
          </div>
        </div>

        {/* Decorative Sqaures */}
        <div className="absolute bottom-0 right-0">
          <div className="relative w-32 h-32 bg-black">
            <div className="relative w-32 h-32 bg-black">
              {/* Top orange */}
              <div className="absolute -top-16 right-0 w-16 h-16 bg-orange-500 z-10" />

              {/* Top red (foreground) */}
              <div className="absolute -top-16 right-16 w-16 h-16 bg-foreground" />

              {/* Bottom left orange */}
              <div className="absolute bottom-0 -left-16 w-16 h-16 bg-orange-500" />
            </div>
          </div>
        </div>
      </section>{" "}
    </main>
  );
};

export default HeroSection;
