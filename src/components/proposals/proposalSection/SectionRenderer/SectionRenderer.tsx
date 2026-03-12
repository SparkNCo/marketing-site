import { useState } from "react";
import { Trash2 } from "lucide-react";

import TextBlock from "./TextBlock";
import ListBlock from "./ListBlock";
import TableBlock from "./TableBlock";
import SubtitleBlock from "./SubtitleBlock";
import CardBlock from "./CardBlock";
import GridBlock from "./GridBlock";

/* ---------------- BLOCK REGISTRY ---------------- */

const blockRegistry: Record<string, any> = {
  text: TextBlock,
  subtitle: SubtitleBlock,
  list: ListBlock,
  table: TableBlock,
  grid: GridBlock,
  card: CardBlock,
};

/* ---------------- BLOCK TEMPLATES ---------------- */

const blockTemplates: Record<string, any> = {
  text: {
    type: "text",
    content: "",
  },

  subtitle: {
    type: "subtitle",
    content: "New Subtitle",
  },

  list: {
    type: "list",
    content: {
      subtype: "bulleted",
      items: [
        {
          title: "",
          content: "",
        },
      ],
    },
  },

  table: {
    type: "table",
    content: {
      headers: ["Column 1", "Column 2"],
      rows: [["", ""]],
    },
  },

  grid: {
    type: "grid",
    columns: 2,
    content: [],
  },

  card: {
    type: "card",
    subtype: "Technology",
    title: "New Card",
    content: [
      {
        Purpose: "",
        Motive: "",
      },
    ],
  },
};

export default function SectionRenderer({ data, setData, isEditing }: any) {
  const [showPicker, setShowPicker] = useState(false);

  if (!Array.isArray(data)) return null;

  /* ---------------- ADD BLOCK ---------------- */

  const addBlock = (type: string) => {
    const template = blockTemplates[type];

    const newBlock = structuredClone(template);

    setData([...data, newBlock]);

    setShowPicker(false);
  };

  /* ---------------- DELETE BLOCK ---------------- */

  const removeBlock = (blockIndex: number) => {
    const updated = data.filter((_: any, i: number) => i !== blockIndex);
    setData(updated);
  };

  return (
    <div className="space-y-6">
      {/* ---------------- RENDER BLOCKS ---------------- */}

      {data.map((block: any, index: number) => {
        const Component = blockRegistry[block.type];
        if (!Component) return null;

        return (
          <div key={index} className="relative group">
            {/* DELETE BUTTON */}

            {isEditing && (
              <button
                onClick={() => removeBlock(index)}
                className="absolute -right-2 -top-2 bg-white border rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            )}

            <Component
              block={block}
              index={index}
              data={data}
              setData={setData}
              isEditing={isEditing}
            />
          </div>
        );
      })}

      {/* ---------------- ADD BLOCK UI ---------------- */}

      {isEditing && (
        <div className="pt-6 border-t space-y-3">
          {!showPicker && (
            <button
              onClick={() => setShowPicker(true)}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              + Add Block
            </button>
          )}

          {showPicker && (
            <div className="flex flex-wrap gap-2">
              {Object.keys(blockTemplates).map((type) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="px-3 py-1 text-sm border rounded-lg hover:bg-muted"
                >
                  {type}
                </button>
              ))}

              <button
                onClick={() => setShowPicker(false)}
                className="px-3 py-1 text-sm text-red-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}