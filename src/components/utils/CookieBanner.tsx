"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../lib/AppProvider";

type WindowWithPosthog = typeof globalThis & {
  posthog?: {
    opt_in_capturing: () => void;
    opt_out_capturing: () => void;
    capture: (event: string) => void;
  };
};

const win = globalThis as WindowWithPosthog;

type CookieBannerProps = Readonly<{
  /** When set with `onCookieConsentChange`, consent is owned by the parent (e.g. ConsentChatbaseIsland). */
  cookieConsent?: string | null;
  onCookieConsentChange?: (value: string) => void;
}>;

export default function CookieBanner({
  cookieConsent: controlledConsent,
  onCookieConsentChange,
}: CookieBannerProps = {}) {
  const app = useContext(AppContext);
  const [localConsent, setLocalConsent] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const controlled = Boolean(onCookieConsentChange);

  useEffect(() => {
    if (controlled) return;
    if (typeof globalThis.localStorage === "undefined") return;
    setLocalConsent(globalThis.localStorage.getItem("cookie_consent"));
  }, [controlled]);

  const cookieConsent = controlled
    ? (controlledConsent ?? null)
    : (app?.cookieConsent ?? localConsent);

  useEffect(() => {
    if (cookieConsent) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cookieConsent]);

  const accept = () => {
    win.posthog?.opt_in_capturing();
    win.posthog?.capture("$pageview");

    if (onCookieConsentChange) {
      onCookieConsentChange("accepted");
    } else {
      globalThis.localStorage?.setItem("cookie_consent", "accepted");
      app?.setCookieConsent("accepted");
      setLocalConsent("accepted");
    }
    setVisible(false);
  };

  const reject = () => {
    win.posthog?.opt_out_capturing();

    if (onCookieConsentChange) {
      onCookieConsentChange("rejected");
    } else {
      globalThis.localStorage?.setItem("cookie_consent", "rejected");
      app?.setCookieConsent("rejected");
      setLocalConsent("rejected");
    }
    setVisible(false);
  };

  return (
    <div className={`cookie-banner ${visible ? "show" : ""}`}>
      <p>We use analytics cookies to improve your experience.</p>

      <div className="actions">
        <button type="button" className="reject" onClick={reject}>
          Reject
        </button>

        <button type="button" className="accept" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
