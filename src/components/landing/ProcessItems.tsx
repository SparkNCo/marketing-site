interface ProcessStepItemProps {
  index: number;
  title: string;
  isActive: boolean;
}

export function ProcessStepItem({
  index,
  title,
  isActive,
}: ProcessStepItemProps) {
  return (
    <>
      {/* Number */}
      <div className="text-lg md:text-3xl font-bold text-primary text-right pr-2">
        {index + 1}
      </div>

      {/* Square */}
      <div className="flex justify-center relative">
        <div
          className={`w-5 h-5 border-2 border-white z-10 transition-colors duration-300
          ${isActive ? "bg-foreground" : "bg-white"}`}
        />
      </div>

      {/* Title box */}
      <div className="flex items-center">
        <h3
          className={`flex items-center justify-center text-sm md:text-2xl font-bold
          border-4 border-white
          w-[140px] md:w-[200px] lg:w-[240px]
          px-4 py-2 md:py-3
          text-center
          transition-colors duration-300
          ${
            isActive
              ? "bg-foreground text-background"
              : "bg-transparent text-foreground"
          }`}
        >
          {title}
        </h3>
      </div>
    </>
  );
}

export function TimelineLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute w-[3px] bg-foreground opacity-90 blur-[1px] ${className}`}
    />
  );
}

export function ProcessStepContent({
  title,
  description,
  image,
  sticky = false,
}: {
  title: string;
  description: string;
  image: string;
  sticky?: boolean;
}) {
  return (
    <div className={`lg:col-span-8 text-foreground relative z-0 ${sticky ? "" : ""} border-4`}>
      <div
        className={`flex flex-col gap-6 ${
          sticky ? "sticky top-[200px] md:top-[300px]" : ""
        }`}
      >
        <div className="w-full md:w-3/4 font-semibold text-sm md:text-lg">
          {title}
        </div>

        <p className="text-sm md:text-xl">{description}</p>

        <div
          className="bg-center bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            minHeight: "280px",
            height: "50vh",
          }}
        />
      </div>
    </div>
  );
}
