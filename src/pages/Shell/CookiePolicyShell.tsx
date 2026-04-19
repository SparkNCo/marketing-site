"use client";

import { AppProvider } from "../../lib/AppProvider";
import CookiePolicyIsland from "../Island/CookiePolicyIsland";
import Footer from "../../components/Footer";

type Props = {
  user?: {
    email: string;
  };
  location: string;
};

export default function CookiePolicyShell({ user, location }: Props) {
  return (
    <AppProvider initialUser={user}>
      <div className="">
        <CookiePolicyIsland />
        <Footer />
      </div>
    </AppProvider>
  );
}
