import { Plus, Trash2 } from "lucide-react";

export default function TableBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { headers, rows, footer } = block.content;

  const updateRows = (newRows: string[][]) => {
    const updated = [...data];

    updated[index] = {
      ...block,
      content: {
        ...block.content,
        rows: newRows,
      },
    };

    setData(updated);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = rows.map((row: string[], r: number) =>
      r === rowIndex
        ? row.map((cell: string, c: number) => (c === colIndex ? value : cell))
        : row
    );

    updateRows(newRows);
  };

  const updateFooter = (colIndex: number, value: string) => {
    const updated = [...data];

    const newFooter = footer.map((cell: string, c: number) =>
      c === colIndex ? value : cell
    );

    updated[index] = {
      ...block,
      content: {
        ...block.content,
        footer: newFooter,
      },
    };

    setData(updated);
  };

  /* ---------------- ADD / REMOVE ROWS ---------------- */

  const addRow = () => {
    const emptyRow = headers.map(() => "");
    updateRows([...rows, emptyRow]);
  };

  const removeRow = (rowIndex: number) => {
    updateRows(rows.filter((_: any, i: number) => i !== rowIndex));
  };

  return (
    <div className="space-y-3 overflow-x-auto">
      <table className="w-full border border-border text-sm">
        {/* HEADER */}

        <thead className="bg-muted">
          <tr>
            {headers.map((header: string, i: number) => (
              <th
                key={i}
                className="border border-border px-3 py-2 text-left font-semibold"
              >
                {header}
              </th>
            ))}

            {isEditing && <th className="w-10" />}
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {rows.map((row: string[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: string, colIndex: number) => (
                <td key={colIndex} className="border border-border px-3 py-2">
                  {!isEditing ? (
                    cell
                  ) : (
                    <input
                      value={cell}
                      onChange={(e) =>
                        updateCell(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full bg-transparent outline-none"
                    />
                  )}
                </td>
              ))}

              {isEditing && (
                <td className="border border-border px-2 text-center">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>

        {/* FOOTER */}

        {footer && (
          <tfoot className="bg-muted font-semibold">
            <tr>
              {footer.map((cell: string, colIndex: number) => (
                <td key={colIndex} className="border border-border px-3 py-2">
                  {!isEditing ? (
                    cell
                  ) : (
                    <input
                      value={cell}
                      onChange={(e) =>
                        updateFooter(colIndex, e.target.value)
                      }
                      className="w-full bg-transparent outline-none"
                    />
                  )}
                </td>
              ))}

              {isEditing && <td />}
            </tr>
          </tfoot>
        )}
      </table>

      {/* ADD ROW BUTTON */}

      {isEditing && (
        <button
          onClick={addRow}
          className="flex items-center gap-2 text-sm text-primary"
        >
          <Plus size={16} />
          Add row
        </button>
      )}
    </div>
  );
}