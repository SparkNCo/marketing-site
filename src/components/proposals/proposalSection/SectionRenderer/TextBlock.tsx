export default function TextBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const handleChange = (value: string) => {
    const updated = [...data];
    updated[index] = { ...block, content: value };
    setData(updated);
  };

  if (!isEditing) {
    return (
      <p className="text-muted-foreground leading-relaxed">
        {block.content}
      </p>
    );
  }

  return (
    <textarea
      value={block.content}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full border rounded-md p-3 text-sm"
      rows={4}
    />
  );
}