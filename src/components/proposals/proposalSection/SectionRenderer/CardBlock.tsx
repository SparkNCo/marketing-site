export default function CardBlock({
  block,
  index,
  data,
  setData,
  isEditing,
}: any) {
  const { subtype, title, content } = block;

  const updateContent = (newContent: any) => {
    const updated = [...data];

    updated[index] = {
      ...block,
      content: newContent,
    };

    setData(updated);
  };

  const updateTitle = (value: string) => {
    const updated = [...data];

    updated[index] = {
      ...block,
      title: value,
    };

    setData(updated);
  };

  /* ---------------- REFERENCE ---------------- */

  if (subtype === "Reference") {
    const ref = content?.[0];

    const updateRef = (key: string, value: string) => {
      updateContent([{ ...ref, [key]: value }]);
    };

    return (
      <div className="border rounded-xl p-6 bg-muted/30 space-y-3">
        {!isEditing ? (
          <p className="italic text-sm leading-relaxed">"{ref.quote}"</p>
        ) : (
          <textarea
            value={ref.quote}
            onChange={(e) => updateRef("quote", e.target.value)}
            className="w-full border rounded-md px-2 py-1 text-sm"
          />
        )}

        <div className="text-sm space-y-2">
          {!isEditing ? (
            <>
              <p className="font-semibold">{ref.author}</p>
              <p className="text-muted-foreground">
                {ref.position} - {ref.company}
              </p>
            </>
          ) : (
            <>
              <input
                value={ref.author}
                onChange={(e) => updateRef("author", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />

              <input
                value={ref.position}
                onChange={(e) => updateRef("position", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />

              <input
                value={ref.company}
                onChange={(e) => updateRef("company", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- CASE STUDY ---------------- */

  if (subtype === "Cases") {
    return (
      <div className="border rounded-xl p-6 bg-muted/30 space-y-3">
        {!isEditing ? (
          title && <h3 className="font-semibold">{title}</h3>
        ) : (
          <input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
        )}

        <div className="space-y-3 text-sm">
          {content?.map((item: any, i: number) => (
            <div key={i}>
              {!isEditing ? (
                <>
                  <span className="font-semibold">{item.title}: </span>
                  {item.content}
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const newItems = content.map((it: any, j: number) =>
                        j === i ? { ...it, title: e.target.value } : it
                      );
                      updateContent(newItems);
                    }}
                    className="border rounded-md px-2 py-1 text-sm"
                  />

                  <textarea
                    value={item.content}
                    onChange={(e) => {
                      const newItems = content.map((it: any, j: number) =>
                        j === i ? { ...it, content: e.target.value } : it
                      );
                      updateContent(newItems);
                    }}
                    className="border rounded-md px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- TECHNOLOGY ---------------- */

  if (subtype === "Technology") {
    const tech = content?.[0];

    const updateTech = (key: string, value: string) => {
      updateContent([{ ...tech, [key]: value }]);
    };

    return (
      <div className="border rounded-xl p-6 bg-muted/30 space-y-3">
        {!isEditing ? (
          <h3 className="font-semibold">{title}</h3>
        ) : (
          <input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
        )}

        <div className="text-sm space-y-2">
          <div>
            <span className="font-semibold">Purpose: </span>
            {!isEditing ? (
              tech.Purpose
            ) : (
              <input
                value={tech.Purpose}
                onChange={(e) => updateTech("Purpose", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />
            )}
          </div>

          <div>
            <span className="font-semibold">Motive: </span>
            {!isEditing ? (
              tech.Motive
            ) : (
              <input
                value={tech.Motive}
                onChange={(e) => updateTech("Motive", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- TEAM ---------------- */

  if (subtype === "Team") {
    const member = content?.[0];

    const updateMember = (key: string, value: string) => {
      updateContent([{ ...member, [key]: value }]);
    };

    return (
      <div className="border rounded-xl p-6 bg-muted/30 space-y-3">
        {!isEditing ? (
          <h3 className="font-semibold">{title}</h3>
        ) : (
          <input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
        )}

        <div className="text-sm space-y-2">
          <div>
            <span className="font-semibold">Role: </span>
            {!isEditing ? (
              member.Purpose
            ) : (
              <input
                value={member.Purpose}
                onChange={(e) => updateMember("Purpose", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />
            )}
          </div>

          <div>
            <span className="font-semibold">Allocation: </span>
            {!isEditing ? (
              member.Motive
            ) : (
              <input
                value={member.Motive}
                onChange={(e) => updateMember("Motive", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- TIMELINE ---------------- */

  if (subtype === "timeline") {
    return (
      <div className="border rounded-xl p-6 bg-muted/30 space-y-3">
        {!isEditing ? (
          <h3 className="font-semibold">{title}</h3>
        ) : (
          <input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
        )}

        {!isEditing ? (
          <p className="text-sm leading-relaxed">{content?.text}</p>
        ) : (
          <textarea
            value={content?.text}
            onChange={(e) =>
              updateContent({ ...content, text: e.target.value })
            }
            className="w-full border rounded-md px-2 py-1 text-sm"
          />
        )}
      </div>
    );
  }

  /* ---------------- DELIVERABLE ---------------- */

  if (subtype === "Deliverable") {
    return (
      <div className="border rounded-xl p-6 bg-muted/30 space-y-3">
        {!isEditing ? (
          <h3 className="font-semibold">{title}</h3>
        ) : (
          <input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
        )}

        {!isEditing ? (
          <p className="text-sm">{content.text}</p>
        ) : (
          <textarea
            value={content.text}
            onChange={(e) =>
              updateContent({ ...content, text: e.target.value })
            }
            className="w-full border rounded-md px-2 py-1 text-sm"
          />
        )}

        <div>
          <span className="font-semibold">Acceptance Criteria: </span>

          {!isEditing ? (
            content.acceptanceCriteria
          ) : (
            <textarea
              value={content.acceptanceCriteria}
              onChange={(e) =>
                updateContent({
                  ...content,
                  acceptanceCriteria: e.target.value,
                })
              }
              className="w-full border rounded-md px-2 py-1 text-sm"
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}