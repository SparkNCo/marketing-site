interface ProcessStepItemProps {
  index: number;
  title: string;
  isActive: boolean;
  mobile?: boolean;
}

export function ProcessStepItem({
  index,
  title,
  isActive,
  mobile = false,
}: Readonly<ProcessStepItemProps>) {
  return (
    <>
      {/* Number */}
      <div className="text-heading1 md:text-heading1 font-bold text-primary text-right pr-2 ">
        {index + 1}
      </div>

      {/* Square */}
      <div
        className={`flex justify-center relative ${mobile ? "mt-4" : "mt-0"}`}
      >
        <div
          className={`w-5 h-5 border-2 border-white z-10 transition-colors duration-300
          ${isActive ? "bg-foreground" : "bg-white"}`}
        />
      </div>

      {/* Title box */}
      <div className="flex items-center border-4">
        <h3
          className={`flex items-center justify-center text-heading2 md:text-heading2 font-bold 
           border-white
          w-full 
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

export function TimelineLine({ className = "" }: Readonly<{ className?: string }>) {
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
}: Readonly<{
  title: string;
  description: string;
  image: string;
  sticky?: boolean;
}>) {
  return (
    <div
      className="lg:col-span-8 text-foreground relative z-0 border-4"
    >
      <div
        className={`flex flex-col gap-6 ${
          sticky ? "sticky top-[200px] md:top-[300px]" : ""
        }`}
      >
        <div className="w-full md:w-3/4 font-semibold text-body md:text-lg">
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
