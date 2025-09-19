"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: { id: string; userType: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; userType: string } | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<{ userId: string; userType: string }>(token);
        setUser({ id: decoded.userId, userType: decoded.userType });
      } catch (error) {
        console.error("Invalid token", error);
        Cookies.remove('token');
      }
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { secure: process.env.NODE_ENV !== 'development', path: '/' });
    try {
        const decoded = jwtDecode<{ userId: string; userType: string }>(token);
        setUser({ id: decoded.userId, userType: decoded.userType });
      } catch (error) {
        console.error("Invalid token", error);
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
