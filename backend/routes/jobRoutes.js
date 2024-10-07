const express = require('express');
const multer = require('multer');
const router = express.Router();
const jobController = require('../controllers/jobController');
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

// Route to create a new job with image upload (protected route, requires authentication)
router.post('/', protect, upload.single('image'), jobController.createJob);

// Route to get all jobs (public route)
router.get('/', jobController.getAllJobs);

// Route to get a specific job by ID (public route)
router.get('/:id', jobController.getJobById);

// Route to update a job by ID (protected route, requires authentication)
router.put('/:id', protect, upload.single('image'), jobController.updateJob); // Added multer to allow image updates

// Route to delete a job by ID (protected route, requires authentication)
router.delete('/:id', protect, jobController.deleteJob);

// Route to get jobs added by the logged-in user (protected route, requires authentication)
router.get('/my-jobs', protect, jobController.getUserJobs);

module.exports = router;
