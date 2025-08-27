// src/context/FavoritesContext.jsx

import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    // BUG FIX: Wrap in a try-catch block to prevent crashes from invalid data.
    try {
      const savedFavorites = localStorage.getItem('favoriteRecipes');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return []; // Return an empty array as a fallback.
    }
  });

  // OPTIMIZATION: Wrap functions in `useCallback` so they are not recreated on every render.
  const toggleFavorite = useCallback((recipeId) => {
    setFavoriteIds(prevIds => {
      const isFavorite = prevIds.includes(recipeId);
      const newIds = isFavorite
        ? prevIds.filter(id => id !== recipeId)
        : [...prevIds, recipeId];

      localStorage.setItem('favoriteRecipes', JSON.stringify(newIds));
      return newIds;
    });
  }, []); // Empty dependency array means the function is created only once.

  const isFavorite = useCallback(
    (recipeId) => favoriteIds.includes(recipeId),
    [favoriteIds] // Recreate this function only when `favoriteIds` changes.
  );

  // OPTIMIZATION: Memoize the context value object to prevent unnecessary re-renders.
  const contextValue = useMemo(
    () => ({
      toggleFavorite,
      isFavorite,
    }),
    [toggleFavorite, isFavorite] // Recreate the object only when the functions change.
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};