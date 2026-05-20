"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getStoredUser, storeUser, clearStoredUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/types";

type AuthContextType = {
  user: AuthUser | null | undefined;
  isLoading: boolean;
  login: (nextUser: AuthUser, rememberUser: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
  }, []);

  const login = (nextUser: AuthUser, rememberUser: boolean) => {
    storeUser(nextUser, rememberUser);
    setUser(nextUser);
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: user === undefined,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
