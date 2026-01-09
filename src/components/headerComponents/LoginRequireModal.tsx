"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { supabase } from "../../pages/api/submissions/server";
import { useApp } from "../../lib/AppProvider";

export default function LoginRequiredModal() {
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user?.email) {
      login(data.user.email);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="rounded-xl bg-foreground text-center space-y-8 py-8 px-10 max-w-lg w-full shadow-2xl">
        {/* Icon */}
        <div className="mx-auto w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-16 h-16 text-primary" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-title">Login required</h2>

          <p className="text-2xl text-secondary">
            Please sign in to access this proposal.
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-3 text-lg bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-3 text-lg bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-full bg-primary text-background py-3 text-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
