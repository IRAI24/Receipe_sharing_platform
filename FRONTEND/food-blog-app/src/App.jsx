// App.jsx

import { createBrowserRouter, redirect } from 'react-router-dom';
import axios from 'axios';
import { getMyRecipes, getFavoriteRecipes } from './api.js';

// Import components (these need to be imported or this file needs to be restructured)
// import RootLayout from './components/RootLayout.jsx';
// import ErrorPage from './components/ErrorPage.jsx';
// import ProtectedLayout from './components/ProtectedLayout.jsx';
// import AddFoodRecipe from './components/AddFoodRecipe.jsx';
// import MyRecipesPage from './components/MyRecipesPage.jsx';
// import FavouritesPage from './components/FavouritesPage.jsx';

// --- HELPER to get auth token ---
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// --- ACTION FUNCTION (NEW) ---
// This function will handle the form submission from your 'AddFoodRecipe' page
export async function addRecipeAction({ request }) {
  const token = getAuthToken();
  const formData = await request.formData();
  
  // Make sure the names here match the `name` attributes in your form inputs
  const recipeData = {
    title: formData.get('title'),
    instructions: formData.get('instructions'),
    cookingTime: formData.get('cookingTime'),
    // ... any other fields
  };

  try {
    await axios.post('http://localhost:5050/api/recipes', recipeData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (err) {
    // Handle errors, maybe return an error message
    console.error("Failed to add recipe:", err);
    throw new Response(JSON.stringify({ message: 'Could not save recipe.' }), { status: 500 });
  }

  // After successful submission, redirect to the home page.
  // This will trigger the loader on that page to re-run.
  return redirect('/');
}


// --- LOADER FUNCTIONS ---
// ... (your existing loader functions)


// --- ROUTER CONFIGURATION (UPDATED) ---
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // ... other routes
      {
        element: <ProtectedLayout />,
        children: [
          { 
            path: "addRecipe", 
            element: <AddFoodRecipe />, 
            action: addRecipeAction // ✨ ATTACH THE ACTION HERE
          },
          { path: "myRecipe", element: <MyRecipesPage />, loader: getMyRecipes },
          { path: "favourites", element: <FavouritesPage />, loader: getFavoriteRecipes },
        ]
      }
    ]
  },
]);