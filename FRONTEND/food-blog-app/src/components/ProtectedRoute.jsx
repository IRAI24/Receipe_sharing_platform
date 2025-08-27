import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

   if (!user) {
    // If user is not logged in, redirect them to the login page
    // SOLUTION: Add the 'replace' prop to prevent redirect loops
    return <Navigate to="/login" replace />;
  }


  // If user is logged in, show the page
  return children;
};

export default ProtectedRoute;