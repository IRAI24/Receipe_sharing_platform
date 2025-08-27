const express = require("express");
const router = express.Router();

const {
  userLogin,
  userSignUp,
  getUser,
  toggleFavorite,
  getFavoriteRecipes,
  verifyToken,
  getCurrentUser
} = require("../controller/user");

const authMiddleware = require('../Middleware/auth');

// --- Authentication Routes ---
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/verify-token", authMiddleware, verifyToken);
router.get("/me", authMiddleware, getCurrentUser);

// --- User Data Route ---
router.get("/user/:id", getUser); // This one is okay, but for consistency you could remove '/user'

// --- ✨ CORRECTED FAVORITE ROUTES ✨ ---

// REMOVED '/user' from the path
router.get("/favorites", authMiddleware, getFavoriteRecipes);

// REMOVED '/user' from the path
router.post("/favorites/:recipeId", authMiddleware, toggleFavorite);

module.exports = router;