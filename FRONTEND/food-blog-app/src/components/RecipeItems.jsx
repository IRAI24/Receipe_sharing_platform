import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites.js';
import RecipeCard from './RecipeCard';

// Accept `{ allRecipes }` as a prop
export default function RecipeItems({ allRecipes, isLoading = false }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Show loading state
  if (isLoading) {
    return (
      <div className='recipe-loading-state'>
        <div className='loading-spinner'></div>
        <p>Loading delicious recipes...</p>
      </div>
    );
  }

  if (!Array.isArray(allRecipes) || allRecipes.length === 0) {
    return (
      <div className='no-recipes-found' style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>No Recipes Found</h2>
        <p>Why not be the first to share one?</p>
        <Link to="/addRecipe" className='btn-primary'>Add Recipe</Link>
      </div>
    );
  }

  return (
    <div className='recipe-list'>
      {allRecipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          isLiked={isFavorite(recipe._id)}
          onLikeToggle={() => toggleFavorite(recipe._id)}
        />
      ))}
    </div>
  );
}