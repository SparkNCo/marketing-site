import { useEffect, useState } from "react";
import { useApp } from "../../lib/AppProvider";

type WindowWithPosthog = typeof globalThis & {
  posthog?: {
    opt_in_capturing: () => void;
    opt_out_capturing: () => void;
    capture: (event: string) => void;
  };
};

const win = globalThis as WindowWithPosthog;

export default function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useApp();
  const [visible, setVisible] = useState(false);

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

    localStorage.setItem("cookie_consent", "accepted");
    setCookieConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    win.posthog?.opt_out_capturing();
    localStorage.setItem("cookie_consent", "rejected");
    setCookieConsent("rejected");
    setVisible(false);
  };

  return (
    <div className={`cookie-banner ${visible ? "show" : ""}`}>
      <p>We use analytics cookies to improve your experience.</p>

      <div className="actions">
        <button className="reject" onClick={reject}>
          Reject
        </button>

        <button className="accept" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
