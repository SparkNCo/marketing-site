"use client";

import FormIsland from "../components/FormIsland";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
};

export default function IndexShell({ user }: Props) {
  return (
    //<AppProvider initialUser={user}>
    <div className="">


      <FormIsland submissionId="" initialStep="initial" />
    </div>
    // </AppProvider>
  );
}
