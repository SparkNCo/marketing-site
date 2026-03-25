"use client";

import { Mail } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="rounded-xl animate-fade-in bg-foreground text-center space-y-6 sm:space-y-8 lg:space-y-10 py-6 sm:py-8 lg:py-10 px-4 sm:px-6">
      {/* Check Icon */}
      <img
        src="/checkIcon.png"
        alt="Success"
        className="
          mx-auto 
          mt-4 sm:mt-6
          w-16 h-16 
          sm:w-20 sm:h-20 
          lg:w-24 lg:h-24 
          object-contain
        "
      />

      {/* Text */}
      <div className="space-y-3 sm:space-y-4 max-w-xl mx-auto">
        <h2 className="text-heading2 sm:text-3xl lg:text-4xl font-bold text-title">
          You're all set!
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-title max-w-[400px] mx-auto">
          We've received your information and confirmed your discovery call.
        </p>
      </div>

      {/* Email Info */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3 max-w-md text-left sm:text-center">
          <Mail className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary shrink-0" />

          <p className="text-sm sm:text-base lg:text-lg text-title">
            We’ll send you an email with next steps
          </p>
        </div>
      </div>
    </div>
  );
}
