export default function CoverPageRenderer({ data, setData, isEditing }: any) {
  const entries = Object.entries(data || {});

  const updateField = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className="grid grid-cols-5 border-y border-gray-300">
      {entries.map(([key, value]: any, i) => {
        const isFirst = i === 0;
        const isLast = i === entries.length - 1;

        return (
          <div
            key={key}
            className={`flex flex-col gap-2 p-4 bg-card
              ${isFirst ? "border-l border-gray-300" : ""}
              ${isLast ? "border-r border-gray-300" : ""}
            `}
          >
            <span className="text-xs uppercase tracking-wide text-gray-500 font-light">
              {key}
            </span>

            {isEditing ? (
              <input
                className="bg-transparent border-none outline-none text-sm font-semibold text-black"
                value={value || ""}
                onChange={(e) => updateField(key, e.target.value)}
              />
            ) : (
              <span className="text-sm font-semibold text-black">{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}