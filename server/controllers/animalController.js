const { v4: uuidv4 } = require('uuid');
const animalService = require('../services/animalService');

// Get all animals
const getAllAnimals = async (req, res) => {
  try {
    const { status, breed, owner, search, page = 1, limit = 10 } = req.query;
    const filters = { status, breed, owner, search };
    
    // For FLW users, only show their registered animals
    if (req.user.role === 'flw') {
      filters.registeredBy = req.user.id;
    }

    const result = animalService.getAllAnimals(filters, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      data: result.animals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.total,
        pages: Math.ceil(result.total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get animals error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch animals'
    });
  }
};

// Get animal by Pashu Aadhaar
const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = animalService.getAnimalById(id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found'
      });
    }

    // Check if FLW can access this animal
    if (req.user.role === 'flw' && animal.registeredBy !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: animal
    });

  } catch (error) {
    console.error('Get animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch animal'
    });
  }
};

// Register new animal
const registerAnimal = async (req, res) => {
  try {
    const animalData = {
      pashuAadhaar: `PA${Date.now()}${Math.floor(Math.random() * 1000)}`,
      ...req.body,
      registeredBy: req.user.id,
      registeredAt: new Date().toISOString(),
      status: 'active'
    };

    const animal = animalService.createAnimal(animalData);

    res.status(201).json({
      success: true,
      message: 'Animal registered successfully',
      data: animal
    });

  } catch (error) {
    console.error('Register animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register animal'
    });
  }
};

// Update animal information
const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = animalService.getAnimalById(id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found'
      });
    }

    // Check if FLW can update this animal
    if (req.user.role === 'flw' && animal.registeredBy !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.id
    };

    const updatedAnimal = animalService.updateAnimal(id, updateData);

    res.json({
      success: true,
      message: 'Animal updated successfully',
      data: updatedAnimal
    });

  } catch (error) {
    console.error('Update animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update animal'
    });
  }
};

// Delete animal
const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = animalService.getAnimalById(id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found'
      });
    }

    // Check if FLW can delete this animal
    if (req.user.role === 'flw' && animal.registeredBy !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const success = animalService.deleteAnimal(id);

    res.json({
      success: true,
      message: 'Animal deleted successfully'
    });

  } catch (error) {
    console.error('Delete animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete animal'
    });
  }
};

// Get animal statistics
const getAnimalStats = async (req, res) => {
  try {
    const filters = req.user.role === 'flw' ? { registeredBy: req.user.id } : {};
    const stats = animalService.getAnimalStats(filters);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get animal stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch animal statistics'
    });
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  registerAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalStats
};