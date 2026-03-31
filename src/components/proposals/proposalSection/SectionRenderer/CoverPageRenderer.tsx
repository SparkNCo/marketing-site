export default function CoverPageRenderer({ data, setData, isEditing }: any) {
  const entries = Object.entries(data || {});

  const updateField = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className="bg-background ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 divide-x divide-foreground/10">
        {entries.map(([key, value]: any) => {
          return (
            <div key={key} className="flex flex-col gap-2 p-8 bg-card">
              <div className="fontSize-smalltext font-bold text-background opacity-60">
                {key}
              </div>

              {isEditing ? (
                <input
                  className="bg-transparent border-none outline-none font-semibold text-body text-blue"
                  value={value || ""}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              ) : (
                <span className="font-heading2 font-bold text-body">
                  {value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
