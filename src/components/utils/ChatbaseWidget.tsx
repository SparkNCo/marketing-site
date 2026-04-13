import { useEffect, useState } from "react";

declare global {
  interface Window {
    embeddedChatbotConfig?: {
      chatbotId: string;
      domain: string;
    };
  }
}

const CHATBASE_SCRIPT_ID = "chatbase-embed-script";
const CHATBASE_CONFIG = {
  chatbotId: "v9HlHRDbHSCQDENZhrKWM",
  domain: "www.chatbase.co",
};

const MOBILE_BREAKPOINT = 768;

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function hasConsentDecision(): boolean {
  if (typeof localStorage === "undefined") return false;
  const consent = localStorage.getItem("cookie_consent");
  return consent === "accepted" || consent === "rejected";
}

export default function ChatbaseWidget() {
  const [shouldShowOnMobile, setShouldShowOnMobile] = useState(false);

  useEffect(() => {
    if (
      typeof globalThis.window === "undefined" ||
      typeof document === "undefined"
    ) {
      return;
    }

    const checkConsent = () => {
      if (isMobile()) {
        setShouldShowOnMobile(hasConsentDecision());
      } else {
        setShouldShowOnMobile(true);
      }
    };

    checkConsent();

    const handleConsentUpdate = () => {
      checkConsent();
    };

    const handleResize = () => {
      checkConsent();
    };

    window.addEventListener("cookie_consent_updated", handleConsentUpdate);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldShowOnMobile]);

  useEffect(() => {
    if (
      typeof globalThis.window === "undefined" ||
      typeof document === "undefined"
    ) {
      return;
    }

    if (!shouldShowOnMobile && isMobile()) {
      return;
    }

    if (document.getElementById(CHATBASE_SCRIPT_ID)) {
      return;
    }

    globalThis.window.embeddedChatbotConfig = {
      chatbotId: CHATBASE_CONFIG.chatbotId,
      domain: CHATBASE_CONFIG.domain,
    };
    
    const script = document.createElement("script"); // NOSONAR
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = CHATBASE_SCRIPT_ID;
    script.defer = true;
    script.setAttribute("chatbotId", CHATBASE_CONFIG.chatbotId);
    script.setAttribute("domain", CHATBASE_CONFIG.domain);

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(CHATBASE_SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [shouldShowOnMobile]);

  return null;
}
