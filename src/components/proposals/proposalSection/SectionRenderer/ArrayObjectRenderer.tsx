import { Trash2 } from "lucide-react";

export default function ArrayObjectRenderer({ data, setData, isEditing }: any) {
  const updateField = (index: number, field: string, value: string) => {
    const arr = [...data];
    arr[index] = {
      ...arr[index],
      [field]: value,
    };
    setData(arr);
  };

  const deleteItem = (index: number) => {
    const arr = [...data];
    arr.splice(index, 1);
    setData(arr);
  };

  const addItem = () => {
    const template =
      data.length > 0
        ? Object.fromEntries(Object.keys(data[0]).map((k) => [k, ""]))
        : {};

    setData([...data, template]);
  };

  return (
    <div className="space-y-6 text-background ">
      {data.map((item: any, index: number) => (
        <div key={index} className="relative space-y-2 rounded-lg p-4 ">
          {isEditing && (
            <button
              type="button"
              onClick={() => deleteItem(index)}
              className="absolute right-2 top-2 p-2 text-destructive hover:bg-destructive/10 rounded-md"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          {Object.entries(item).map(([field, value]) => (
            <div key={field}>
              <h4 className="text-sm font-semibold text-primary">{field}</h4>

              {isEditing ? (
                <input
                  className="w-full rounded-lg border p-2"
                  value={(value as string) || ""}
                  onChange={(e) => updateField(index, field, e.target.value)}
                />
              ) : (
                <p>{value as string}</p>
              )}
            </div>
          ))}
        </div>
      ))}

      {isEditing && (
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-primary hover:underline"
        >
          + Add Item
        </button>
      )}
    </div>
  );
}
