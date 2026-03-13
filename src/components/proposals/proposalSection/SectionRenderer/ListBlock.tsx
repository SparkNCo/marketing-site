import { CircleCheck, Trash2, Plus, Dot } from "lucide-react";

export default function ListBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { title, content } = block;
  const { subtype, items } = content;

  const updateItems = (newItems: any[]) => {
    const updated = [...data];

    updated[index] = {
      ...block,
      content: {
        ...content,
        items: newItems,
      },
    };

    setData(updated);
  };

  const handleChange = (value: string, itemIndex: number, key?: string) => {
    if (subtype === "titled") {
      updateItems(
        items.map((item: any, i: number) =>
          i === itemIndex ? { ...item, [key!]: value } : item,
        ),
      );
    } else {
      updateItems(
        items.map((item: string, i: number) =>
          i === itemIndex ? value : item,
        ),
      );
    }
  };

  const addItem = () => {
    if (subtype === "titled") {
      updateItems([...items, { title: "New title", content: "New content" }]);
    } else {
      updateItems([...items, "New item"]);
    }
  };

  const removeItem = (itemIndex: number) => {
    updateItems(items.filter((_: any, i: number) => i !== itemIndex));
  };

  if (subtype === "titled") {
    return (
      <div className="space-y-5 text-background">
        {title && <h3 className="font-semibold text-lg">{title}</h3>}

        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <div key={i} className="space-y-2">
              {!isEditing ? (
                <>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.content}
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-2 border p-2 rounded-md">
                  <div className="flex justify-between items-start gap-2">
                    <input
                      value={item.title}
                      onChange={(e) => handleChange(e.target.value, i, "title")}
                      className="border rounded-md px-2 py-1 text-sm w-full"
                    />

                    <button
                      onClick={() => removeItem(i)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <textarea
                    value={item.content}
                    onChange={(e) => handleChange(e.target.value, i, "content")}
                    className="border rounded-md px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-sm text-primary"
          >
            <Plus size={16} />
            Add item
          </button>
        )}
      </div>
    );
  }

  if (subtype === "checked") {
    return (
      <div className="space-y-4 text-background">
        {title && <h3 className="font-semibold text-lg">{title}</h3>}

        <div className="space-y-3">
          {items.map((item: string, i: number) => (
            <div key={i} className="flex gap-3 items-start">
              <CircleCheck className="text-primary mt-1 w-5 h-5 shrink-0" />

              {!isEditing ? (
                <p className="text-sm">{item}</p>
              ) : (
                <>
                  <input
                    value={item}
                    onChange={(e) => handleChange(e.target.value, i)}
                    className="w-full border rounded-md px-2 py-1 text-sm"
                  />

                  <button
                    onClick={() => removeItem(i)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-sm text-primary"
          >
            <Plus size={16} />
            Add item
          </button>
        )}
      </div>
    );
  }

  const ListTag = subtype === "numbered" ? "ol" : "ul";

  return (
    <div className="space-y-4">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}

      <ListTag className="space-y-2">
        {items.map((item: string, i: number) => (
          <li key={i} className="flex gap-2 items-start">
            {subtype === "numbered" ? (
              <span className="text-primary font-semibold w-5 shrink-0">
                {i + 1}.
              </span>
            ) : (
              <Dot className="text-primary mt-1 w-5 h-5 shrink-0 scale-[1.9]" />
            )}

            {!isEditing ? (
              <span>{item}</span>
            ) : (
              <>
                <input
                  value={item}
                  onChange={(e) => handleChange(e.target.value, i)}
                  className="w-full border rounded-md px-2 py-1 text-sm"
                />

                <button onClick={() => removeItem(i)} className="text-red-500">
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </li>
        ))}
      </ListTag>

      {isEditing && (
        <button
          onClick={addItem}
          className="flex items-center gap-2 text-sm text-primary"
        >
          <Plus size={16} />
          Add item
        </button>
      )}
    </div>
  );
}
