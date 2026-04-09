import { useEffect } from "react";

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

export default function ChatbaseWidget() {
  useEffect(() => {
    if (
      typeof globalThis.window === "undefined" ||
      typeof document === "undefined"
    ) {
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
  }, []);

  return null;
}
