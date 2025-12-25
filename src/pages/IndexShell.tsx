"use client";

import Footer from "../components/Footer";
import FormIsland from "../components/FormIsland";
import Header from "../components/Header";
import ParallaxLayers from "../components/animation/ParallaxLayers";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
};

export default function IndexShell({ user }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <ParallaxLayers />
        <Header />
        <main className="relative z-10">
          <FormIsland submissionId="" initialStep="initial" />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
