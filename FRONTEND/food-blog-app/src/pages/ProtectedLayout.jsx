import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js'; // Fixed import path

const ProtectedLayout = () => {
  const { token } = useAuth();

  if (!token) {
    // If there's no token, redirect the user to the login page.
    // The 'replace' prop prevents adding the login page to the history stack,
    // avoiding a bug where the user gets stuck in a redirect loop.
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the page they requested (e.g., AddRecipe).
  return <Outlet />;
};

export default ProtectedLayout;