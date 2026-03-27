export default function CoverPageRenderer({ data, setData, isEditing }: any) {
  const entries = Object.entries(data || {});

  const updateField = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className="bg-background py-12">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-y border-gray-300">
        {entries.map(([key, value]: any, i) => {
          const isFirst = i === 0;
          const isLast = i === entries.length - 1;

          return (
            <div
              key={key}
              className={`flex flex-col gap-2 p-8 bg-card
                ${isFirst ? "border-l border-gray-300" : ""}
                ${isLast ? "border-r border-gray-300" : ""}
              `}
            >
              <span className="text-[10px] uppercase tracking-wide text-gray-500 font-thin">
                {key}
              </span>

              {isEditing ? (
                <input
                  className="bg-transparent border-none outline-none font-semibold text-[18px] text-blue"
                  value={value || ""}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              ) : (
                <span className="font-semibold text-[18px]">{value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
