"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: "buyer" | "farmer" | "admin" | "BUYER" | "FARMER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isBuyer: boolean;
  isFarmer: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("cropsmarket_token");
      const storedUser = localStorage.getItem("cropsmarket_user");
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("cropsmarket_token");
          localStorage.removeItem("cropsmarket_user");
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("cropsmarket_token", newToken);
      localStorage.setItem("cropsmarket_user", JSON.stringify(newUser));
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout();
      }
    } catch {
      // ignore API logout failure
    } finally {
      setToken(null);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("cropsmarket_token");
        localStorage.removeItem("cropsmarket_user");
      }
    }
  };

  const roleLower = user?.role?.toLowerCase();
  const isBuyer = roleLower === "buyer";
  const isFarmer = roleLower === "farmer";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isBuyer,
        isFarmer,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
