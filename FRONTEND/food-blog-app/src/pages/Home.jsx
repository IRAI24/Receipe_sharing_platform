import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import foodRecipe from '../assets/foodRecipe.png';
import RecipeItems from '../components/RecipeItems';
import './Home.css';
import MyRecipePage from './MyRecipesPage';

export default function Home() {
  const recipes = useLoaderData();

  return (
    <>
      {/* =============================================
          HERO SECTION
          ============================================= */}
      <section className="home">
        <div className="left">
          <h1 className="hero-title">Food Blog</h1>
          <p className="hero-subtitle">
            Discover and share amazing recipes from around the world. A place for
            food lovers to connect and get inspired.
          </p>
          <Link to="/addRecipe" className="cta-button">
            Share Your Recipe
          </Link>
        </div>
        <div className="right">
          <img src={foodRecipe} alt="A delicious assortment of food" />
        </div>
      </section>

      {/* =============================================
          WAVE BACKGROUND
          ============================================= */}
      <div className="wave-bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#d4f6e8"
            fillOpacity="1"
            d="M0,32L30,48C60,64,120,96,180,90.7C240,85,300,43,360,58.7C420,75,480,149,540,154.7C600,160,660,96,720,80C780,64,840,96,900,122.7C960,149,1020,171,1080,165.3C1140,160,1200,128,1260,117.3C1320,107,1380,117,1410,122.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* =============================================
          RECIPES SECTION
          ============================================= */}
      <div className="recipes-section">
        <h2 className="recipes-title">Latest Recipes</h2>
        
        {/* Check if recipes exist before rendering them */}
        {recipes && recipes.length > 0 ? (
          <div className="recipe-grid">
            {/* This component renders the individual recipe cards */}
            <RecipeItems allRecipes={recipes} />
          </div>
        ) : (
          <p className="no-recipes-message">No recipes to display yet!</p>
        )}
      </div>
    </>
  );
}