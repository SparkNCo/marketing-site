"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppProvider";
import { supabase } from "../../pages/api/submissions/server";

type AuthPopoverProps = {
  mode: "light" | "dark";
};

export default function LoginPopover({ mode }: AuthPopoverProps) {
  const { login } = useApp();

  const [show, setShow] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const resetState = () => {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
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

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("data", data);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    console.log("user", user);

    if (user) {
      await fetch("/api/users/post-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
        }),
      });
    }

    setSuccess("Account created. You can now sign in.");
    setIsSignup(false);
    setPassword("");
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
            {success && <p className="text-xs text-green-500">{success}</p>}

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              disabled={loading}
              className={`w-full rounded-full py-2 text-sm font-medium hover:opacity-90 transition ${
                mode === "dark"
                  ? "bg-background text-card"
                  : "bg-card text-background"
              }`}
            >
              {loading
                ? isSignup
                  ? "Creating account…"
                  : "Signing in…"
                : isSignup
                  ? "Create account"
                  : "Sign in"}
            </button>

            {/* TOGGLE */}
            {/* <p className="text-xs text-center text-muted-foreground">
              {isSignup
                ? "Already have an account?"
                : "I don’t have an account"}{" "}
              <button
                onClick={() => {
                  setIsSignup((v) => !v);
                  setError("");
                  setSuccess("");
                }}
                className="underline font-medium hover:opacity-80"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p> */}
          </div>
        </div>
      )}
    </div>
  );
}
