"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  access: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [access, setAccess] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("access");
  });

  const login = (
    accessToken: string,
    refreshToken: string
  ) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);

    setAccess(accessToken);
  };

  const logout = () => {
    localStorage.clear();
    setAccess(null);
  };

  return (
    <AuthContext.Provider
      value={{
        access,
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
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
}
