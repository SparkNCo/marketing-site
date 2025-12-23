// src/components/Stairs.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface StairsProps {
  children?: ReactNode;
}

const Stairs: React.FC<StairsProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // trigger enter animation once
  }, []);

  const nmOfColumns = 10;

  const expand = {
    initial: { top: "100" }, // start from bottom
    enter: (i: number) => ({
      top: 2000,
      transition: { duration: 0.5, delay: 0.05 * i },
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
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-secondary">
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
    </div>
  );
};

export default Stairs;
