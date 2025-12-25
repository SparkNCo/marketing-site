"use client";

import { CheckCircle, Mail } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="animate-fade-in space-y-8 text-center font-body">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <div className="space-y-3 text-secondary">
        <h2 className="text-4xl font-bold font-title">You're all set!</h2>
        <p className="text-xl text-foreground max-w-md mx-auto font-title">
          We've received your information and confirmed your discovery call.
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 space-y-3 max-w-md mx-auto text-secondary">
        <div className="flex items-center gap-3 text-left">
          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold text-lg ">Check your email</p>
            <p className="text-lg ">
              We'll send you a confirmation with call details and agenda
            </p>
          </div>
        </div>
      </div>

      <p className="text-secondary text-xl">
        One of our experts will reach out to discuss your project in detail
      </p>
    </div>
  );
}
