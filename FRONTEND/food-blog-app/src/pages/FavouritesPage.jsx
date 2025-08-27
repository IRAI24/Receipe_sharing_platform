import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import RecipeItems from '../components/RecipeItems'; // We reuse the same component for displaying recipes
import './FavouritesPages.css'; // <-- ADD THIS LINE

export default function FavouritesPage() {
  const data = useLoaderData();
  const favoriteRecipes = data?.favorites || [];

  return (
    <div className="my-recipes-container"> {/* We can reuse this styling */}
      <h1 className="page-title">My Favourite Recipes</h1>
      
      {favoriteRecipes && favoriteRecipes.length > 0 ? (
        <RecipeItems allRecipes={favoriteRecipes} />
      ) : (
        <div className="no-recipes-found">
          <h2>No Favourites Yet</h2>
          <p>You haven't saved any recipes. Explore and find some you love!</p>
          {/* Corrected className to 'cta-button' for proper styling */}
          <Link to="/" className="btn-primary">Find Recipes</Link>
        </div>
      )}
    </div>
  );
}
