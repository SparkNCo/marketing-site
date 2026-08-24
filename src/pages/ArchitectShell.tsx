"use client";

import React, { type ComponentProps } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterSqareSection from "../components/landing/FooterSqareSection";
import SquaresGridLayout from "../components/layouts/GridLayout";
import { FooterLeftRightSquares } from "../components/SquareConfig";
import { useResponsiveCellSize } from "../components/utils/useResponsiveCellSize";
import { AppProvider } from "../lib/AppProvider";
import { ArchitectHero } from "../components/architect/ArchitectHero";

export default function ArchitectShell() {
  const cellSize = useResponsiveCellSize();

  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header headerMode="index" />

        <main className="pb-24 pt-40 md:pt-48">
          <ArchitectHero />
        </main>

        <SquaresGridLayout
          squares={
            FooterLeftRightSquares as NonNullable<
              ComponentProps<typeof SquaresGridLayout>["squares"]
            >
          }
          background="#111111"
          width="100%"
          cellSize={cellSize}
          className="h-[350px] md:h-[350px] lg:h-auto"
          indexLayout={0}
          indexComponent={1}
        >
          <FooterSqareSection />
        </SquaresGridLayout>

        <Footer mode="index" />
      </div>
    </AppProvider>
  );
}
