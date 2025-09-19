"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
    id: string;
    name: string;
    email: string;
    userType: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await fetch('/api/user');
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            Cookies.remove('token');
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
          Cookies.remove('token');
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (token: string) => {
    Cookies.set('token', token, { secure: process.env.NODE_ENV !== 'development', path: '/' });
    try {
        const res = await fetch('/api/user');
        if (res.ok) {
            const userData = await res.json();
            setUser(userData);
        } else {
            Cookies.remove('token');
        }
    } catch (error) {
        console.error("Failed to fetch user", error);
        Cookies.remove('token');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
