import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "employee" | "visitor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  employeeId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, User & { password: string }> = {
  "admin@bmr.com": { id: "1", name: "Dr. Sarah Mitchell", email: "admin@bmr.com", role: "admin", password: "admin123", department: "Administration", employeeId: "BMR-001" },
  "employee@bmr.com": { id: "2", name: "Dr. James Wilson", email: "employee@bmr.com", role: "employee", password: "emp123", department: "Clinical Trials", employeeId: "BMR-042" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("bmr_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userData } = mockUser;
      setUser(userData);
      localStorage.setItem("bmr_user", JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    const newUser: User = { id: Date.now().toString(), name, email, role: "employee", department: "Unassigned", employeeId: `BMR-${Math.floor(Math.random() * 900) + 100}` };
    setUser(newUser);
    localStorage.setItem("bmr_user", JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("bmr_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
