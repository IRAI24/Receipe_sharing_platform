require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const connectDb = require("./config/connectionDb");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");

// ===== Add your model imports here =====
// This ensures Mongoose knows about your schemas before the routes use them.
// Make sure the paths are correct for your project structure.
require('./models/user'); 
require('./models/recipe');
// =======================================

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json()); // Parses JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serves static files from the 'uploads' directory

// Connect to MongoDB
connectDb();

// API routes
app.use("/api/users", userRoutes); 
app.use("/api/recipes", recipeRoutes);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ App is listening on port ${PORT}`);
});
