import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsStopwatchFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavorites } from '../hooks/useFavorites.js'; // Fixed import path
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

  // Process instructions and remove existing numbering if present
  const instructionSteps = recipe.instructions
    ? recipe.instructions.split('\n')
        .filter(step => step.trim() !== '')
        .map((step, index) => {
          // Debug: Log original step format (remove this after testing)
          if (index < 3) {
            console.log(`Original step ${index + 1}:`, JSON.stringify(step));
          }
          
          // More comprehensive regex to handle various numbering formats:
          // - "1. ", "2. ", "3. " etc.
          // - "1) ", "2) ", "3) " etc.
          // - "Step 1: ", "Step 2: " etc.
          // - "1 - ", "2 - " etc.
          // - "1.", "2." (with or without space)
          // - Leading/trailing whitespace
          let cleanStep = step
            .replace(/^\s*(?:step\s*)?\d+[.):)\-]?\s*/i, '') // Remove "Step 1:", "1.", "1)", "1 -", etc.
            .replace(/^\s*\d+\s*[.):)\-]\s*/i, '') // Catch any remaining "1. ", "2) ", etc.
            .replace(/^\s*[.):)\-]\s*/, '') // Remove any leftover punctuation
            .trim();
          
          // Debug: Log cleaned step (remove this after testing)
          if (index < 3) {
            console.log(`Cleaned step ${index + 1}:`, JSON.stringify(cleanStep));
          }
          
          // If the step becomes empty after cleaning, return the original (might be a different format)
          return cleanStep.length > 0 ? cleanStep : step.trim();
        })
        .filter(step => step.length > 0)
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

          <div className='recipe-sections'>
            <section className='ingredients'>
              <h2>Ingredients</h2>
              <div className='ingredients-count'>
                {recipe.ingredients ? recipe.ingredients.length : 0} ingredients
              </div>
              <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section className='instructions'>
              <h2>Instructions</h2>
              <div className='instructions-count'>
                {instructionSteps.length} steps
              </div>
              <ol>
                {instructionSteps.map((step, index) => (
                  <li key={index}>
                    <span className='step-number'>{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}