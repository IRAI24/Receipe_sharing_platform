import React, { createContext, useState, useMemo, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to verify token and restore user session
  const verifyAndRestoreSession = async (tokenToVerify) => {
    if (!tokenToVerify) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5050/api/users/verify-token', {
        headers: { 'Authorization': `Bearer ${tokenToVerify}` }
      });

      if (response.data.user) {
        setUser(response.data.user);
        setToken(tokenToVerify);
        setIsAuthenticated(true);
        console.log('✅ Session restored successfully');
      }
    } catch (error) {
      console.warn('❌ Token verification failed:', error.response?.data?.message || error.message);
      // Token is invalid/expired, clear it
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for existing session on app load
  useEffect(() => {
    verifyAndRestoreSession(token);
  }, []); // Only run once on mount

  // Handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    console.log('👋 User logged out');
  };
  
  // Handle login
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', userToken);
    console.log('✅ User logged in:', userData.email);
  };

  // Provide loading state and authentication status
  const value = useMemo(
    () => ({ 
      user, 
      token, 
      isLoading, 
      isAuthenticated, 
      login, 
      logout,
      verifyAndRestoreSession
    }),
    [user, token, isLoading, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

