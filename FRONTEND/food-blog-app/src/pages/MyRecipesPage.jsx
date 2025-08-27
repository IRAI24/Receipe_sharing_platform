import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import RecipeItems from '../components/RecipeItems'; // Assuming this component can render a list of recipes

export default function MyRecipesPage() {
  const myRecipes = useLoaderData();

  return (
    <div className="my-recipes-container">
      <h1 className="page-title">My Recipes</h1>
      
      {myRecipes && myRecipes.length > 0 ? (
        <RecipeItems allRecipes={myRecipes} />
      ) : (
        <div className="no-recipes-found">
          <h2>No Recipes Yet</h2>
          <p>You haven't shared any recipes. Why not add one now?</p>
          {/* Corrected className to 'cta-button' for proper styling */}
         <Link to="/addRecipe" className="btn-primary">Create Recipe</Link>
        </div>
      )}
    </div>
  );
}