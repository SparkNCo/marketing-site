/* import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StairsProps {
  children?: ReactNode;
}

const Stairs: React.FC<StairsProps> = ({ children }) => {
  const anim = (variants: any, custom: any) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
    custom,
  });

  const expand = {
    initial: { top: 0 },
    enter: (i: number) => ({
      top: "100%",
      transition: { duration: 0.4, delay: 0.05 * i },
      transitionEnd: { height: "100%", top: "100%" },
    }),
    exit: (i: number) => ({
      top: "0%",
      height: "100%",
      transition: { duration: 0.4, delay: 0.05 * i },
    }),
  };

  const overlay = {
    initial: { opacity: 0.3 },
    enter: { opacity: 0 },
    exit: { opacity: 0.3 },
  };

  const nmOfColumns = 5;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <motion.div {...anim(overlay, 5)} className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 flex">
        {Array(nmOfColumns)
          .fill(undefined)
          .map((_, i) => (
            <motion.div
              key={i}
              {...anim(expand, nmOfColumns - i)}
              className="relative flex-1 bg-black"
              style={{ top: 0 }}
            />
          ))}
      </div>

      <div className="relative z-10 pointer-events-auto">{children}</div>
    </div>
  );
};

export default Stairs;
A */