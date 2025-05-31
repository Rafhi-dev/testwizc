// Import required modules
const multer = require("multer"); // Multer is used for handling file uploads
const path = require("path");     // Path is used for handling file and directory paths
const fs = require("fs");         // File system module for interacting with the file system

// Define the directory where uploaded files will be stored
const uploadDir = path.join(__dirname, "../../assets/upload");

// Check if the upload directory exists; if not, create it (including parent directories)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  // Set the filename for uploaded files to ensure uniqueness
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Generate a unique suffix using timestamp and random number
    cb(null, uniqueSuffix + "-" + file.originalname); // Combine unique suffix and original filename
  },
});

// Create the multer upload instance with the defined storage settings
const upload = multer({ storage: storage });

// Export the upload middleware for use in other parts of the application
module.exports = upload