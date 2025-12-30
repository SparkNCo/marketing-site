"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingIsland from "../components/LandingIsland";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
  location: string;
};

export default function LandingShell({ user, location }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="bg-backgropund  border-4 border-blue-500">
        <Header location={location} />
        <LandingIsland submissionId="" initialStep="initial" />
        <Footer />
      </div>
    </AppProvider>
  );
}
