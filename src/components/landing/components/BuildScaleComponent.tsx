import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const textVariants = {
  initial: { opacity: 0, y: -16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function BuildScaleToggle({ setMode }) {
  const [selected, setSelected] = useState<"build" | "scale">("build");

  const cardClasses = (type: "build" | "scale") => {
    const isSelected = selected === type;
    return `
      bg-background rounded-lg shadow-md cursor-pointer overflow-hidden
      transition-[width,padding,transform] duration-700 ease-out
      ${isSelected ? "w-3/5 p-8 scale-100" : "w-max px-6 py-3 scale-95 hover:scale-100"}
    `;
  };

  const textVariants = {
    initial: { opacity: 0, y: -16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-start">
      {/* BUILD */}
      <div
        className={cardClasses("build")}
        onClick={() => setSelected("build")}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/BuildIcon.png" className="w-8 h-8" />
            <h2 className="text-xl font-bold text-foreground">Build</h2>
          </div>

          <AnimatePresence>
            {selected === "build" && (
              <motion.img
                key="build-go"
                src="/GoIcon.png"
                className="w-8 h-8 cursor-pointer"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMode("form")}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {selected === "build" && (
            <motion.p
              key="build-text"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-foreground leading-relaxed mt-4 "
            >
              Launch your new business or product line with Spark & Co's fully
              managed software delivery system.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* SCALE */}
      <div
        className={cardClasses("scale")}
        onClick={() => setSelected("scale")}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/ScaleIcon.png" className="w-8 h-8" />
            <h2 className="text-xl font-bold text-foreground">Scale</h2>
          </div>

          <AnimatePresence>
            {selected === "scale" && (
              <motion.img
                key="scale-go"
                src="/GoIcon.png"
                className="w-8 h-8 cursor-pointer"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMode("form")}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {selected === "scale" && (
            <motion.p
              key="scale-text"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-foreground leading-relaxed mt-4"
            >
              Launch your new business or product line with Spark & Co's fully
              managed software delivery system.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
