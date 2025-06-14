import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getUser();
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const result = await authService.login(usernameOrEmail, password);
      
      if (result.success) {
        const user = authService.getUser();
        setUser(user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        const user = authService.getUser();
        setUser(user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
