import { Plus, Trash2 } from "lucide-react";
import CardBlock from "./CardBlock";

export default function GridBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { columns = 2, content } = block;

  const updateContent = (newContent: any[]) => {
    console.log("Updating content with:", newContent);

    const updated = [...data];
    updated[index] = {
      ...block,
      content: newContent,
    };

    setData(updated);
  };

  const addCard = () => {
    const newCard = {
      type: "card",
      subtype: "Technology",
      title: "New Card",
      content: [
        {
          Purpose: "",
          Motive: "",
        },
      ],
    };
    console.log("block", block);
    console.log("content", content);
    console.log("newCard", newCard);

    updateContent([...content, newCard]);
  };

  const removeCard = (cardIndex: number) => {
    console.log({ content: content, cardIndex });

    updateContent(content.filter((_: any, i: number) => i !== cardIndex));
  };

  return (
    <div className="space-y-4">
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
        {content.map((item: any, cardIndex: number) => {
          if (item.type === "card") {
            return (
              <div key={cardIndex} className="relative">
                {isEditing && (
                  <button
                    onClick={() => removeCard(cardIndex)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <CardBlock
                  block={item}
                  index={cardIndex}
                  data={content}
                  setData={(newContent: any) => updateContent(newContent)}
                  isEditing={isEditing}
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      {isEditing && (
        <button
          onClick={addCard}
          className="flex items-center gap-2 text-sm text-primary"
        >
          <Plus size={16} />
          Add card
        </button>
      )}
    </div>
  );
}
