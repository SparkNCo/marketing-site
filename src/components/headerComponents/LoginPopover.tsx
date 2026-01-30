"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppProvider";

type AuthPopoverProps = {
  mode: "light" | "dark";
};

export default function LoginPopover({ mode }: AuthPopoverProps) {
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
      <button
        onClick={() => setShow((v) => !v)}
        className={`px-6 py-2 rounded-full font-medium hover:opacity-90 transition ${
          mode === "dark"
            ? "text-card bg-background"
            : "text-background bg-foreground"
        }`}
      >
        Login
      </button>

      {show && (
        <div
          className={`absolute right-0 mt-4 w-72 rounded-2xl p-4 shadow-xl ${
            mode !== "dark"
              ? "bg-background text-background"
              : "bg-card text-background"
          }`}
        >
          <div className="space-y-3 mt-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg px-3 py-2 text-sm ${
                mode === "dark"
                  ? "bg-background text-foreground"
                  : "bg-card text-card"
              }`}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-lg px-3 py-2 text-sm ${
                mode === "dark"
                  ? "bg-background text-foreground"
                  : "bg-card text-card"
              }`}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full rounded-full py-2 text-sm font-medium hover:opacity-90 transition ${
                mode === "dark"
                  ? "bg-background text-card"
                  : "bg-card text-background"
              }`}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
