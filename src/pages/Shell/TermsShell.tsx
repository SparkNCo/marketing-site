"use client";

import { useState } from "react";
import { AppProvider } from "../../lib/AppProvider";
import TermsIsland from "../Island/TermsIsland";

type Props = {
  user?: {
    email: string;
  };
  location: string;
};


export default function TermsShell({ user, location }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="">
        <TermsIsland  />
      </div>
    </AppProvider>
  );
}
