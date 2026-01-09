"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../pages/api/submissions/server";

type DbUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

type AppContextType = {
  user: User | null;
  dbUser: DbUser | null;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);

  /**
   * Fetch user from DB by email
   */
  const fetchDbUser = async (email: string) => {
    const res = await fetch(
      `/api/users/get-user?email=${encodeURIComponent(email)}`
    );

    if (!res.ok) {
      setDbUser(null);
      return;
    }

    const { user } = await res.json();
    setDbUser(user);
  };

  /**
   * Init + auth state listener
   */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser?.email) {
        fetchDbUser(sessionUser.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser?.email) {
        fetchDbUser(sessionUser.email);
      } else {
        setDbUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Login
   */
  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.user?.email) {
      await fetchDbUser(data.user.email);
    }

    return error?.message ?? null;
  };

  /**
   * Logout
   */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDbUser(null);
  };

  return (
    <AppContext.Provider value={{ user, dbUser, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook
 */
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
};
