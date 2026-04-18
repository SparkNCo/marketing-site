"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../lib/AppProvider";
import ChatbaseWidget from "./ChatbaseWidget";
import CookieBanner from "./CookieBanner";

/** Single `client:load` island: shared consent state for banner + Chatbase. */
export default function ConsentChatbaseIsland() {
  const app = useContext(AppContext);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    if (typeof globalThis.localStorage === "undefined") return;
    setConsent(globalThis.localStorage.getItem("cookie_consent"));
  }, []);

  const cookieConsent = app?.cookieConsent ?? consent;

  const updateConsent = (value: string) => {
    globalThis.localStorage?.setItem("cookie_consent", value);
    app?.setCookieConsent(value);
    setConsent(value);
  };

  return (
    <>
      <CookieBanner
        cookieConsent={cookieConsent}
        onCookieConsentChange={updateConsent}
      />
      <ChatbaseWidget cookieConsent={cookieConsent} />
    </>
  );
}
