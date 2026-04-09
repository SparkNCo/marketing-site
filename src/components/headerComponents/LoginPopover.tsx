"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppProvider";
import { Menu, X } from "lucide-react";

type AuthPopoverProps = {
  mode: "light" | "dark";
};

export default function LoginPopover({ mode }: Readonly<AuthPopoverProps>) {
  const { login } = useApp();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const errorMessage = await login(email, password);

    if (errorMessage) {
      setError(errorMessage);
      setLoading(false);
      return;
    }

    resetState();
    setShow(false);
    setLoading(false);
  };

  return (
    <div className="relative z-10">
      {/* Hamburger trigger */}
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className={`cursor-pointer transition hover:opacity-80 bg-transparent border-none p-0 ${
          mode === "dark" ? "text-background" : "text-foreground"
        }`}
      >
        <Menu size={28} strokeWidth={2} />
      </button>

      {show && (
        <>
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-background backdrop-blur-sm w-full border-none p-0"
            onClick={() => setShow(false)}
          />

          <div
            className={`
              fixed z-50
              top-24 left-0 right-0 mx-auto
              w-full max-w-md
              lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2
            `}
          >
            <div
              className={`
                w-full rounded-2xl p-6
                shadow-2xl border
                backdrop-blur-xl
                bg-background border-background
              `}
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Welcome back</h3>
                  <p className="text-xs opacity-70">Sign in to continue</p>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="opacity-50 hover:opacity-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    w-full rounded-xl px-4 py-2.5 text-sm
                    outline-none transition border
                    focus:ring-2 text-background
                    ${
                      mode === "dark"
                        ? "bg-background/60 border-white/10 focus:ring-white/20"
                        : "bg-card border-black/10 focus:ring-black/10"
                    }
                  `}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={`
                    w-full rounded-xl px-4 py-2.5 text-sm
                    outline-none transition border
                    focus:ring-2 text-background
                    ${
                      mode === "dark"
                        ? "bg-background/60 border-white/10 focus:ring-white/20"
                        : "bg-card border-black/10 focus:ring-black/10"
                    }
                  `}
                />

                {error && (
                  <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`
                    w-full rounded-xl py-2.5 text-sm font-medium
                    transition active:scale-[0.98]
                    ${
                      mode === "dark"
                        ? "bg-background text-card hover:bg-background/90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }
                  `}
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs opacity-60">Forgot your password?</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
