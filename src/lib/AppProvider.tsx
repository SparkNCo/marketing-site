"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../pages/api/submissions/server";
import { supabaseFunctionsUrl } from "./supabaseFunctionsUrl";

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
  leadEmail: string;
  setLeadEmail: React.Dispatch<React.SetStateAction<string>>;
  test: string;
  setTest: React.Dispatch<React.SetStateAction<string>>;
};

const API_HEADERS = {
  apikey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  Authorization: `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`,
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [test, setTest] = useState("Test312321321");

  const fetchDbUser = async (email: string) => {
    try {
      const res = await fetch(
        `${supabaseFunctionsUrl("/users")}?email=${encodeURIComponent(email)}`,
        { headers: API_HEADERS },
      );

      if (!res.ok) {
        setDbUser(null);
        return;
      }

      const data = await res.json();
      setDbUser(data.user);
    } catch (err) {
      console.error("Failed to fetch DB user:", err);
      setDbUser(null);
    }
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

  const contextValue = useMemo(
    () => ({ user, dbUser, login, logout, leadEmail, setLeadEmail, test, setTest }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, dbUser, leadEmail, test],
  );

  return (
    <AppContext.Provider value={contextValue}>
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
