import React, { useState } from "react";

export default function BuildScaleToggle({ setMode }) {
  const [selected, setSelected] = useState<"build" | "scale">("build");

  const cardClasses = (type: "build" | "scale") => {
    const isSelected = selected === type;
    return `
      bg-background p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300
      ${isSelected ? "w-3/5 p-8 scale-100" : "w-max px-6 py-3 scale-95 hover:scale-100"}
    `;
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-start">
      {/* Build Card */}
      <div
        className={cardClasses("build")}
        // Only allow changing selection if not already selected
        onClick={() => selected !== "build" && setSelected("build")}
        style={{ transformOrigin: "center" }}
      >
        <div className="w-full justify-between flex flex-row ">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/BuildIcon.png"
              alt="Success"
              className=" w-8 h-8 object-contain"
            />
            <h2 className="text-xl font-bold text-foreground ">Build</h2>
          </div>

          {selected === "build" && (
            <img
              onClick={() => setMode("form")}
              src="/GoIcon.png"
              alt="Success"
              className="w-8 h-8 object-contain cursor-pointer"
            />
          )}
        </div>

        {selected === "build" && (
          <p className="text-foreground leading-relaxed transition-opacity duration-300 p-2">
            Launch your new business or product line with Spark & Co's fully
            managed software delivery system.
          </p>
        )}
      </div>

      {/* Scale Card */}
      <div
        className={cardClasses("scale")}
        onClick={() => selected !== "scale" && setSelected("scale")}
        style={{ transformOrigin: "center" }}
      >
        <div className="w-full justify-between flex flex-row ">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/ScaleIcon.png"
              alt="Success"
              className=" w-8 h-8 object-contain"
            />
            <h2 className="text-xl font-bold text-foreground ">Scale</h2>
          </div>

          {selected === "scale" && (
            <img
              onClick={() => setMode("form")}
              src="/GoIcon.png"
              alt="Success"
              className="w-8 h-8 object-contain cursor-pointer"
            />
          )}
        </div>

        {selected === "scale" && (
          <p className="text-foreground leading-relaxed transition-opacity duration-300">
            Launch your new business or product line with Spark & Co's fully
            managed software delivery system.
          </p>
        )}
      </div>
    </div>
  );
}
