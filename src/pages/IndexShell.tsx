"use client";

import Footer from "../components/Footer";
import FormIsland from "../components/FormIsland";
import Header from "../components/Header";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
};

export default function IndexShell({ user }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="">
        <Header />
        <FormIsland submissionId="" initialStep="initial" />
        <Footer />
      </div>
    </AppProvider>
  );
}
