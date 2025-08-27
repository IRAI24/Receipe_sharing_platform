const User = require("../models/user");
const Recipe = require("../models/recipe");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Handles new user registration, password hashing, and token generation.
 */
const userSignUp = async (req, res) => {
  // ... (Your existing userSignUp code is perfect)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = await User.create({
      email,
      password,
    });

    const token = jwt.sign({ email: newUser.email, _id: newUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({ token, user: { email: newUser.email, _id: newUser._id } });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({ message: "Server error during sign up" });
  }
};

/**
 * Handles user login by verifying credentials and generating a token.
 */
const userLogin = async (req, res) => {
  // ... (Your existing userLogin code is perfect)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user: { email: user.email, _id: user._id } });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

/**
 * Fetches a single user's public information by their ID.
 */
const getUser = async (req, res) => {
  // ... (Your existing getUser code is perfect)
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ email: user.email, _id: user._id });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return res.status(500).json({ message: "Server error fetching user" });
  }
};

/**
 * Adds or removes a recipe from the user's favorites list.
 */
const toggleFavorite = async (req, res) => {
  // ... (Your existing toggleFavorite code is perfect)
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const favoriteIndex = user.favorites.indexOf(recipeId);

    if (favoriteIndex > -1) {
      user.favorites.splice(favoriteIndex, 1);
    } else {
      user.favorites.push(recipeId);
    }

    await user.save();
    res.status(200).json({ message: 'Favorites updated', favorites: user.favorites });
  } catch (error) {
    console.error("TOGGLE FAVORITE ERROR:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Fetches all favorite recipes for the logged-in user.
 */
const getFavoriteRecipes = async (req, res) => {
  // ... (This function will now work correctly)
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("GET FAVORITES ERROR:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Verifies the JWT token and returns the user data for session restoration.
 * This is used when the app loads to check if the user is still authenticated.
 */
const verifyToken = async (req, res) => {
  try {
    // The authMiddleware has already verified the token and attached the user
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Return user data (password is already excluded by middleware)
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email
      },
      message: 'Token is valid'
    });
  } catch (error) {
    console.error("VERIFY TOKEN ERROR:", error);
    res.status(500).json({ message: 'Server error during token verification' });
  }
};

/**
 * Gets the current user's profile data.
 * This is used to get fresh user data when needed.
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        favorites: user.favorites
      }
    });
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);
    res.status(500).json({ message: 'Server error fetching user data' });
  }
};

module.exports = {
  userLogin,
  userSignUp,
  getUser,
  toggleFavorite,
  getFavoriteRecipes,
  verifyToken,
  getCurrentUser
};
