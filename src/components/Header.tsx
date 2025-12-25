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
      <header className="fixed top-6 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
        <div className="rounded-full border border-foreground/10 bg-card/80 px-6 py-3 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background font-title text-lg">
                S
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-secondary">
                  Spark Co
                </p>
                <h1 className="text-xl font-title text-foreground">
                  playful digital studios
                </h1>
              </div>
            </div>

            {!user ? (
              <div className="relative">
                <button
                  onClick={() => setShowLogin((v) => !v)}
                  className="rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Client login
                </button>

                {showLogin && (
                  <div className="absolute right-0 mt-4 w-72 rounded-2xl border border-foreground/10 bg-card p-4 shadow-xl">
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-foreground/10 bg-transparent px-3 py-2 text-sm text-secondary"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-foreground/10 bg-transparent px-3 py-2 text-sm text-secondary"
                      />

                      {error && <p className="text-xs text-red-400">{error}</p>}

                      <button
                        onClick={handleLogin}
                        className="w-full rounded-full bg-primary py-2 text-sm font-semibold text-background hover:opacity-90"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={logout}
                  className="text-sm text-foreground/70 hover:text-secondary transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="h-32" />
    </>
  );
}
