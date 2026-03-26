"use client";

import React from "react";
import Header from "../components/Header";
import LandingIsland from "../components/LandingIsland";
import { AppProvider } from "../lib/AppProvider";
import { AnimatePresence, motion } from "framer-motion";
import IndexShell from "./IndexShell";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/tanStack";

type Props = {
  user?: { email: string };
  location: string;
};

type TransitionType = "slide" | "fade";

export default function LandingShell({ user, location }: Props) {
  const [mode, setMode] = React.useState<"index" | "form">("index");
  const [transitionType, setTransitionType] =
    React.useState<TransitionType>("slide");

  // 👉 functions passed DOWN
  const goToFormSlide = () => {
    setTransitionType("slide");
    setMode("form");
  };

  const goToFormFade = () => {
    setTransitionType("fade");
    setMode("form");
  };

  /*   const goBack = () => {
    setTransitionType("slide");
    setMode("index");
  }; */

  const variants = {
    hidden: (type: TransitionType) => {
      if (type === "fade") {
        return { opacity: 0 };
      }
      return { x: "-100%", opacity: 1 };
    },

    enter: {
      x: 0,
      opacity: 1,
    },

    exit: (type: TransitionType) => {
      if (type === "fade") {
        return { opacity: 0 }; // 👈 fade only
      }
      return { x: "-100%", opacity: 1 }; // 👈 slide
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider initialUser={user}>
        <div className="bg-[#111111]">
          <Header headerMode={mode} />

          <AnimatePresence mode="wait" custom={transitionType}>
            {mode === "index" && (
              <motion.div
                key="landing"
                variants={variants}
                custom={transitionType}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={
                  transitionType === "fade"
                    ? { duration: 0.25, ease: "easeOut" }
                    : { duration: 0.4, ease: "easeInOut" }
                }
              >
                <LandingIsland
                  mode={mode}
                  goToFormSlide={goToFormSlide}
                  goToFormFade={goToFormFade}
                />
              </motion.div>
            )}

            {mode === "form" && (
              <motion.div
                key="form"
                variants={variants}
                custom={transitionType}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={
                  transitionType === "fade"
                    ? { duration: 0.25, ease: "easeOut" }
                    : { duration: 0.4, ease: "easeInOut" }
                }
              >
                <IndexShell />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}
