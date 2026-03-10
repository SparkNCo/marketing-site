import TextBlock from "./TextBlock";
import ListBlock from "./ListBlock";
import TableBlock from "./TableBlock";
import SubtitleBlock from "./SubtitleBlock";
import CardBlock from "./CardBlock";
import GridBlock from "./GridBlock";

export default function SectionRenderer({ data, setData, isEditing }: any) {
  if (!Array.isArray(data)) return null;

  return (
    <div className="space-y-6">
      {data.map((block: any, index: number) => {
        switch (block.type) {
          case "text":
            return (
              <TextBlock
                key={index}
                block={block}
                index={index}
                data={data}
                setData={setData}
                isEditing={isEditing}
              />
            );

          case "subtitle":
            return (
              <SubtitleBlock
                key={index}
                block={block}
                index={index}
                data={data}
                setData={setData}
                isEditing={isEditing}
              />
            );
          case "card":
            return (
              <CardBlock
                key={index}
                block={block}
                index={index}
                data={data}
                setData={setData}
                isEditing={isEditing}
              />
            );
          case "grid":
            return <GridBlock key={index} block={block} />;

          case "list":
            return (
              <ListBlock
                key={index}
                block={block}
                index={index}
                data={data}
                setData={setData}
                isEditing={isEditing}
              />
            );

          case "table":
            return (
              <TableBlock
                key={index}
                block={block}
                index={index}
                data={data}
                setData={setData}
                isEditing={isEditing}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
