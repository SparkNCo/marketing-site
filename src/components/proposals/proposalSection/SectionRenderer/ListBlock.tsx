import { CircleCheck, Trash2, Plus, Dot } from "lucide-react";

type TitledItem = {
  title: string;
  content: string;
};

type ListContent = {
  subtype: "titled" | "checked" | "numbered" | "bullet";
  items: TitledItem[] | string[];
};

type ListBlockData = {
  title?: string;
  content: ListContent;
};

type ListBlockProps = Readonly<{
  block: ListBlockData;
  index: number;
  data: ListBlockData[];
  setData: (data: ListBlockData[]) => void;
  isEditing: boolean;
}>;

export default function ListBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: ListBlockProps) {
  const { title, content } = block;
  const { subtype, items } = content;

  const updateItems = (newItems: TitledItem[] | string[]) => {
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
        (items as TitledItem[]).map((item, i) =>
          i === itemIndex ? { ...item, [key!]: value } : item,
        ),
      );
    } else {
      updateItems(
        (items as string[]).map((item, i) => (i === itemIndex ? value : item)),
      );
    }
  };

  const addItem = () => {
    if (subtype === "titled") {
      updateItems([
        ...(items as TitledItem[]),
        { title: "New title", content: "New content" },
      ]);
    } else {
      updateItems([...(items as string[]), "New item"]);
    }
  };

  const removeItem = (itemIndex: number) => {
    if (subtype === "titled") {
      updateItems((items as TitledItem[]).filter((_, i) => i !== itemIndex));
    } else {
      updateItems((items as string[]).filter((_, i) => i !== itemIndex));
    }
  };

  if (subtype === "titled") {
    return (
      <div className="space-y-5 text-background">
        {title && <h3 className="font-semibold text-lg">{title}</h3>}

        <div className="space-y-4">
          {(items as TitledItem[]).map((item, i) => (
            <div key={item.title} className="space-y-2">
              {isEditing ? (
                <div className="flex flex-col gap-2 border p-2 rounded-md">
                  <div className="flex justify-between items-start gap-2">
                    <input
                      value={item.title}
                      onChange={(e) => handleChange(e.target.value, i, "title")}
                      className="border rounded-md px-2 py-1 text-sm w-full"
                    />

                    <button
                      type="button"
                      aria-label="Remove item"
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
              ) : (
                <>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.content}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            type="button"
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
          {(items as string[]).map((item, i) => (
            <div key={item} className="flex gap-3 items-start">
              <CircleCheck className="text-primary mt-1 w-5 h-5 shrink-0" />

              {isEditing ? (
                <>
                  <input
                    value={item}
                    onChange={(e) => handleChange(e.target.value, i)}
                    className="w-full border rounded-md px-2 py-1 text-sm"
                  />

                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeItem(i)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <p className="text-sm">{item}</p>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            type="button"
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
        {(items as string[]).map((item, i) => (
          <li key={item} className="flex gap-2 items-start">
            {subtype === "numbered" ? (
              <span className="text-primary font-semibold w-5 shrink-0">
                {i + 1}.
              </span>
            ) : (
              <Dot className="text-primary mt-1 w-5 h-5 shrink-0 scale-[1.9]" />
            )}

            {isEditing ? (
              <>
                <input
                  value={item}
                  onChange={(e) => handleChange(e.target.value, i)}
                  className="w-full border rounded-md px-2 py-1 text-sm"
                />

                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => removeItem(i)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ListTag>

      {isEditing && (
        <button
          type="button"
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
