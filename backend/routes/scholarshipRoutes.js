const express = require('express');
const multer = require('multer');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const { protect } = require('../middleware/authmiddleware');

// Multer file upload configuration for scholarships
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});
const upload = multer({ storage: storage });

// Route to create a new scholarship with image upload (protected route, requires authentication)
router.post('/scholarships', protect, upload.single('image'), scholarshipController.createScholarship);

// Route to get all scholarships (public route)
router.get('/scholarships', scholarshipController.getAllScholarships);

// Route to get a specific scholarship by ID (public route)
router.get('/scholarships/:id', scholarshipController.getScholarshipById);

// Route to update a scholarship by ID with image upload (protected route, requires authentication)
router.put('/scholarships/:id', protect, upload.single('image'), scholarshipController.updateScholarship);

// Route to delete a scholarship by ID (protected route, requires authentication)
router.delete('/scholarships/:id', protect, scholarshipController.deleteScholarship);

module.exports = router;
