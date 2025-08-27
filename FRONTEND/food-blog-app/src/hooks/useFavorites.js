// src/hooks/useFavorites.js
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

export const useFavorites = () => useContext(FavoritesContext);
