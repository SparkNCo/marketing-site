"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export default function ProposalButton({
  children,
  icon,
  onClick,
  disabled,
  variant = "primary",
}: Props) {
  const base =
    "w-full py-3 font-semibold rounded-md flex items-center justify-center gap-2 transition-opacity";

  const styles =
    variant === "primary"
      ? "bg-primary text-background hover:opacity-90"
      : "bg-foreground text-background hover:opacity-90";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} disabled:opacity-50`}
    >
      {icon}
      {children}
    </button>
  );
}