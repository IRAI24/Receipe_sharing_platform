// controllers/recipeController.js

const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

// --- GET all recipes ---
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching recipes." });
  }
};

// --- GET a single recipe by its ID ---
const getSingleRecipe = async (req, res) => {
  const { recipeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(404).json({ message: 'Invalid recipe ID.' });
  }
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// --- GET all recipes created by the logged-in user ---
const getMyRecipes = async (req, res) => {
  const userId = req.user._id;
  try {
    // FIX #1: The query field MUST match your schema.
    const myRecipes = await Recipe.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(myRecipes);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching your recipes." });
  }
};

// --- CREATE a new recipe ---
const createRecipe = async (req, res) => {
  const { title, time, ingredients, instructions } = req.body;
  const userId = req.user._id;

  if (!title || !time || !ingredients || !instructions || !req.file) {
    return res.status(400).json({ message: 'Please fill in all fields and upload an image.' });
  }

  try {
    const newRecipe = await Recipe.create({
      title,
      time,
      ingredients,
      instructions,
      coverImage: req.file.path,
      // FIX #2: The field name here MUST match your schema.
      user: userId 
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Backend error creating recipe:", error);
    res.status(500).json({ message: 'Failed to create recipe.' });
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  getMyRecipes,
  createRecipe
};