"use client";

import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingIsland from "../components/LandingIsland";
import { AppProvider } from "../lib/AppProvider";
import { AnimatePresence, motion } from "framer-motion";
import IndexShell from "./IndexShell";

type Props = {
  user?: { email: string };
  location: string;
};

export default function LandingShell({ user, location }: Props) {
  const [mode, setMode] = React.useState<"index" | "form">("index");

  const variants = {
    hidden: { x: -200, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: 200, opacity: 0 },
  };

  return (
    <AppProvider initialUser={user}>
      <div className="bg-background ">
        <Header headerMode={mode} />
        <AnimatePresence mode="wait">
          {mode === "index" && (
            <motion.div
              key="landing"
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <LandingIsland setMode={setMode} />
            </motion.div>
          )}

          {mode === "form" && (
            <motion.div
              key="form"
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <IndexShell setMode={setMode} />
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </AppProvider>
  );
}
