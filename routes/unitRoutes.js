const express= require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

const{ createUnit,getAllUnits,getUnitById,updateUnit,deleteUnit}=require('../controllers/unitController');

// Create Unit
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  createUnit
);

// Get all units
router.get(
  '/units',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  getAllUnits
);

// Get unit by ID
router.get(
  '/units/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  getUnitById
);

// Update unit
router.patch(
  '/units/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  updateUnit
);

// Delete unit
router.delete(
  '/units/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  deleteUnit
);

module.exports = router;