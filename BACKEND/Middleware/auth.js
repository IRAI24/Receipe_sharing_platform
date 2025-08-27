const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming your user model is here

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token format is incorrect' });
    }

    // Verify token and get the user ID from the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id; // Assuming the user ID is stored as '_id' in the token payload

    // Find the user in the database and attach the full user object to the request
    req.user = await User.findById(userId).select('-password'); // '-password' to exclude the hash
    
    // Check if the user was actually found
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;