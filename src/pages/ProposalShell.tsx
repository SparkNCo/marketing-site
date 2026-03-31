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
          {/* Clear fixed header: top-6 + bar ≈ 5.5–6.5rem */}
          <main className="min-h-screen bg-background pt-24 sm:pt-[6.5rem]">
            <ProposalIsland mode={mode} passcode={passcode} />
          </main>
        </ToastLayout>
      </AppProvider>
    </QueryClientProvider>
  );
}
