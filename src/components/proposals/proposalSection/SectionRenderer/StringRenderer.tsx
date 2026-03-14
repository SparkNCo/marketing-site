export default function StringRenderer({ data, setData, isEditing }: any) {
  if (isEditing) {
    return (
      <textarea
        className="w-full  p-3 text-background border-none outline-none focus:outline-none"
        value={data || ""}
        onChange={(e) => setData(e.target.value)}
      />
    );
  }

  return (
    <p className="leading-relaxed text-background">
      {data}
    </p>
  );
}