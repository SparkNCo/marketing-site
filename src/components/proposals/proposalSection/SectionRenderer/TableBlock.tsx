export default function TableBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { headers, rows, footer } = block.content;

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const updated = [...data];

    const newRows = rows.map((row: string[], r: number) =>
      r === rowIndex
        ? row.map((cell: string, c: number) => (c === colIndex ? value : cell))
        : row,
    );

    updated[index] = {
      ...block,
      content: {
        ...block.content,
        rows: newRows,
      },
    };

    setData(updated);
  };

  const updateFooter = (colIndex: number, value: string) => {
    const updated = [...data];

    const newFooter = footer.map((cell: string, c: number) =>
      c === colIndex ? value : cell,
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

  return (
    <div className="overflow-x-auto">
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
                      onChange={(e) => updateFooter(colIndex, e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  )}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
