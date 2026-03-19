import React, { useState } from "react";
import PrimaryButton from "../primary-button";

interface EmailCaptureProps {
  onValidSubmit: (email: string) => void;
  label?: string;
  containerClassName?: string;
  inputWrapperClassName?: string;
  buttonClassName?: string;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({
  onValidSubmit,
  label,
  containerClassName = "",
  inputWrapperClassName = "",
  buttonClassName = "",
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setError("");
    onValidSubmit(email);
  };

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {label && (
        <h2 className="text-background font-bold mb-3 text-lg lg:text-xl">
          {label}
        </h2>
      )}

      <div
        className={`
          flex items-center bg-foreground shadow-md
          ${shake ? "animate-shake" : ""}
          ${error ? "border border-red-500" : ""}
          ${inputWrapperClassName}
        `}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="flex-1 px-4 py-3 outline-none text-background"
        />
      </div>

      {/* reserved space */}
      <p
        className={`
          text-red-500 text-sm mt-2 min-h-[20px]
          transition-opacity duration-200
          ${error ? "opacity-100" : "opacity-0"}
        `}
      >
        {error}
      </p>

      <PrimaryButton
        onClick={handleSubmit}
        className={`mt-4 ${buttonClassName}`}
      >
        Let&apos;s Go
      </PrimaryButton>
    </div>
  );
};

export default EmailCapture;
