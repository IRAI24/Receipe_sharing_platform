const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    // ... (title, ingredients, etc. remain the same)
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    coverImage: {
        type: String
    },
    // This part is correct
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This refers to your 'User' model
        required: true
    }
}, { timestamps: true });

// Explicitly set the collection name to 'recipes' to ensure it finds your old data.
module.exports = mongoose.model("Recipe", recipeSchema, "recipes");
