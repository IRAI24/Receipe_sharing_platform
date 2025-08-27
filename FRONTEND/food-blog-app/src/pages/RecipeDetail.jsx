import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsStopwatchFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavorites } from '../context/FavoritesContext'; // 1. Import the context hook
import './RecipeDetail.css';

const placeholderImage = 'https://placehold.co/600x300/D98C6B/FFFFFF?text=Recipe';

export default function RecipeDetail() {
  const recipe = useLoaderData();
  const { isFavorite, toggleFavorite } = useFavorites(); // 2. Use the global context

  if (!recipe) {
    return (
      <div className='recipe-not-found'>
        <h2>Recipe not found!</h2>
      </div>
    );
  }

  // 3. Check if the current recipe is a favorite using its ID
  // Make sure your recipe data from the loader includes `_id`
  const isCurrentlyFavorite = isFavorite(recipe._id);

  const imageUrl = recipe.coverImage
    ? `http://localhost:5050/${recipe.coverImage.replace(/\\/g, '/')}`
    : placeholderImage;

  const instructionSteps = recipe.instructions
    ? recipe.instructions.split('\n').filter(step => step.trim() !== '')
    : [];

  return (
    <main className='recipe-page'>
      <div className='recipe-card'>
        <div className='recipe-image-container'>
          <img
            src={imageUrl}
            alt={recipe.title}
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
          />
        </div>

        <div className='recipe-content'>
          <div className='recipe-header'>
            <h1 className='recipe-title'>{recipe.title}</h1>
            {/* 4. Update the button to use the context's toggle function */}
            <button className='favorite-btn' onClick={() => toggleFavorite(recipe._id)}>
              {isCurrentlyFavorite ? <BsHeartFill color="red" /> : <BsHeart />}
            </button>
          </div>

          <div className='recipe-meta'>
            <BsStopwatchFill />
            <span>{recipe.time}</span>
          </div>

          <section className='ingredients'>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className='instructions'>
            <h2>Instructions</h2>
            <ol>
              {instructionSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}