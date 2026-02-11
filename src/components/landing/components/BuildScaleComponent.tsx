import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BuildScaleToggle({
  setMode,
  centerExpanded,
}: {
  setMode: (mode: "index" | "form") => void;
}) {
  const [selected, setSelected] = useState<"build" | "scale" | "none">("none");

  const cardsOrder: ("build" | "scale")[] =
    !centerExpanded && selected !== "none"
      ? [selected, selected === "build" ? "scale" : "build"]
      : ["build", "scale"];

  /* ───────── Click handler ───────── */
  const handleClick = (type: "build" | "scale") => {
    if (selected === type) {
      setMode("form");
    } else {
      setSelected(type);
    }
  };

  /* ───────── Animation configs ───────── */
  const spring = {
    type: "spring",
    stiffness: 260,
    damping: 22,
  };

  const textVariants = {
    initial: { opacity: 0, y: -12, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      filter: "blur(4px)",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  /* ───────── Card renderer ───────── */
  const Card = ({
    type,
    icon,
    title,
    centerExpanded,
  }: {
    type: "build" | "scale";
    icon: string;
    title: string;
  }) => {
    const isSelected = selected === type;

    return (
      <motion.div
        layout
        transition={spring}
        onClick={() => handleClick(type)}
        className={`
          bg-background rounded-md  shadow-md cursor-pointer overflow-hidden
          transition-colors duration-300  
          ${
            isSelected
              ? "w-5/12 p-4"
              : "w-max px-6 py-3 opacity-90 hover:opacity-100"
          }
          ${centerExpanded ? "mx-auto" : ""}
        `}
        whileTap={{ scale: 0.97 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.img
              src={icon}
              className="w-8 h-8"
              layout
              transition={spring}
            />
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
          </div>

          <AnimatePresence>
            {isSelected && (
              <motion.img
                key={`${type}-go`}
                src="/GoIcon.png"
                className="w-8 h-8"
                initial={{ opacity: 0, x: 12, rotate: -20 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 12, rotate: 20 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Text */}
        <AnimatePresence mode="wait">
          {isSelected && (
            <motion.p
              key={`${type}-text`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-foreground leading-relaxed mt-2"
            >
              Launch your new business or product line with Spark & Co's fully
              managed software delivery system.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div
      className={`flex flex-row gap-6 items-start ${
        centerExpanded ? "justify-center" : "justify-start"
      }`}
    >
      {cardsOrder.map((type) => (
        <Card
          key={type}
          type={type}
          icon={type === "build" ? "/BuildIcon.png" : "/ScaleIcon.png"}
          title={type === "build" ? "Build" : "Scale"}
          centerExpanded={centerExpanded}
        />
      ))}
    </div>
  );
}
