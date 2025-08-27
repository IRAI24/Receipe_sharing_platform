import React from 'react';
import { Link } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { useAuth } from '../hooks/useAuth.js';
import './RecipeCard.css';

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
      {/* Recipe Image */}
      <div className='recipe-card-image-container'>
        <Link to={`/recipes/${recipe._id}`}>
          <img
            className='recipe-card-image'
            src={imageUrl}
            alt={recipe.title || 'Recipe Image'}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/320x200/D98C6B/FFFFFF?text=Recipe';
            }}
          />
        </Link>
        
        {/* Favorite Button - positioned over image */}
        <button
          className={`favorite-btn ${isLiked ? 'favorited' : ''} ${!user ? 'disabled' : ''}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          title={!user ? 'Login to save favorites' : (isLiked ? 'Remove from favorites' : 'Add to favorites')}
        >
          <FaHeart />
        </button>
      </div>
      
      {/* Recipe Info */}
      <div className='recipe-card-info'>
        <Link to={`/recipes/${recipe._id}`} className='recipe-card-title-link'>
          <h3 className='recipe-card-title'>{recipe.title || 'Untitled Recipe'}</h3>
        </Link>
        
        <div className='recipe-card-time'>
          <BsStopwatchFill className='time-icon' />
          <span className='time-text'>{recipe.time || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}
