const express= require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

const{ createUnit,getUnitsByBuilding,getAllUnits,getUnitById,updateUnit,deleteUnit}=require('../controllers/unitController');

// Create Unit
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  createUnit
);

router.get(
  '/building/:buildingId',
  authMiddleware,
  roleMiddleware(['admin','manager']),
  getUnitsByBuilding
)

// Get all units
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  getAllUnits
);

// Get unit by ID
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  getUnitById
);

// Update unit
router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  updateUnit
);

// Delete unit
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  deleteUnit
);

module.exports = router;