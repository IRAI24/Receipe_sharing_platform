import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites.js';
import RecipeCard from './RecipeCard';

// 1. Accept `{ allRecipes }` as a prop here
export default function RecipeItems({ allRecipes }) {
  // 2. We've removed the `useLoaderData()` line

  const { isFavorite, toggleFavorite } = useFavorites();

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