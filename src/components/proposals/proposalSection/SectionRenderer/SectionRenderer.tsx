import StringRenderer from "./StringRenderer";
import ObjectRenderer from "./ObjectRenderer";
import ArrayStringRenderer from "./ArrayStringRenderer";
import ArrayObjectRenderer from "./ArrayObjectRenderer";
import NestedObjectRenderer from "./NestedObjectRenderer";

export default function SectionRenderer({ data, setData, isEditing }: any) {
  if (typeof data === "string") {
    return (
      <StringRenderer data={data} setData={setData} isEditing={isEditing} />
    );
  }

  if (Array.isArray(data)) {
    if (typeof data[0] === "string") {
      return (
        <ArrayStringRenderer
          data={data}
          setData={setData}
          isEditing={isEditing}
        />
      );
    }

    return (
      <ArrayObjectRenderer
        data={data}
        setData={setData}
        isEditing={isEditing}
      />
    );
  }

  if (typeof data === "object") {
    const hasNestedArray = Object.values(data).some((v) => Array.isArray(v));

    if (hasNestedArray) {
      return (
        <NestedObjectRenderer
          data={data}
          setData={setData}
          isEditing={isEditing}
        />
      );
    }

    return (
      <ObjectRenderer data={data} setData={setData} isEditing={isEditing} />
    );
  }

  return null;
}
