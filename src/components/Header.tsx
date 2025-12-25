"use client";

import { useState } from "react";
import { useApp } from "../lib/AppProvider";

export default function Header() {
  const { user, login, logout } = useApp();

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "kabir@buildwithspark.co" && password === "admin") {
      login(email);
      setShowLogin(false);
      setError("");
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-card rounded-full px-6 py-3 flex items-center justify-between shadow-lg relative">
          <h1 className="text-2xl font-bold text-foreground font-title">
            spark/co
          </h1>

          {!user ? (
            <div className="relative">
              <button
                onClick={() => setShowLogin((v) => !v)}
                className="px-6 py-2 rounded-full bg-foreground text-card transition-colors font-medium hover:opacity-90 transition"
              >
                Login
              </button>

              {showLogin && (
                <div className="absolute right-0 mt-4 w-64 rounded-2xl border bg-card p-4 shadow-xl">
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent text-secondary"
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent text-secondary"
                    />

                    {error && <p className="text-xs text-red-500">{error}</p>}

                    <button
                      onClick={handleLogin}
                      className="w-full rounded-full bg-foreground py-2 text-background text-sm font-medium hover:opacity-90 transition"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-background text-foreground flex items-center justify-center font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={logout}
                className="text-sm text-foreground hover:text-secondary transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Spacer so content is not covered by fixed header */}
      <div className="h-28" />
    </>
  );
}
