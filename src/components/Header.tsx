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
    <header className="w-full px-6 py-8 flex items-center justify-between bg-secondary">
      <div className="font-title text-xl font-bold text-black">
        Spark & Co
      </div>

      <div className="relative">
        {!user ? (
          <>
            <button
              onClick={() => setShowLogin((v) => !v)}
              className="px-4 py-2 rounded-md bg-black text-white font-body"
            >
              Login
            </button>

            {showLogin && (
              <div className="absolute right-0 mt-3 w-64 rounded-lg border bg-white p-4 shadow-lg z-50">
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <button
                    onClick={handleLogin}
                    className="w-full rounded-md bg-black py-2 text-white text-sm"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={logout}
              className="text-sm underline text-black"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
