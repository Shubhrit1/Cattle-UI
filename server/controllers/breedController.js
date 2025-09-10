const { v4: uuidv4 } = require('uuid');
const breedService = require('../services/breedService');

// Get all breeds
const getAllBreeds = async (req, res) => {
  try {
    const { type, status, search } = req.query;
    const breeds = breedService.getAllBreeds({ type, status, search });

    res.json({
      success: true,
      data: breeds,
      total: breeds.length
    });

  } catch (error) {
    console.error('Get breeds error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch breeds'
    });
  }
};

// Get breed by ID
const getBreedById = async (req, res) => {
  try {
    const { id } = req.params;
    const breed = breedService.getBreedById(id);

    if (!breed) {
      return res.status(404).json({
        success: false,
        message: 'Breed not found'
      });
    }

    res.json({
      success: true,
      data: breed
    });

  } catch (error) {
    console.error('Get breed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch breed'
    });
  }
};

// Recognize breed from image
const recognizeBreed = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Simulate AI breed recognition
    const predictions = breedService.simulateBreedRecognition(req.file);

    res.json({
      success: true,
      data: {
        predictions,
        imageUrl: `/uploads/${req.file.filename}`,
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Breed recognition error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to recognize breed'
    });
  }
};

// Create new breed (Admin only)
const createBreed = async (req, res) => {
  try {
    const breedData = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      createdBy: req.user.id
    };

    const breed = breedService.createBreed(breedData);

    res.status(201).json({
      success: true,
      message: 'Breed created successfully',
      data: breed
    });

  } catch (error) {
    console.error('Create breed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create breed'
    });
  }
};

// Update breed (Admin only)
const updateBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.id
    };

    const breed = breedService.updateBreed(id, updateData);

    if (!breed) {
      return res.status(404).json({
        success: false,
        message: 'Breed not found'
      });
    }

    res.json({
      success: true,
      message: 'Breed updated successfully',
      data: breed
    });

  } catch (error) {
    console.error('Update breed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update breed'
    });
  }
};

// Delete breed (Admin only)
const deleteBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const success = breedService.deleteBreed(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Breed not found'
      });
    }

    res.json({
      success: true,
      message: 'Breed deleted successfully'
    });

  } catch (error) {
    console.error('Delete breed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete breed'
    });
  }
};

module.exports = {
  getAllBreeds,
  getBreedById,
  recognizeBreed,
  createBreed,
  updateBreed,
  deleteBreed
};