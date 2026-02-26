import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");

    if (consent) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    window.posthog?.opt_in_capturing();
    window.posthog?.capture("$pageview");

    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    window.posthog?.opt_out_capturing();
    localStorage.setItem("cookie_consent", "rejected");
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