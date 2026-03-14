import { useMutation } from "@tanstack/react-query";
import { PlusCircle, Save } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { patchIgPost } from "./patchPost";

// @ts-nocheck

export default function SquaresPostLayout({
  children,
  edit = false,
  squares = [],
  indexLayout = 10,
  indexComponent = 5,
  width = "",
  margin = "auto",
  tags = [],
  indexTags = 15,
  onTagsChange,
  onSave,
  blogId,
}: {
  children: React.ReactNode;
  squares?: any[];
  indexLayout?: number;
  indexComponent?: number;
  onTagsChange?: (tags: string[]) => void;
  onSave?: () => void;
  blogId?: string | null;
}) {
  const [tagGroups, setTagGroups] = useState(tags);
  const debounceRef = useRef(null);

  // const mutation = useMutation({
  //   mutationFn: async (tags: string[]) => {
  //     const res = await fetch(
  //       `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           tags,
  //         }),
  //       },
  //     );
  //     if (!res.ok) {
  //       throw new Error("Failed to update tags");
  //     }

  //     return res.json();
  //   },
  // });

  const mutation = useMutation({
    mutationFn: (tags: string[]) => patchIgPost(blogId!, { tags }),
  });

  // useEffect(() => {
  // setTagGroups(tags);
  // }, [tags]);

  useEffect(() => {
    if (!edit) return;
    if (!blogId) return;

    const currentTags = tagGroups?.[0]?.labels ?? [];
    const originalTags = tags?.[0]?.labels ?? [];

    if (JSON.stringify(currentTags) === JSON.stringify(originalTags)) {
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      mutation.mutate(currentTags);
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [tagGroups]);

  const handleTagChange = (groupIndex, tagIndex, value) => {
    const updated = [...tagGroups];

    updated[groupIndex] = {
      ...updated[groupIndex],
      labels: [...updated[groupIndex].labels],
    };

    updated[groupIndex].labels[tagIndex] = value;

    setTagGroups(updated);
    onTagsChange?.(updated[groupIndex].labels);
  };

  const deleteTag = (groupIndex, tagIndex) => {
    const updated = [...tagGroups];
    updated[groupIndex].labels.splice(tagIndex, 1);

    setTagGroups(updated);
    onTagsChange?.(updated[groupIndex].labels);
  };

  const addTag = (groupIndex) => {
    const updated = [...tagGroups];

    if (!updated[groupIndex].labels) {
      updated[groupIndex].labels = [];
    }

    updated[groupIndex].labels.push("new tag");

    setTagGroups(updated);
    onTagsChange?.(updated[groupIndex].labels);
  };

  return (
    <div
      className="relative h-full"
      style={{ width: width || "auto", margin: margin }}
    >
      {/* Main content */}
      <div className="relative h-full" style={{ zIndex: indexComponent }}>
        {children}
      </div>

      {/* TAGS */}
      {tagGroups.length > 0 && (
        <div
          className={`${edit ? "" : "pointer-events-none"} absolute inset-0`}
          style={{ zIndex: indexTags }}
        >
          {tagGroups.map((group, i) => {
            const reversed = [...group.labels].reverse();

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  right: group.x,
                  top: group.y,
                  width: "max-content",
                  direction: "rtl",
                }}
              >
                {/* TAGS */}
                <div className="flex flex-wrap gap-3 justify-end  max-w-[1350px] w-full ml-auto">
                  {" "}
                  {reversed.map((label, j) => {
                    const realIndex = group.labels.length - 1 - j;

                    return edit ? (
                      <div key={j} className="relative flex items-center">
                        <input
                          value={label}
                          onChange={(e) =>
                            handleTagChange(i, realIndex, e.target.value)
                          }
                          className="
              px-6 py-2 text-2xl
              w-fit min-w-[120px]
              text-background font-semibold
              
              bg-[#F7F4F0]
              text-center
              outline-none
              border-none
              focus:ring-0
            "
                        />

                        <button
                          onClick={() => deleteTag(i, realIndex)}
                          className="absolute -right-6 text-red-500 text-xl"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span
                        key={j}
                        className="
            px-6 py-2 text-2xl
            w-fit min-w-[120px]
            text-background font-semibold
            
            bg-[#F7F4F0]
            whitespace-nowrap
            text-center
          "
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>

                {/* ADD BUTTON */}
                {edit && (
                  <div className="mt-3 flex justify-end  w-[50px]">
                    <button onClick={() => addTag(i)}>
                      <PlusCircle
                        size={32}
                        className="text-neutral-400 hover:text-neutral-600 transition"
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SQUARES */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: indexLayout }}
      >
        {squares.map((sq, i) => {
          const moveAnim = `squareMoveAnim_${i}`;

          return (
            <div key={i}>
              {(sq.moveToX || sq.moveToY) && (
                <style>
                  {`
                  @keyframes ${moveAnim} {
                    0% { transform: translate(0px,0px); }
                    50% {
                      transform: translate(
                        calc(${sq.moveToX ?? sq.x} - ${sq.x}),
                        calc(${sq.moveToY ?? sq.y} - ${sq.y})
                      );
                    }
                    100% { transform: translate(0px,0px); }
                  }
                `}
                </style>
              )}

              <div
                className="absolute"
                style={{
                  left: sq.x,
                  top: sq.y,
                  width: sq.width,
                  height: sq.height,
                  backgroundColor: sq.color,
                  zIndex: sq.zIndex ?? 0,
                  "--color-1": sq.color,
                  "--color-2": sq.color2 ?? sq.color,
                  animation: [
                    sq.color2
                      ? `square-color ${sq.duration ?? 3}s ease-in-out ${
                          sq.colorDelay ?? 0
                        }s infinite`
                      : null,
                    sq.moveToX || sq.moveToY
                      ? `${moveAnim} ${sq.moveDuration ?? 6}s ease-in-out infinite`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(", "),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
