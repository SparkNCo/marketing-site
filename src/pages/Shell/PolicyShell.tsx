"use client";

import { AppProvider } from "../../lib/AppProvider";
import PolicyIsland from "../Island/PolicyIsland";
type Props = {
  user?: {
    email: string;
  };
  location: string;
};

export default function PolicyShell({ user, location }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="">
        <PolicyIsland />
      </div>
    </AppProvider>
  );
}
