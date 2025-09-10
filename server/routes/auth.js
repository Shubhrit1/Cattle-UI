const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  login,
  getProfile,
  logout,
  refreshToken
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);
router.post('/refresh', authenticateToken, refreshToken);

module.exports = router;