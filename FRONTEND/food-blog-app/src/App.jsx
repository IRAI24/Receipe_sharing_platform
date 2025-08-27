// App.jsx

import { createBrowserRouter } from 'react-router-dom';
import { getMyRecipes, getFavoriteRecipes, getAllRecipes, getSingleRecipe, addRecipeAction } from './api.js';

// Import components
import RootLayout from './pages/RootLayout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ProtectedLayout from './pages/ProtectedLayout.jsx';
import Home from './pages/Home.jsx';
import AddFoodRecipe from './pages/AddFoodRecipe.jsx';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import FavouritesPage from './pages/FavouritesPage.jsx';
import Login from './pages/login.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';

// Note: All loader functions and actions are imported from api.js


// --- ROUTER CONFIGURATION (UPDATED) ---
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Public routes
      { 
        index: true, 
        element: <Home />, 
        loader: getAllRecipes 
      },
      { 
        path: "login", 
        element: <Login /> 
      },
      { 
        path: "recipes/:recipeId", 
        element: <RecipeDetail />, 
        loader: getSingleRecipe 
      },
      
      // Protected routes
      {
        element: <ProtectedLayout />,
        children: [
          { 
            path: "addRecipe", 
            element: <AddFoodRecipe />, 
            action: addRecipeAction
          },
          { 
            path: "myRecipe", 
            element: <MyRecipesPage />, 
            loader: getMyRecipes 
          },
          { 
            path: "favourites", 
            element: <FavouritesPage />, 
            loader: getFavoriteRecipes 
          },
        ]
      }
    ]
  },
]);
