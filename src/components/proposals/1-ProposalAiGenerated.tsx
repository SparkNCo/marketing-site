"use client";

import { FileText, Pencil, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

interface ProposalSectionProps {
  title: string;
  data: any;
  setProposal: (data: any) => void;
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

  const toggleEditMode = () => {
    if (isEditing) {
      setProposal(localData);
    }
    setIsEditing((prev) => !prev);
  };

  /* ---------------- Helpers ---------------- */

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

  /* ---------------- Renderers ---------------- */

  const renderString = () =>
    isEditing ? (
      <textarea
        className="w-full rounded-lg border p-3 "
        value={localData}
        onChange={(e) => setLocalData(e.target.value)}
      />
    ) : (
      <p className="leading-relaxed text-foreground">{localData}</p>
    );

  const renderObject = () => (
    <div className="space-y-4">
      {Object.entries(localData).map(([key, value]) => (
        <div key={key}>
          <h3 className="text-sm font-semibold text-primary ">{key}</h3>

          {isEditing ? (
            <input
              className="mt-1 w-full rounded-lg border p-2"
              value={value as string}
              onChange={(e) => updateField(key, e.target.value)}
            />
          ) : (
            <p className="text-foreground">{value as string}</p>
          )}
        </div>
      ))}
    </div>
  );

  const renderArrayOfStrings = () => (
    <ul className="list-disc space-y-2 pl-6 text-foreground">
      {localData.map((item: string, i: number) => (
        <li key={i}>
          {isEditing ? (
            <input
              className="w-full rounded-lg border p-2"
              value={item}
              onChange={(e) => {
                const arr = [...localData];
                arr[i] = e.target.value;
                setLocalData(arr);
              }}
            />
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );

  const renderArrayOfObjects = () => (
    <div className="space-y-6">
      {localData.map((item: any, index: number) => (
        <div key={index} className="space-y-2">
          {Object.entries(item).map(([field, value]) => (
            <div key={field}>
              <h4 className="text-sm font-semibold text-primary  ">{field}</h4>

              {isEditing ? (
                <input
                  className="w-full rounded-lg border p-2"
                  value={value as string}
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
    </div>
  );
  // border-4 border-red-80
  const renderNestedObject = () => (
    <div className="space-y-6">
      {Object.entries(localData).map(([key, value]) => (
        <div key={key}>
          <h3 className="mb-2 text-lg font-bold text-primary 0 ">{key}</h3>

          {Array.isArray(value) ? (
            typeof value[0] === "string" ? (
              <ul className="list-disc space-y-2 pl-6">
                {value.map((v: string, i: number) => (
                  <li className="text-foreground" key={i}>
                    {v}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-4 ">
                {value.map((obj: any, i: number) => (
                  <div className="text-primary" key={i}>
                    {Object.entries(obj).map(([f, val]) => (
                      <p key={f}>
                        <span className="font-semibold text-foreground ">
                          {f}:
                        </span>{" "}
                        {val as string}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-foreground">{value as string}</p>
          )}
        </div>
      ))}
    </div>
  );

  /* ---------------- Type Detection ---------------- */

  const renderContent = () => {
    if (typeof localData === "string") return renderString();

    if (Array.isArray(localData)) {
      if (typeof localData[0] === "string") return renderArrayOfStrings();

      return renderArrayOfObjects();
    }

    if (typeof localData === "object") {
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
      {/* Header */}
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

      {/* Content */}
      <Card className="border-border bg-background p-8">{renderContent()}</Card>
    </section>
  );
}
