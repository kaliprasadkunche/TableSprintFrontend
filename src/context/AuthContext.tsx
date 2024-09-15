import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextType {
  auth: { token: string | null } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{ token: string | null } | null>(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  const login = (token: string) => {
    setAuth({ token });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
