import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

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
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (uid: string, email: string) => {
    // Defer DB calls so we never block the auth callback
    const [{ data: profile }, { data: roleRow }] = await Promise.all([
      supabase.from("profiles").select("name, department, employee_id, avatar_url").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid).maybeSingle(),
    ]);
    const role: UserRole = (roleRow?.role as UserRole) ?? "employee";
    setUser({
      id: uid,
      email,
      name: profile?.name ?? email.split("@")[0],
      role,
      department: profile?.department ?? undefined,
      employeeId: profile?.employee_id ?? undefined,
      avatar: profile?.avatar_url ?? undefined,
    });
  }, []);

  useEffect(() => {
    // 1. Set up listener FIRST
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        setTimeout(() => loadProfile(newSession.user.id, newSession.user.email!), 0);
      } else {
        setUser(null);
      }
    });

    // 2. THEN fetch existing session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) loadProfile(s.user.id, s.user.email!);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { name, role: "employee" },
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated: !!session, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
