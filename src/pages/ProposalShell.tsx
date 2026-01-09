"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ProposalIsland from "../components/proposals/Proposal";
import { AppProvider } from "../lib/AppProvider";

type Props = {
  user?: {
    email: string;
  };
  mode: string;
  submissionId?: string;
};
export default function ProposalShell({ user, mode, submissionId }: Props) {
  return (
    <AppProvider initialUser={user}>
      <Header headerMode={"form"} />
      <ProposalIsland mode={mode} submissionId={submissionId} />
      <Footer mode={mode} />
    </AppProvider>
  );
}
