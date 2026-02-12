import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function BuildScaleToggle({
  setMode,
  centerExpanded,
}: {
  setMode: (mode: "index" | "form") => void;
  centerExpanded?: boolean;
}) {
  const [selected, setSelected] = useState<"build" | "scale" | "none">("none");

  /* ───────── FIXED ORDER ───────── */
  const cardsOrder: ("build" | "scale")[] = ["build", "scale"];

  /* ───────── Click handler ───────── */
  const handleClick = (type: "build" | "scale") => {
    if (selected === type) {
      setMode("form");
    } else {
      setSelected(type);
    }
  };

  /* ───────── Animations ───────── */
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

  /* ───────── Card ───────── */
  const Card = ({
    type,
    icon,
    title,
  }: {
    type: "build" | "scale";
    icon: string;
    title: string;
  }) => {
    const isSelected = selected === type;
    const isSecond = type === "scale";

    return (
      <motion.div
        transition={spring}
        onClick={() => handleClick(type)}
        className={`
          rounded-md shadow-md cursor-pointer overflow-hidden
          transition-colors duration-300

          /* Base colors per position */
          ${
            isSecond
              ? "bg-foreground text-background"
              : "bg-background text-foreground"
          }

          ${
            isSelected
              ? "w-6/12 p-4"
              : "w-max px-6 py-3 opacity-90 hover:opacity-100"
          }

          ${centerExpanded ? "mx-auto" : ""}
        `}
        whileTap={{ scale: 0.97 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.img src={icon} className="w-8 h-8" transition={spring} />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                key={`${type}-go`}
                initial={{ opacity: 0, x: 12, rotate: -20 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 12, rotate: 20 }}
                transition={{ duration: 0.3 }}
                className={
                  type === "scale"
                    ? `
            border-2 border-background
            rounded-lg
            p-0.5
            flex items-center justify-center
          `
                    : `
            border-2 border-foreground
            rounded-lg
            p-0.5
            flex items-center justify-center
          `
                }
              >
                <ChevronRight className="w-6 h-6" strokeWidth={3} />
              </motion.div>
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
              className="leading-relaxed mt-2"
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
        />
      ))}
    </div>
  );
}
