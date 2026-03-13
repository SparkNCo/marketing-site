import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CardBlock from "./CardBlock";

export default function GridBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { columns = 2, content } = block;
  const [newCardSubtype, setNewCardSubtype] = useState("Technology");

  const updateContent = (newContent: any[]) => {
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
      subtype: newCardSubtype,
      title: "New Card",
      content: [
        {
          Purpose: "",
          Motive: "",
        },
      ],
    };

    updateContent([...content, newCard]);
  };

  const removeCard = (cardIndex: number) => {
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
        <div className="flex flex-col md:flex-row items-start gap-6 mx-4">
          <button
            onClick={addCard}
            className="flex items-center gap-2 text-sm text-primary my-auto"
          >
            <Plus size={16} />
            Add card
          </button>

          <select
            value={newCardSubtype}
            onChange={(e) => setNewCardSubtype(e.target.value)}
            className="bg-card text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm appearance-none"
          >
            <option value="Technology">Technology</option>
            <option value="Team">Team</option>
            <option value="Cases">Cases</option>
            <option value="Reference">Reference</option>
          </select>
        </div>
      )}
    </div>
  );
}
