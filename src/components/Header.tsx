"use client";

import { useEffect, useState } from "react";
import { useApp } from "../lib/AppProvider";

export default function Header({
  headerMode,
}: {
  headerMode?: "index" | "form";
}) {
  const { user, login, logout } = useApp();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("setting", headerMode);
    if (headerMode === "form") {
      setMode("dark");
    }
  }, [headerMode]);

  useEffect(() => {
    if (headerMode === "form") return;

    const sections = document.querySelectorAll<HTMLElement>("[data-header]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const headerMode = entry.target.dataset.header as "light" | "dark";
            setMode(headerMode);
          }
        });
      },
      {
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [headerMode]);

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
    <div className={mode === "dark" ? "bg-card" : "bg-foreground"}>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 ">
        <div
          className={`
            relative overflow-hidden rounded-full px-6 py-2
            flex items-center justify-between
            shadow-lg backdrop-blur-md transition-colors duration-300 
            ${
              mode === "dark"
                ? "bg-card text-foreground"
                : "bg-background text-card"
            }
          `}
        >
          {/* Logo */}
          <div className="w-12 h-12 flex items-center justify-center z-10">
            <img
              src={mode === "dark" ? "/nbarIcon2.png" : "/nbarIcon.png"}
              alt="spark/co"
              className="w-full h-full object-contain "
            />
          </div>

          {/* Title */}
          <h1
            className={`text-3xl font-bold z-10 ${mode === "dark" ? "text-background" : "text-card"}`}
          >
            spark/co
          </h1>

          {/* Auth */}
          {!user ? (
            <div className="relative z-10">
              <button
                onClick={() => setShowLogin((v) => !v)}
                className={`px-6 py-2 rounded-full  text-background font-medium hover:opacity-90 transition ${mode === "dark" ? "text-card bg-background" : "text-background bg-foreground"} `}
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
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent"
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent"
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
            <div className="flex items-center gap-3 z-10">
              <div className="h-9 w-9 rounded-full bg-background text-foreground flex items-center justify-center font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={logout}
                className="text-sm hover:opacity-70 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div
        className={`h-28 ${mode === "dark" ? "bg-background" : "bg-foreground"}`}
      />
    </div>
  );
}
