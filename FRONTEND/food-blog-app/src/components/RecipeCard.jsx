import React from 'react';
import { Link } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";

const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/600x400/D98C6B/FFFFFF?text=Recipe&font=lato';
  return `http://localhost:5050/${path.replace(/\\/g, '/')}`;
};

export default function RecipeCard({ recipe, isLiked, onLikeToggle }) {
  const imageUrl = getImageUrl(recipe.coverImage);

  const handleLikeClick = (e) => {
    e.preventDefault();
    onLikeToggle();
  };

  return (
    <Link to={`/recipe/${recipe._id}`} className='recipe-card'>
      <div className='recipe-card-image'>
        <img
          src={imageUrl}
          alt={recipe.title || 'Recipe Image'}
          loading="lazy"
        />
      </div>
      
      <div className='recipe-card-content'>
        <h3 className='recipe-card-title'>{recipe.title || 'Untitled Recipe'}</h3>
        
        <div className='recipe-card-meta'>
          <div className='timer'>
            <BsStopwatchFill />
            {/* "min" has been removed from the end of this line */}
            <span>{recipe.time || 'N/A'}</span>
          </div>
          <button
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Unlike this recipe' : 'Like this recipe'}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </Link>
  );
}