import { CircleCheck } from "lucide-react";

export default function ListBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { title, content } = block;
  const { subtype, items } = content;

  const handleChange = (value: string, itemIndex: number, key?: string) => {
    const updated = [...data];

    if (subtype === "titled") {
      updated[index] = {
        ...block,
        content: {
          ...content,
          items: items.map((item: any, i: number) =>
            i === itemIndex ? { ...item, [key!]: value } : item
          ),
        },
      };
    } else {
      updated[index] = {
        ...block,
        content: {
          ...content,
          items: items.map((item: string, i: number) =>
            i === itemIndex ? value : item
          ),
        },
      };
    }

    setData(updated);
  };

  /* ---------------- TITLED (Pseudo Q&A) ---------------- */

  if (subtype === "titled") {
    return (
      <div className="space-y-5 text-background">
        {title && <h3 className="font-semibold text-lg">{title}</h3>}

        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <div key={i} className="space-y-1">
              {!isEditing ? (
                <>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.content}
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    value={item.title}
                    onChange={(e) => handleChange(e.target.value, i, "title")}
                    className="border rounded-md px-2 py-1 text-sm"
                  />

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
      </div>
    );
  }

  /* ---------------- CHECKED LIST ---------------- */

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
                <input
                  value={item}
                  onChange={(e) => handleChange(e.target.value, i)}
                  className="w-full border rounded-md px-2 py-1 text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- BULLET / NUMBERED LIST ---------------- */

  const ListTag = subtype === "numbered" ? "ol" : "ul";
  const listStyle = subtype === "numbered" ? "list-decimal" : "list-disc";

  return (
    <div className="space-y-4">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}

      <ListTag
        className={`pl-6 space-y-2 list-inside ${listStyle} ${
          subtype === "numbered"
            ? "marker:text-primary marker:font-semibold marker:text-base"
            : ""
        }`}
      >
        {items.map((item: string, i: number) => (
          <li key={i}>
            {!isEditing ? (
              <span>{item}</span>
            ) : (
              <input
                value={item}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
            )}
          </li>
        ))}
      </ListTag>
    </div>
  );
}