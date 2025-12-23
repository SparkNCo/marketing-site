"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type UserData = {
  email: string;
};

type AppContextType = {
  user: UserData | null;
  login: (email: string) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
  initialUser?: UserData | null;
};

export function AppProvider({ children, initialUser = null }: AppProviderProps) {
  const [user, setUser] = useState<UserData | null>(initialUser);

  const login = (email: string) => {
    setUser({ email });

    // opcional: persistir client-side
    // localStorage.setItem("user", JSON.stringify({ email }));
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
