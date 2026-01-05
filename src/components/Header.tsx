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
    if (headerMode === "form") {
      setMode("dark");
      return;
    }

    // Update header color based on scroll position
    // Light mode for top of page (first ~600px), dark mode after that
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setMode(scrollY > 128 ? "dark" : "light");
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div
        className={`
            relative overflow-visible rounded-full px-6 py-2
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
            onClick={() => (window.location.href = "/")}
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
              <div
                className={`absolute right-0 mt-4 w-64 rounded-2xl p-4 shadow-xl ${mode !== "dark" ? "bg-background text-background" : "bg-card text-background"}`}
              >
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-lg  px-3 py-2 text-sm bg-transparent ${mode === "dark" ? "bg-background text-background" : "bg-card text-card"} `}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-lg  px-3 py-2 text-sm bg-transparent ${mode === "dark" ? "bg-background text-background" : "bg-card text-card"} `}
                  />

                  {error && <p className="text-xs text-red-500">{error}</p>}

                  <button
                    onClick={handleLogin}
                    className={`w-full rounded-full py-2  text-sm font-medium hover:opacity-90 transition  ${mode === "dark" ? "bg-background text-card" : "bg-card text-background"} `}
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
  );
}
