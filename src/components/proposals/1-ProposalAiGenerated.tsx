"use client";

import { FileText, Pencil, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
interface ProposalSectionProps {
  title: string;
  data: any;
  setProposal: (data: any) => void; // ← parent updater
  dbUser?: { role?: string };
}

export default function ProposalSection({
  title,
  data,
  setProposal,
  dbUser,
}: ProposalSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState<any>(data);

  const createEmptyObject = (obj: any) => {
    const empty: any = {};

    Object.keys(obj || {}).forEach((key) => {
      empty[key] = "";
    });

    return empty;
  };

  /* ---------------- Sync when parent changes ---------------- */
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  /* ---------------- Toggle edit ---------------- */
  const toggleEditMode = () => {
    if (isEditing) {
      // 🔥 Push changes to parent
      setProposal(localData);
    }

    setIsEditing((prev) => !prev);
  };

  /* ---------------- Update helpers ---------------- */

  const updateField = (key: string, value: any) => {
    setLocalData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateArrayItem = (
    index: number,
    field: string,
    value: any,
    parentKey?: string,
  ) => {
    setLocalData((prev: any) => {
      if (parentKey) {
        const arr = [...prev[parentKey]];
        arr[index] = { ...arr[index], [field]: value };
        return { ...prev, [parentKey]: arr };
      }

      const arr = [...prev];
      arr[index] = { ...arr[index], [field]: value };
      return arr;
    });
  };
  const updateNestedValue = (parentKey: string, value: any) => {
    setLocalData((prev: any) => ({
      ...prev,
      [parentKey]: value,
    }));
  };
  const updateNestedArrayItem = (
    parentKey: string,
    index: number,
    field: string,
    value: any,
  ) => {
    setLocalData((prev: any) => {
      const arr = [...prev[parentKey]];
      arr[index] = {
        ...arr[index],
        [field]: value,
      };

      return {
        ...prev,
        [parentKey]: arr,
      };
    });
  };

  /* ---------------- Renderers ---------------- */

  const renderString = () =>
    isEditing ? (
      <textarea
        className="w-full rounded-lg p-3"
        value={localData || ""}
        onChange={(e) => setLocalData(e.target.value)}
      />
    ) : (
      <p className="leading-relaxed text-foreground">{localData}</p>
    );

  const renderObject = () => {
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");

    const deleteField = (key: string) => {
      const obj = { ...localData };
      delete obj[key];
      setLocalData(obj);
    };

    const addField = () => {
      if (!newKey) return;

      setLocalData({
        ...localData,
        [newKey]: newValue,
      });

      setNewKey("");
      setNewValue("");
    };

    return (
      <div className="space-y-4">
        {Object.entries(localData || {}).map(([key, value]) => (
          <div key={key} className="relative">
            <h3 className="text-sm font-semibold text-primary">{key}</h3>

            {isEditing ? (
              <div className="flex gap-2 items-center">
                <input
                  className="mt-1 w-full rounded-lg p-2"
                  value={(value as string) || ""}
                  onChange={(e) => updateField(key, e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => deleteField(key)}
                  className="rounded-md p-2 text-destructive hover:bg-destructive/10 transition"
                >
                  <Trash2 className="h-4 w-4 text-foreground" />
                </button>
              </div>
            ) : (
              <p className="text-foreground">{value as string}</p>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="flex gap-2 pt-4 border-t">
            <input
              placeholder="Field name"
              className="rounded-lg border p-2 w-1/3"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />

            <input
              placeholder="Value"
              className="rounded-lg border p-2 w-full"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />

            <button
              type="button"
              onClick={addField}
              className="rounded-md px-3 py-2 bg-primary text-primary-foreground"
            >
              Add
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderArrayOfStrings = () => (
    <div>
      <ul className="list-disc space-y-2 pl-6 text-foreground">
        {(localData || []).map((item: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            {isEditing ? (
              <>
                <input
                  className="w-full rounded-lg p-2 text-background"
                  value={item || ""}
                  onChange={(e) => {
                    const arr = [...localData];
                    arr[i] = e.target.value;
                    setLocalData(arr);
                  }}
                />

                {/* ✅ DELETE */}
                <button
                  type="button"
                  onClick={() => {
                    const arr = [...localData];
                    arr.splice(i, 1);
                    setLocalData(arr);
                  }}
                  className="rounded-md p-2 text-destructive hover:bg-destructive/10 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>

      {/* ✅ ADD STRING */}
      {isEditing && (
        <button
          type="button"
          onClick={() => setLocalData([...(localData || []), ""])}
          className="mt-3 text-sm text-primary hover:underline"
        >
          + Add Item
        </button>
      )}
    </div>
  );

  const renderArrayOfObjects = () => (
    <div className="space-y-6">
      {(localData || []).map((item: any, index: number) => (
        <div key={index} className="relative space-y-2 rounded-lg p-4">
          {/* ✅ DELETE OBJECT */}
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                const arr = [...localData];
                arr.splice(index, 1);
                setLocalData(arr);
              }}
              className="absolute right-2 top-2 rounded-md p-2 text-destructive hover:bg-destructive/10 transition"
            >
              <Trash2 className="h-4 w-4 text-foreground" />
            </button>
          )}

          {Object.entries(item).map(([field, value]) => (
            <div key={field}>
              <h4 className="text-sm font-semibold text-primary">{field}</h4>

              {isEditing ? (
                <input
                  className="w-full rounded-lg border p-2"
                  value={(value as string) || ""}
                  onChange={(e) =>
                    updateArrayItem(index, field, e.target.value)
                  }
                />
              ) : (
                <p className="text-foreground">{value as string}</p>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* ✅ ADD OBJECT */}
      {isEditing && (
        <button
          type="button"
          onClick={() => {
            const template =
              localData?.length > 0
                ? Object.fromEntries(
                    Object.keys(localData[0]).map((k) => [k, ""]),
                  )
                : {};

            setLocalData([...(localData || []), template]);
          }}
          className="text-sm text-primary hover:underline"
        >
          + Add Item
        </button>
      )}
    </div>
  );

  const renderNestedObject = () => (
    <div className="space-y-6 text-foreground">
      {Object.entries(localData || {}).map(([key, value]) => (
        <div key={key}>
          <h3 className="mb-2 text-lg font-bold text-primary">{key}</h3>

          {/* ---------------- ARRAY ---------------- */}
          {Array.isArray(value) ? (
            <>
              {/* ========= ARRAY OF STRINGS ========= */}
              {typeof value[0] === "string" ? (
                <>
                  {value.map((v: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      {isEditing ? (
                        <>
                          <input
                            className="w-full rounded-lg border p-2 text-background"
                            value={v}
                            onChange={(e) => {
                              const arr = [...value];
                              arr[i] = e.target.value;
                              updateNestedValue(key, arr);
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => {
                              const arr = [...value];
                              arr.splice(i, 1);
                              updateNestedValue(key, arr);
                            }}
                            className="p-2 rounded-md text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <p>{v}</p>
                      )}
                    </div>
                  ))}

                  {/* ✅ ADD STRING */}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => updateNestedValue(key, [...value, ""])}
                      className="text-sm text-primary hover:underline mt-2"
                    >
                      + Add Item
                    </button>
                  )}
                </>
              ) : (
                <>
                  {/* ========= ARRAY OF OBJECTS ========= */}
                  {value.map((obj: any, i: number) => (
                    <div key={i} className="relative space-y-2 rounded-lg p-4">
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            const arr = [...value];
                            arr.splice(i, 1);
                            updateNestedValue(key, arr);
                          }}
                          className="absolute right-2 top-2 p-2 text-destructive hover:bg-destructive/10 rounded-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      {Object.entries(obj).map(([f, val]) => (
                        <div key={f}>
                          <span className="font-semibold">{f}</span>

                          {isEditing ? (
                            <input
                              className="w-full rounded-lg p-2 mt-1 text-background"
                              value={(val as string) || ""}
                              onChange={(e) =>
                                updateNestedArrayItem(key, i, f, e.target.value)
                              }
                            />
                          ) : (
                            <p>{val as string}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* ✅ ADD OBJECT */}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        const template =
                          value.length > 0
                            ? Object.fromEntries(
                                Object.keys(value[0]).map((k) => [k, ""]),
                              )
                            : {};

                        updateNestedValue(key, [...value, template]);
                      }}
                      className="text-sm text-primary hover:underline mt-3"
                    >
                      + Add Item
                    </button>
                  )}
                </>
              )}
            </>
          ) : isEditing ? (
            <input
              className="w-full rounded-lg p-2 text-background"
              value={(value as string) || ""}
              onChange={(e) => updateNestedValue(key, e.target.value)}
            />
          ) : (
            <p>{value as string}</p>
          )}
        </div>
      ))}
    </div>
  );

  /* ---------------- Type detection ---------------- */

  const renderContent = () => {
    if (typeof localData === "string") return renderString();

    if (Array.isArray(localData)) {
      if (typeof localData[0] === "string") return renderArrayOfStrings();
      return renderArrayOfObjects();
    }

    if (typeof localData === "object" && localData !== null) {
      const hasNestedArray = Object.values(localData).some((v) =>
        Array.isArray(v),
      );

      if (hasNestedArray) return renderNestedObject();
      return renderObject();
    }

    return null;
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="mb-16 w-[80vw]">
      <div className="mb-6 mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-card">{title}</h2>
        </div>

        {dbUser?.role === "admin" && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditMode}
            className="flex items-center gap-2 bg-background text-foreground"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" /> Edit
              </>
            )}
          </Button>
        )}
      </div>

      <Card className="border-border bg-background p-8">{renderContent()}</Card>
    </section>
  );
}
