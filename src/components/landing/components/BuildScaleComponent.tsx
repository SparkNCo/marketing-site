// import { useState } from "react";
// import { ChevronRight } from "lucide-react";

// export default function BuildScaleToggle({
//   setMode,
//   centerExpanded,
// }: {
//   setMode: (mode: "index" | "form") => void;
//   centerExpanded?: boolean;
// }) {
//   const [selected, setSelected] = useState<"build" | "scale">("build");

//   const cardsOrder: ("build" | "scale")[] = ["build", "scale"];

//   const handleClick = (type: "build" | "scale") => {
//     if (selected === type) {
//       setMode("form");
//     } else {
//       setSelected(type);
//     }
//   };

//   const Card = ({
//     type,
//     icon,
//     title,
//   }: {
//     type: "build" | "scale";
//     icon: string;
//     title: string;
//   }) => {
//     const isSelected = selected === type;
//     const isSecond = type === "scale";

//     return (
//       <div
//         onClick={() => handleClick(type)}
//         className={`
//           rounded-md shadow-md cursor-pointer overflow-hidden
//           p-6
//           transition-all duration-1500 ease-out
//           active:scale-95
// flex-shrink-0
// ${isSelected ? "basis-[360px]" : "basis-[260px]"}
//           ${
//             isSecond
//               ? "bg-foreground text-background"
//               : "bg-background text-foreground"
//           }

//           ${!isSelected ? "opacity-90 hover:opacity-100" : ""}
//         `}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <img src={icon} className="w-8 h-8 transition-all duration-300" />
//             <h2 className="text-xl font-bold">{title}</h2>
//           </div>

//           {/* Chevron */}
//           <div
//             className={`
//               transition-all duration-300
//               ${
//                 isSelected
//                   ? "opacity-100 translate-x-0 rotate-0"
//                   : "opacity-0 translate-x-3 rotate-12"
//               }
//             `}
//           >
//             <div
//               className={`
//                 border-2 rounded-lg p-0.5 flex items-center justify-center
//                 ${type === "scale" ? "border-background" : "border-foreground"}
//               `}
//             >
//               <ChevronRight className="w-6 h-6" strokeWidth={3} />
//             </div>
//           </div>
//         </div>

//         {/* Text */}
//         <div
//           className={`
//             overflow-hidden transition-all duration-500 ease-out
//             ${
//               isSelected
//                 ? "max-h-40 opacity-100 mt-2 translate-y-0"
//                 : "max-h-0 opacity-0 -translate-y-2"
//             }
//           `}
//         >
//           <p className="leading-relaxed">
//             Launch your new business or product line with Spark & Co's fully
//             managed software delivery system.
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`flex flex-row gap-6 items-start ${
//         centerExpanded ? "justify-center" : "justify-start"
//       }`}
//     >
//       {cardsOrder.map((type) => (
//         <div key={type} className="w-[480px] flex justify-center">
//           <Card
//             type={type}
//             icon={type === "build" ? "/BuildIcon.png" : "/ScaleIcon.png"}
//             title={type === "build" ? "Build" : "Scale"}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function BuildScaleToggle({
  setMode,
  centerExpanded,
}: {
  setMode: (mode: "index" | "form") => void;
  centerExpanded?: boolean;
}) {
  const [selected, setSelected] = useState<"build" | "scale" | "none">("build");

  const cardsOrder: ("build" | "scale")[] = ["build", "scale"];

  const handleClick = (type: "build" | "scale") => {
    if (selected === type) {
      setMode("form");
    } else {
      setSelected(type);
    }
  };

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
  }: {
    type: "build" | "scale";
    icon: string;
    title: string;
  }) => {
    const isSelected = selected === type;
    const isSecond = type === "scale";

    return (
      <motion.div
        layout
        transition={spring}
        onClick={() => handleClick(type)}
        animate={{
          width: isSelected ? "100%" : "100%",
        }}
        className={`
        w-full lg:w-auto
        rounded-md shadow-md cursor-pointer overflow-hidden
        transition-colors duration-300 p-6

        ${
          isSecond
            ? "bg-foreground text-background"
            : "bg-background text-foreground"
        }

        ${!isSelected ? "opacity-90 hover:opacity-100" : ""}
      `}
        whileTap={{ scale: 0.97 }}
      >
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
          className="
          w-full
          lg:w-[480px]
          flex justify-center
        "
        >
          <Card
            type={type}
            icon={type === "build" ? "/BuildIcon.png" : "/ScaleIcon.png"}
            title={type === "build" ? "Build" : "Scale"}
          />
        </div>
      ))}
    </div>
  );
}