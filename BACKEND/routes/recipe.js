const express = require('express');
const router = express.Router();
const upload = require('../Middleware/upload');
const {
  getAllRecipes,
  getSingleRecipe,
  getMyRecipes,
  createRecipe,
} = require('../controller/recipe');

// Import the correct and consistent authentication middleware
const authMiddleware = require('../Middleware/auth');

// --- Public route ---
// This route is for everyone, so it doesn't need middleware
router.get('/', getAllRecipes);

// --- Protected Routes (require login) ---
// These routes use 'authMiddleware' to ensure the user is logged in
router.get('/my-recipes', authMiddleware, getMyRecipes);
router.post('/', authMiddleware, upload.single('coverImage'), createRecipe);

// --- Dynamic Public Route (must be last) ---
// This route matches any recipe by its ID
router.get('/:recipeId', getSingleRecipe);

module.exports = router;