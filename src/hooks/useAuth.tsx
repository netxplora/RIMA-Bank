import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, phone: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  userRoles: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    // Check for mock session first
    const mockSession = localStorage.getItem("rivers_mock_session");
    if (mockSession) {
      const parsed = JSON.parse(mockSession);
      setUser(parsed.user);
      setIsAdmin(parsed.isAdmin);
      setUserRoles(parsed.roles);
      setLoading(false);
      return; // Skip supabase check if mock session exists
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Defer role fetching
        if (session?.user) {
          setTimeout(() => {
            fetchUserRoles(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setUserRoles([]);
        }
      }
    );

    // Check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !localStorage.getItem("rivers_mock_session")) {
        setLoading(false); // Stop loading if no session found
      }
      if (session) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          fetchUserRoles(session.user.id);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRoles = async (userId: string) => {
    try {
      // Use direct fetch to avoid typed client AbortErrors with new project
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(`${SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${userId}&select=role`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${session?.access_token || SUPABASE_KEY}`,
        }
      });

      if (!response.ok) {
        console.error("Error fetching roles:", response.statusText);
        return;
      }

      const data = await response.json();
      const roles = data?.map((r: any) => r.role) || [];
      setUserRoles(roles);
      setIsAdmin(
        roles.includes("super_admin") ||
        roles.includes("compliance_officer") ||
        roles.includes("loan_officer") ||
        roles.includes("content_editor")
      );
    } catch (err) {
      console.error("Error in fetchUserRoles:", err);
    }
  };

  const signUp = async (email: string, password: string, phone: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          phone_number: phone,
        },
      },
    });

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    // MOCK LOGIN LOGIC
    if (email === "admin@riversmfb.com" && password === "password") {
      const mockUser = { id: 'mock-admin-id', email: 'admin@riversmfb.com', aud: 'authenticated', created_at: new Date().toISOString() } as User;
      const mockRoles = ['admin', 'super_admin'];
      setUser(mockUser);
      setIsAdmin(true);
      setUserRoles(mockRoles);
      localStorage.setItem("rivers_mock_session", JSON.stringify({ user: mockUser, isAdmin: true, roles: mockRoles }));
      return { error: null };
    }

    if (email === "user@riversmfb.com" && password === "password") {
      const mockUser = { id: 'mock-user-id', email: 'user@riversmfb.com', aud: 'authenticated', created_at: new Date().toISOString() } as User;
      const mockRoles = ['user'];
      setUser(mockUser);
      setIsAdmin(false);
      setUserRoles(mockRoles);
      localStorage.setItem("rivers_mock_session", JSON.stringify({ user: mockUser, isAdmin: false, roles: mockRoles }));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    localStorage.removeItem("rivers_mock_session");
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setUserRoles([]);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, isAdmin, userRoles }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
