import React from 'react';
import { Link } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { useAuth } from '../hooks/useAuth.js';

const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/600x400/D98C6B/FFFFFF?text=Recipe&font=lato';
  return `http://localhost:5050/${path.replace(/\\/g, '/')}`;
};

export default function RecipeCard({ recipe, isLiked, onLikeToggle }) {
  const { user } = useAuth();
  const imageUrl = getImageUrl(recipe.coverImage);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to save favorites!');
      return;
    }
    
    onLikeToggle();
  };

  return (
    <div className='recipe-card'>
      <Link to={`/recipes/${recipe._id}`} className='recipe-card-link'>
        <div className='recipe-card-image'>
          <img
            src={imageUrl}
            alt={recipe.title || 'Recipe Image'}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/600x400/D98C6B/FFFFFF?text=Recipe&font=lato';
            }}
          />
        </div>
        
        <div className='recipe-card-content'>
          <h3 className='recipe-card-title'>{recipe.title || 'Untitled Recipe'}</h3>
          
          {/* Optional: Add description preview */}
          {recipe.instructions && (
            <p className='recipe-card-description'>
              {recipe.instructions.length > 100 
                ? `${recipe.instructions.substring(0, 100)}...` 
                : recipe.instructions
              }
            </p>
          )}
        </div>
      </Link>
      
      <div className='recipe-card-meta'>
        <div className='timer'>
          <BsStopwatchFill />
          <span>{recipe.time || 'N/A'}</span>
        </div>
        <button
          className={`like-button ${isLiked ? 'liked' : ''} ${!user ? 'disabled' : ''}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? 'Unlike this recipe' : 'Like this recipe'}
          title={!user ? 'Login to save favorites' : (isLiked ? 'Remove from favorites' : 'Add to favorites')}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}
