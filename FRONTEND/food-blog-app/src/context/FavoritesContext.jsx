// src/context/FavoritesContext.jsx

import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.js';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  // Load favorites from database when user logs in
  const loadFavorites = useCallback(async () => {
    if (!token) {
      setFavoriteIds([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5050/api/users/favorites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Extract recipe IDs from the response
      const ids = response.data.map(recipe => recipe._id);
      setFavoriteIds(ids);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavoriteIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Load favorites when token changes (login/logout)
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Toggle favorite status in database
  const toggleFavorite = useCallback(async (recipeId) => {
    if (!token) {
      console.warn('User must be logged in to favorite recipes');
      return;
    }

    try {
      await axios.post(`http://localhost:5050/api/users/favorites/${recipeId}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Update local state
      setFavoriteIds(prevIds => {
        const isFavorite = prevIds.includes(recipeId);
        return isFavorite
          ? prevIds.filter(id => id !== recipeId)
          : [...prevIds, recipeId];
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [token]);

  const isFavorite = useCallback(
    (recipeId) => favoriteIds.includes(recipeId),
    [favoriteIds]
  );

  // OPTIMIZATION: Memoize the context value object to prevent unnecessary re-renders.
  const contextValue = useMemo(
    () => ({
      toggleFavorite,
      isFavorite,
      favoriteIds,
      isLoading,
      loadFavorites
    }),
    [toggleFavorite, isFavorite, favoriteIds, isLoading, loadFavorites]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
