import { useState } from "react";
import { Trash2 } from "lucide-react";

import TextBlock from "./TextBlock";
import ListBlock from "./ListBlock";
import TableBlock from "./TableBlock";
import SubtitleBlock from "./SubtitleBlock";
import CardBlock from "./CardBlock";
import GridBlock from "./GridBlock";

const blockRegistry: Record<string, any> = {
  text: TextBlock,
  subtitle: SubtitleBlock,
  list: ListBlock,
  table: TableBlock,
  grid: GridBlock,
  card: CardBlock,
};

const blockTemplates: Record<string, any> = {
  text: { type: "text", content: "" },
  subtitle: { type: "subtitle", content: "New Subtitle" },
  list: {
    type: "list",
    content: { subtype: "bulleted", items: [{ title: "", content: "" }] },
  },
  table: {
    type: "table",
    content: { headers: ["Column 1", "Column 2"], rows: [["", ""]] },
    columns: 2,
  },
  grid: { type: "grid", columns: 2, content: [] },
/*   card: {
    type: "card",
    subtype: "Technology",
    title: "New Card",
    content: [{ Purpose: "", Motive: "" }],
  }, */
};

export default function SectionRenderer({ data, setData, isEditing }: any) {
  const [showPicker, setShowPicker] = useState(false);
  const [newListSubtype, setNewListSubtype] = useState("bulleted");
  const [newTableColumns, setNewTableColumns] = useState(2);
  const [newGridColumns, setNewGridColumns] = useState(2);

  if (!Array.isArray(data)) return null;

  const addBlock = (type: string) => {
    const template = structuredClone(blockTemplates[type]);

    if (type === "list") {
      template.content.subtype = newListSubtype;
    }

    if (type === "table") {
      template.columns = newTableColumns;
      template.content.headers = Array.from(
        { length: newTableColumns },
        (_, i) => `Column ${i + 1}`,
      );
      template.content.rows = [
        Array.from(
          { length: newTableColumns },
          (_, i) => `Row 1, Col ${i + 1}`,
        ),
      ];
    }

    if (type === "grid") {
      template.columns = newGridColumns;
    }

    setData([...data, template]);
    setShowPicker(false);
  };

  const removeBlock = (blockIndex: number) => {
    setData(data.filter((_: any, i: number) => i !== blockIndex));
  };

  return (
    <div className="space-y-6">
      {data.map((block: any, index: number) => {
        const Component = blockRegistry[block.type];
        if (!Component) return null;

        return (
          <div key={index} className="relative group">
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
            <div className="flex flex-wrap gap-2 items-center">
              {Object.keys(blockTemplates).map((type) => {
                if (type === "list") {
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <select
                        value={newListSubtype}
                        onChange={(e) => setNewListSubtype(e.target.value)}
                        className="bg-card text-sm px-3 py-1 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="bulleted">Bulleted</option>
                        <option value="numbered">Numbered</option>
                        <option value="checked">Checked</option>
                        <option value="titled">Titled</option>
                      </select>

                      <button
                        onClick={() => addBlock(type)}
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-muted"
                      >
                        {type}
                      </button>
                    </div>
                  );
                }

                if (type === "table") {
                  return (
                    <div key={type} className="flex items-center">
                      <button
                        onClick={() => addBlock(type)}
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-muted"
                      >
                        {type}
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={newTableColumns}
                        onChange={(e) =>
                          setNewTableColumns(Number(e.target.value))
                        }
                        className="bg-card text-sm px-3 py-1 rounded-lg w-16 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  );
                }

                if (type === "grid") {
                  return (
                    <div key={type} className="flex items-center ">
                      <button
                        onClick={() => addBlock(type)}
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-muted"
                      >
                        {type}
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={newGridColumns}
                        onChange={(e) =>
                          setNewGridColumns(Number(e.target.value))
                        }
                        className="bg-card text-sm px-3 py-1 rounded-lg w-16 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  );
                }

                return (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="px-3 py-1 text-sm border rounded-lg hover:bg-muted"
                  >
                    {type}
                  </button>
                );
              })}

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
