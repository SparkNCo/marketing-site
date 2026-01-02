// src/components/Stairs.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface StairsProps {
  children?: ReactNode;
}

const Stairs: React.FC<StairsProps> = ({ children, location }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // trigger enter animation once
  }, []);

  const nmOfColumns = 10;

  const expand = {
    initial: { top: "100", height: "screen-h" },
    enter: (i: number) => ({
      bottom: 1200,
      height: 0,
      transition: { duration: 0.8, delay: 0.05 * i, ease: [0.1, 0, 1, 1] },
    }),
    exit: (i: number) => ({
      top: "-200%",
      transition: { duration: 0.5, delay: 0.05 * i },
    }),
  };

  const overlay = {
    initial: { opacity: 1 },
    enter: { opacity: 0 },
    exit: { opacity: 1 },
  };

  return (
    <div
      className={`${location === "/" ? "bg-secondary" : "bg-background"} overflow-hidden`}
    >
      {" "}
      {/* overflow-hidden */}
      <AnimatePresence>
        {mounted && (
          <>
            {/* Background overlay */}
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={overlay}
              className="absolute inset-0  "
            />

            {/* Columns */}
            <div className="absolute inset-0 flex">
              {Array(nmOfColumns)
                .fill(undefined)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={expand}
                    className="relative flex-1 bg-black z-50"
                    style={{ top: 0 }}
                  />
                ))}
            </div>
          </>
        )}
      </AnimatePresence>
      {/* Page content */}
      <div className="relative z-10 pointer-events-auto">{children}</div>
      {location === "/" && (
        <div className="absolute top-0 right-0 pointer-events-none ">
          <div className="relative w-32 h-32 bg-background">
            <div className="absolute top-0 -left-16 w-16 h-14 bg-orange-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stairs;
