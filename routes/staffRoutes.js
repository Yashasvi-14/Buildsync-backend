const express = require('express');
const router = express.Router();
const {
  createStaff,
  getAllStaffs,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');

const protect= require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

// Route Protection: Only 'admin' and 'manager' can manage staff
router.use(protect);
router.use(roleMiddleware(['admin', 'manager']));

// Routes
router.post('/', createStaff);
router.get('/', getAllStaffs);
router.get('/:id', getStaffById);
router.patch('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
