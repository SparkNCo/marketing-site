"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingIsland from "../components/LandingIsland";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
};

export default function LandingShell({ user }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="">
        <Header />
        <LandingIsland submissionId="" initialStep="initial" />
        <Footer />
      </div>
    </AppProvider>
  );
}
