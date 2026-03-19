import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        py-4 px-6 shadow-md 
        text-foreground bg-background 
        font-bold text-lg lg:text-xl
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
