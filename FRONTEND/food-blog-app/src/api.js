import { redirect } from 'react-router-dom';
import axios from 'axios';

// --- HELPER to get auth token ---
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// --- ACTION FUNCTION ---
export async function addRecipeAction({ request }) {
  const token = getAuthToken();
  if (!token) {
    return redirect('/login');
  }
  
  const formData = await request.formData();

  const ingredients = formData.get('ingredients').split(',').map(item => item.trim());

  formData.delete('ingredients');
  ingredients.forEach(ingredient => {
    formData.append('ingredients[]', ingredient);
  });

  try {
    await axios.post('http://localhost:5050/api/recipes', formData, {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });

    return redirect('/myRecipe');

  } catch (err) {
    return { message: err.response?.data?.message || 'Failed to add recipe. Please try again.' };
  }
}

// --- LOADER FUNCTIONS ---
export const getAllRecipes = async () => {
  try {
    const res = await axios.get('http://localhost:5050/api/recipes');
    return res.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Response(JSON.stringify({ message: 'Could not fetch recipes.' }), { status: 500 });
  }
};

export const getSingleRecipe = async ({ params }) => {
  try {
    const res = await axios.get(`http://localhost:5050/api/recipes/${params.recipeId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw new Response(JSON.stringify({ message: 'Could not fetch the selected recipe.' }), { status: 500 });
  }
};

export const getMyRecipes = async () => {
  const token = getAuthToken();
  if (!token) return redirect('/login');

  try {
    // ✨ FIX: Changed the URL to the likely correct endpoint
    const res = await axios.get('http://localhost:5050/api/recipes/my-recipes', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw new Response(JSON.stringify({ message: 'Could not fetch your recipes.' }), { status: 500 });
  }
};

export const getFavoriteRecipes = async () => {
  const token = getAuthToken();
  if (!token) {
    return { favorites: [] };
  }

  try {
    const res = await axios.get('http://localhost:5050/api/users/favorites', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { favorites: res.data };
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    throw new Response(JSON.stringify({ message: 'Could not fetch your favorite recipes.' }), { status: 500 });
  }
};
