import { Trash2 } from "lucide-react";

export default function NestedObjectRenderer({ data, setData, isEditing }: any) {

  const updateValue = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const updateArrayItem = (
    parentKey: string,
    index: number,
    field: string,
    value: string
  ) => {
    const arr = [...data[parentKey]];
    arr[index] = {
      ...arr[index],
      [field]: value,
    };

    updateValue(parentKey, arr);
  };

  return (
    <div className="space-y-6 text-foreground ">

      {Object.entries(data).map(([key, value]) => (

        <div key={key}>
          <h3 className="mb-2 text-lg font-bold text-primary">{key}</h3>

          {Array.isArray(value) ? (
            <>
              {typeof value[0] === "string" ? (

                value.map((v: string, i: number) => (
                  <div key={i} className="flex gap-2 mb-2">

                    {isEditing ? (
                      <>
                        <input
                          className="w-full rounded-lg border p-2"
                          value={v}
                          onChange={(e) => {
                            const arr = [...value];
                            arr[i] = e.target.value;
                            updateValue(key, arr);
                          }}
                        />

                        <button
                          onClick={() => {
                            const arr = [...value];
                            arr.splice(i, 1);
                            updateValue(key, arr);
                          }}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <p>{v}</p>
                    )}

                  </div>
                ))

              ) : (

                value.map((obj: any, i: number) => (
                  <div key={i} className="relative space-y-2 rounded-lg p-4">

                    {isEditing && (
                      <button
                        onClick={() => {
                          const arr = [...value];
                          arr.splice(i, 1);
                          updateValue(key, arr);
                        }}
                        className="absolute right-2 top-2 p-2 text-destructive hover:bg-destructive/10 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    {Object.entries(obj).map(([field, val]) => (
                      <div key={field}>
                        <span className="font-semibold">{field}</span>

                        {isEditing ? (
                          <input
                            className="w-full rounded-lg border p-2 mt-1"
                            value={(val as string) || ""}
                            onChange={(e) =>
                              updateArrayItem(key, i, field, e.target.value)
                            }
                          />
                        ) : (
                          <p>{val as string}</p>
                        )}
                      </div>
                    ))}

                  </div>
                ))

              )}

            </>
          ) : isEditing ? (
            <input
              className="w-full rounded-lg p-2"
              value={(value as string) || ""}
              onChange={(e) => updateValue(key, e.target.value)}
            />
          ) : (
            <p>{value as string}</p>
          )}

        </div>

      ))}

    </div>
  );
}