const multer = require('multer');
const path = require('path');

// 1. Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // IMPORTANT: Make sure this 'uploads' directory exists before running your server
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// 3. Export the middleware using CommonJS syntax
module.exports = upload;