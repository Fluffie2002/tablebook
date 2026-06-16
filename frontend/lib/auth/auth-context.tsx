'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { api } from '@/lib/api/client';
import { User } from '@/types/tablebook';

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      async login(email, password) {
        const session = await api.login(email, password);
        setUser(session.user);
        return session.user;
      },
      async register(name, email, password) {
        const session = await api.register(name, email, password);
        setUser(session.user);
        return session.user;
      },
      logout() {
        api.setAccessToken(null);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
