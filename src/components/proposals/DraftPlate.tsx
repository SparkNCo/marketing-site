"use client";

type Option = {
  value: string;
  label: string;
  statusText: string;
};

interface DraftPlateProps {
  options: [Option, Option];
  value: string;
  onChange: (value: string) => void;
  bgColor?: string;
  knobColor?: string;
  textColor?: string;
  rounded?: string;
}

export const DraftPlate = ({
  options,
  value,
  onChange,
  bgColor = "bg-primary",
  knobColor = "bg-primary",
  textColor = "text-background",
  rounded = "",
}: DraftPlateProps) => {
  const [optionA, optionB] = options;
  const isA = value === optionA.value;

  const toggle = () => onChange(isA ? optionB.value : optionA.value);

  const statusText = isA ? optionA.statusText : optionB.statusText;

  return (
    <div
      className={`w-full h-[4rem] ${bgColor} ${rounded} ${textColor} font-semibold text-lg flex items-center justify-between px-4 text-[16px] `}
    >
      <div className="py-2">{statusText}</div>

      <div className="flex items-center gap-4">
        <span className="text-sm opacity-80">{optionA.label}</span>

        <button
          onClick={toggle}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition bg-background"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full ${knobColor} transition ${
              isA ? "translate-x-1" : "translate-x-5"
            }`}
          />
        </button>

        <span className="text-sm opacity-80">{optionB.label}</span>
      </div>
    </div>
  );
};
