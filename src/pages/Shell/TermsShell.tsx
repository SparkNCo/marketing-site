"use client";

import { useState } from "react";
import { AppProvider } from "../../lib/AppProvider";
import TermsIsland from "../Island/TermsIsland";
import Footer from "../../components/Footer";

type Props = {
  user?: {
    email: string;
  };
  location: string;
};

export default function TermsShell({ user, location }: Readonly<Props>) {
  return (
    <AppProvider>
      <div className="">
        <TermsIsland />
        <Footer />
      </div>
    </AppProvider>
  );
}
