"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppProvider";
import { Menu, X } from "lucide-react";
import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";

type AuthPopoverProps = {
  mode: "light" | "dark";
};

type View = "login" | "forgot" | "sent";

export default function LoginPopover({ mode }: Readonly<AuthPopoverProps>) {
  const { login } = useApp();

  const [show, setShow] = useState(false);
  const [view, setView] = useState<View>("login");

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // forgot state
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const closePopover = () => {
    setShow(false);
    setView("login");
    setEmail("");
    setPassword("");
    setLoginError("");
    setResetEmail("");
    setResetError("");
  };

  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError("");

    const errorMessage = await login(email, password);

    if (errorMessage) {
      setLoginError(errorMessage);
      setLoginLoading(false);
      return;
    }

    closePopover();
    setLoginLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");

    try {
      const res = await fetch(supabaseFunctionsUrl("reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail,
          redirectTo: `${globalThis.location.origin}/reset-password`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setResetError(
          data?.message ?? "Could not send reset email. Try again.",
        );
        return;
      }

      setView("sent");
    } catch {
      setResetError("Could not send reset email. Try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-xl px-4 py-2.5 text-sm
    outline-none transition border
    focus:ring-2 text-background
    ${
      mode === "dark"
        ? "bg-background/60 border-white/10 focus:ring-white/20"
        : "bg-card border-black/10 focus:ring-black/10"
    }
  `;

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
            onClick={closePopover}
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
                  {view === "login" && (
                    <>
                      <h3 className="text-lg font-semibold">Welcome back</h3>
                      <p className="text-xs opacity-70">Sign in to continue</p>
                    </>
                  )}
                  {view === "forgot" && (
                    <>
                      <h3 className="text-lg font-semibold">
                        Reset your password
                      </h3>
                      <p className="text-xs opacity-70">
                        We'll send you a reset link
                      </p>
                    </>
                  )}
                  {view === "sent" && (
                    <>
                      <h3 className="text-lg font-semibold">
                        Check your inbox
                      </h3>
                      <p className="text-xs opacity-70">Reset link sent</p>
                    </>
                  )}
                </div>
                <button
                  onClick={closePopover}
                  className="opacity-50 hover:opacity-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Login view */}
              {view === "login" && (
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className={inputClass}
                  />

                  {loginError && (
                    <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2">
                      {loginError}
                    </p>
                  )}

                  <button
                    onClick={handleLogin}
                    disabled={loginLoading}
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
                    {loginLoading ? "Signing in…" : "Sign in"}
                  </button>

                  <div className="mt-1 text-center">
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-xs opacity-60 hover:opacity-100 transition bg-transparent border-none cursor-pointer"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot view */}
              {view === "forgot" && (
                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className={inputClass}
                  />

                  {resetError && (
                    <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2">
                      {resetError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full rounded-xl py-2.5 text-sm font-medium bg-primary text-background hover:bg-primary/90 transition active:scale-[0.98] disabled:opacity-50"
                  >
                    {resetLoading ? "Sending…" : "Send link"}
                  </button>

                  <div className="mt-1 text-center">
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="text-xs opacity-60 hover:opacity-100 transition bg-transparent border-none cursor-pointer"
                    >
                      Back to sign in
                    </button>
                  </div>
                </form>
              )}

              {/* Sent view */}
              {view === "sent" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    A reset link has been sent to{" "}
                    <span className="font-medium text-foreground">
                      {resetEmail}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={closePopover}
                    className="w-full rounded-xl py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition active:scale-[0.98]"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
