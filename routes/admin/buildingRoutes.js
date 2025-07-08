const express = require('express');
const router = express.Router();
const {
  createBuilding,
  getMyBuildings,
  getBuildingById,
  updateBuilding,
  deleteBuilding,
} = require('../../controllers/buildingController');

const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

// Admin only
router.use(authMiddleware, roleMiddleware(['admin']));

router.post('/', createBuilding);
router.get('/', getMyBuildings);
router.get('/:id', getBuildingById);
router.patch('/:id', updateBuilding);
router.delete('/:id', deleteBuilding);

module.exports = router;
