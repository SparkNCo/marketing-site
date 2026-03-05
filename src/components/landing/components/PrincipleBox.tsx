export const PrincipleBox = ({
  modeKey,
  activeMode,
  setMode,
  title,
  summary,
  features,
}) => {
  const isActive = modeKey === activeMode;

  return (
    <div
      onClick={() => setMode(modeKey)}
      className="cursor-pointer bg-foreground text-background rounded-lg transition-all duration-300"
    >
      <div className="p-5 flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      </div>

      {/* MOBILE EXPAND AREA */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-[500px] opacity-100 p-5 pt-0" : "max-h-0 opacity-0"
        } md:hidden`}
      >
        <p className="font-semibold mb-4">{summary}</p>
        <ul className="space-y-3">
          {features.map((feat) => (
            <li key={feat} className="text-sm flex gap-2">
              • <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};