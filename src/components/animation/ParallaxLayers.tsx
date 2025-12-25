"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayers() {
  const { scrollYProgress } = useScroll();
  const slow = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const medium = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -320]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: slow }}
        className="absolute -top-32 left-[-10%] h-72 w-72 rounded-full bg-primary/30 blur-3xl"
      />
      <motion.div
        style={{ y: medium }}
        className="absolute top-32 right-[-15%] h-96 w-96 rounded-full bg-[rgba(255,244,200,0.45)] blur-3xl"
      />
      <motion.div
        style={{ y: fast }}
        className="absolute bottom-[-25%] left-1/3 h-80 w-80 rounded-[40%] bg-[rgba(124,246,255,0.3)] blur-3xl"
      />
      <motion.div
        style={{ y: slow }}
        className="absolute bottom-20 right-20 h-28 w-28 rotate-12 rounded-3xl border border-foreground/20 bg-card/40"
      />
    </div>
  );
}
