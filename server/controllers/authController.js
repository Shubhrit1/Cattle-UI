const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const { authenticateUser, findUserById } = require('../services/userService');

// Login controller
const login = async (req, res) => {
  try {
    const { email, aadhaar, mobile, password, role } = req.body;

    // Validate required fields
    if (!password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Password and role are required'
      });
    }

    if (role === 'admin' && !email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for admin login'
      });
    }

    if (role === 'flw' && !aadhaar && !mobile) {
      return res.status(400).json({
        success: false,
        message: 'Aadhaar or mobile number is required for FLW login'
      });
    }

    // Authenticate user
    const user = authenticateUser({ email, aadhaar, mobile, password, role });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = findUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
};

// Logout (client-side token removal)
const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const user = findUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const newToken = generateToken(user);

    res.json({
      success: true,
      data: { token: newToken }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh token'
    });
  }
};

module.exports = {
  login,
  getProfile,
  logout,
  refreshToken
};