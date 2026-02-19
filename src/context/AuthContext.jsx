import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // In real app, this would be API call
    // For now, using hardcoded admin credentials
    if (username === 'admin' && password === 'admin123') {
      const userData = {
        id: '1',
        username: 'admin',
        role: 'admin',
        fullName: 'Administrator',
        email: 'admin@webcat.uz'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Noto\'g\'ri login yoki parol' };
  };

  const register = (userData) => {
    // Simulate registration
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user'
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
