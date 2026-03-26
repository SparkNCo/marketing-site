"use client";

import { Button } from "../../ui/button";

type NextButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  wrapperClassName?: string;
  buttonClassName?: string;
  text?: string;
};

export function NextButton({
  onClick,
  disabled,
  loading,
  wrapperClassName = "",
  buttonClassName = "",
  text = "Next",
}: NextButtonProps) {
  return (
    <div
      className={`
        mt-10 sm:mt-12 flex flex-col gap-6 font-body  
        lg:flex-row lg:justify-center w-full  
        ${wrapperClassName}
      `}
    >
      <Button
        size="lg"
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          mx-auto font-bold py-5 sm:py-6
          flex items-center justify-center gap-2
          text-[24px] md:text-[20px]
          bg-transparent
          hover:bg-transparent
          active:scale-100
          hover:scale-100
          transition-none

          ${buttonClassName}
        `}
      >
        {loading ? (
          <>
            <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
            <span>Loading...</span>
          </>
        ) : (
          text
        )}
      </Button>
    </div>
  );
}
