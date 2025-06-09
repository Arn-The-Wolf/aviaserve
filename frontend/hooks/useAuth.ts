import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, AuthResponse } from "@/lib/api/auth";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authApi.login({ email, password });
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        router.push("/dashboard");
        return response;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [router]
  );

  const register = useCallback(
    async (userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phoneNumber?: string;
      address?: string;
    }) => {
      try {
        const response = await authApi.register(userData);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        router.push("/dashboard");
        return response;
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }, [router]);

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  const hasRole = useCallback(
    (role: string) => {
      return user?.roles.includes(role) ?? false;
    },
    [user]
  );

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
  };
}
