import CardBlock from "./CardBlock";

export default function GridBlock({ block }: any) {
  const { columns = 2, content } = block;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {content.map((item: any, index: number) => {
        if (item.type === "card") {
          return <CardBlock key={index} block={item} />;
        }
        return null;
      })}
    </div>
  );
}