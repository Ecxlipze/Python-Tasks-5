"use client";

import { createContext, useContext, useState } from "react";
type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  const login = (access: string) => {
    localStorage.setItem("access", access);
    setToken(access);
  };

  const logout = () => {
    localStorage.removeItem("access");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
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
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}