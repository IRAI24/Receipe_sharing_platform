const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // ✨ ADDITION 1: Array to store favorite recipe IDs
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe' // Links each ID to a document in the 'Recipe' collection
    }]
}, { timestamps: true });


// This function automatically hashes the password before saving a user
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


// ✨ ADDITION 2: Method to compare entered password with the hashed password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);