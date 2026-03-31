import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const Card = ({
  type,
  icon,
  title,
  isSelected,
  onCardClick,
}: {
  type: "build" | "scale";
  icon: string;
  title: string;
  isSelected: boolean;
  onCardClick: () => void;
}) => (
  <motion.div
    layout
    transition={spring}
    onClick={onCardClick}
    animate={{ width: "100%" }}
    className={`
      w-full lg:w-auto
      rounded-md shadow-md cursor-pointer overflow-hidden
      transition-colors duration-300 p-6
      ${isSelected ? "bg-white text-black" : "bg-black text-white"}
      ${isSelected ? "" : "opacity-90 hover:opacity-100"}
    `}
    whileTap={{ scale: 0.97 }}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <motion.img
          src={icon}
          className={`w-8 h-8 ${
            (type === "build" && isSelected) || (type === "scale" && !isSelected)
              ? "invert"
              : ""
          }`}
          transition={spring}
        />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </div>

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

const cardsOrder: ("build" | "scale")[] = ["build", "scale"];

export default function BuildScaleToggle({
  centerExpanded,
  onClick,
}: Readonly<{
  centerExpanded?: boolean;
  onClick: (scale: "build" | "scale") => void;
}>) {
  const [selected, setSelected] = useState<"build" | "scale" | "none">("build");

  const handleClick = (type: "build" | "scale") => {
    if (selected !== type) {
      setSelected(type);
    }
    onClick(type);
  };

  return (
    <div
      className={`
        flex flex-col lg:flex-row
        gap-6
        items-stretch lg:items-start
        w-full
        ${centerExpanded ? "justify-center" : "justify-start"}
      `}
    >
      {cardsOrder.map((type) => (
        <div
          key={type}
          className="w-full lg:w-[480px] flex justify-center"
        >
          <Card
            type={type}
            icon={type === "build" ? "/BuildIcon.png" : "/ScaleIcon.png"}
            title={type === "build" ? "Build" : "Scale"}
            isSelected={selected === type}
            onCardClick={() => handleClick(type)}
          />
        </div>
      ))}
    </div>
  );
}
