import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Check if user is logged in (from localStorage or API)
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('vocabmaster_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    try {
      // For demo purposes, accept any email/password
      const mockUser = {
        id: 1,
        email,
        name: 'Daniel Nguyen',
        avatar: 'D',
        membershipType: 'Premium'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('vocabmaster_user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    // Simulate API call
    try {
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        avatar: userData.firstName.charAt(0).toUpperCase(),
        membershipType: 'Free'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('vocabmaster_user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vocabmaster_user');
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
