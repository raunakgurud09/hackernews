"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";

export interface User {
  about: string;
  created: number;
  id: string;
  karma: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (username: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/user/${username}.json`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData: User = await response.json();

      if (userData && userData.id) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/top?page=1");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
