const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateToken, requireAdmin, requireFLWOrAdmin } = require('../middleware/auth');
const {
  getAllBreeds,
  getBreedById,
  recognizeBreed,
  createBreed,
  updateBreed,
  deleteBreed
} = require('../controllers/breedController');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'breed-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public routes
router.get('/', getAllBreeds);
router.get('/:id', getBreedById);

// Protected routes - FLW and Admin
router.post('/recognize', authenticateToken, requireFLWOrAdmin, upload.single('image'), recognizeBreed);

// Admin only routes
router.post('/', authenticateToken, requireAdmin, createBreed);
router.put('/:id', authenticateToken, requireAdmin, updateBreed);
router.delete('/:id', authenticateToken, requireAdmin, deleteBreed);

module.exports = router;