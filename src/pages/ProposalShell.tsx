"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/Header";
import ProposalIsland from "../components/proposals/Proposal";
import { AppProvider } from "../lib/AppProvider";
import { queryClient } from "../lib/tanStack";
import Footer from "../components/Footer";
import ToastLayout from "../components/layouts/ToastLayout";

type Props = {
  user?: {
    email: string;
  };
  mode: string;
  passcode?: string;
};
export default function ProposalShell({ user, mode, passcode }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider initialUser={user}>
        <ToastLayout>
          <Header headerMode={"form"} />
          <ProposalIsland mode={mode} passcode={passcode} />
          {/*  <Footer mode={"fixxed"} /> */}
        </ToastLayout>
      </AppProvider>
    </QueryClientProvider>
  );
}
