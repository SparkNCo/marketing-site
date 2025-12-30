import React, { useState } from "react";

export default function BuildScaleToggle() {
  const [selected, setSelected] = useState<"build" | "scale">("build");

  const cardClasses = (type: "build" | "scale") => {
    const isSelected = selected === type;
    return `
      bg-background p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300
      ${isSelected ? "w-1/2 p-8 scale-100" : "w-max px-6 py-3 scale-95 hover:scale-100"}
    `;
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-start">
      {/* Build Card */}
      <div
        className={cardClasses("build")}
        onClick={() => setSelected("build")}
        style={{ transformOrigin: "center" }}
      >
        <h2 className="text-xl font-bold text-foreground ">Build</h2>
        {selected === "build" && (
          <p className="text-foreground leading-relaxed transition-opacity duration-300">
            Launch your new business or product line with Spark & Co's fully
            managed software delivery system.
          </p>
        )}
      </div>

      {/* Scale Card */}
      <div
        className={cardClasses("scale")}
        onClick={() => setSelected("scale")}
        style={{ transformOrigin: "center" }}
      >
        <h2 className="text-xl font-bold text-foreground ">Scale</h2>
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
