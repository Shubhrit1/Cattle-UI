const express = require('express');
const { authenticateToken, requireFLWOrAdmin } = require('../middleware/auth');
const {
  getAllAnimals,
  getAnimalById,
  registerAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalStats
} = require('../controllers/animalController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);
router.use(requireFLWOrAdmin);

// Animal CRUD routes
router.get('/', getAllAnimals);
router.get('/stats', getAnimalStats);
router.get('/:id', getAnimalById);
router.post('/', registerAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;