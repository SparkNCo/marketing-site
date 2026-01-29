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
  passcode?: string;
};
export default function ProposalShell({ user, mode, passcode }: Props) {
  return (
    <AppProvider initialUser={user}>
      <Header headerMode={"form"} />
      <ProposalIsland mode={mode} passcode={passcode} />
      
    </AppProvider>
  );
}
