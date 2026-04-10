"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../pages/api/submissions/server";
import { Button } from "../ui/button";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      globalThis.location.href = "/";
    }, 3000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-lg bg-card border border-border p-8 shadow-xl space-y-6">
        <img
          src="/icon2.svg"
          alt="spark/co"
          className="w-20 h-20 object-contain mx-auto"
        />

        {ready && !success && (
          <>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-background">
                Set new password
              </h2>
              <p className="text-sm text-muted-background">
                Choose a new password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="new-password" className="text-sm font-medium text-background">
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirm-password" className="text-sm font-medium text-background">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update password"}
              </Button>
            </form>
          </>
        )}

        {!ready && !success && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-background">
              Verifying link...
            </h2>
            <p className="text-sm text-muted-background">
              Please wait while we verify your reset link.
            </p>
          </div>
        )}

        {success && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-background">
              Password updated!
            </h2>
            <p className="text-sm text-muted-background">
              Redirecting you to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
