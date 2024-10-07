const express = require('express');
const multer = require('multer');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { protect } = require('../middleware/authmiddleware');

// Multer file upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder to save uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Route to create a new university with image upload (protected route, requires authentication)
router.post('/universities', protect, upload.single('image'), universityController.createUniversity);

// Route to get all universities (public route)
router.get('/universities', universityController.getAllUniversities);

// Route to get a specific university by ID (public route)
router.get('/universities/:id', universityController.getUniversityById);

// Route to update a university by ID (protected route, requires authentication)
router.put('/universities/:id', protect, upload.single('image'), universityController.updateUniversity); // Added multer to allow image updates

// Route to delete a university by ID (protected route, requires authentication)
router.delete('/universities/:id', protect, universityController.deleteUniversity);

module.exports = router;
