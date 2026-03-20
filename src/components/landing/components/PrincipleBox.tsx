interface PrincipleBoxProps {
  modeKey: string;
  activeMode: string;
  setMode: (mode: any) => void;
  title: string;
  summary: string;
  features: string[];
  setSelectedFeatures?: (features: string[]) => void;
}

export const PrincipleBox = ({
  modeKey,
  activeMode,
  setMode,
  title,
  summary,
  features,
  setSelectedFeatures, // ✅ added
}: PrincipleBoxProps) => {
  const isActive = modeKey === activeMode;

  return (
    <div
      onClick={() => {
        setMode(modeKey);
        setSelectedFeatures?.([title]); // ✅ added
      }}
      className="cursor-pointer bg-foreground text-background transition-all duration-300"
    >
      <div className="p-5 flex justify-left items-center gap-4 ">
        <img
          src={"/Frame.png"}
          alt="spark/co"
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain cursor-pointer"
        />
        <h3 className="text-heading2 font-bold ">{title}</h3>
      </div>

      {/* MOBILE EXPAND AREA */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-[500px] opacity-100 p-5 pt-0" : "max-h-0 opacity-0"
        } lg:hidden`}
      >
        <p className="font-semibold mb-4">{summary}</p>
        <ul className="space-y-3">
          {features.map((feat) => (
            <li key={feat} className="text-smalltext flex gap-2">
              • <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
