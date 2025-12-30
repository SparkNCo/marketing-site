"use client";

import FormIsland from "../components/FormIsland";
import Header from "../components/Header";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
  location: string;
};

export default function IndexShell({ user, location }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="">
        {/* <Header location={location} /> */}
        <FormIsland submissionId="" initialStep="initial" />
        {/* <Footer /> */}
      </div>
    </AppProvider>
  );
}
