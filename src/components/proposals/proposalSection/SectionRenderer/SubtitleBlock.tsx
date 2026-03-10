export default function SubtitleBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { subtype, content } = block;

  const handleChange = (value: string, key?: string) => {
    const updated = [...data];

    if (subtype === "row") {
      updated[index] = {
        ...block,
        content: {
          ...content,
          [key!]: value,
        },
      };
    } else {
      updated[index] = { ...block, content: value };
    }

    setData(updated);
  };

  /* -------- ROW SUBTYPE -------- */

  if (subtype === "row") {
    const { title, value } = content;

    if (!isEditing) {
      return (
        <p className="text-sm">
          <span className="font-semibold">{title}:</span> {value}
        </p>
      );
    }

    return (
      <div className="flex gap-2 items-center">
        <input
          value={title}
          onChange={(e) => handleChange(e.target.value, "title")}
          className="font-semibold border-b border-border outline-none bg-transparent"
        />
        <span>:</span>
        <input
          value={value}
          onChange={(e) => handleChange(e.target.value, "value")}
          className="flex-1 border-b border-border outline-none bg-transparent"
        />
      </div>
    );
  }

  /* -------- NORMAL SUBTITLE -------- */

  if (!isEditing) {
    return (
      <h3 className="text-base font-semibold text-background">{content}</h3>
    );
  }

  return (
    <input
      value={content}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full font-semibold text-base border-b border-border outline-none bg-transparent"
    />
  );
}
