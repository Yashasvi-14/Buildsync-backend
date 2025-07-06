const Staff = require('../models/StaffModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new staff
// @route   POST /api/staffs
// @access  Manager
const createStaff = asyncHandler(async (req, res) => {
  const { name, role, phone, shift, building } = req.body;
console.log("REQ.USER", req.user);

  const staff = await Staff.create({
    name,
    role,
    phone,
    shift,
    building,
    createdBy: req.user.id,
  });

  res.status(201).json(staff);
});

// @desc    Get all staffs
// @route   GET /api/staffs
// @access  Manager
const getAllStaffs = asyncHandler(async (req, res) => {
    console.log("req.user.id:",req.user.id);
  const staffs = await Staff.find({ createdBy: req.user.id }).populate('assignedBuilding');
  console.log("All Staffs",staffs);
  res.status(200).json(staffs);
});

// @desc    Get single staff
// @route   GET /api/staffs/:id
// @access  Manager
const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Staff.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  }).populate('assignedBuilding');

  if (!staff) {
    res.status(404);
    throw new Error('Staff not found');
  }

  return res.status(200).json({
    message: 'Staff fetched successfully',
    staff,
  });
});


// @desc    Update staff
// @route   PATCH /api/staffs/:id
// @access  Manager
const updateStaff = asyncHandler(async (req, res) => {
    console.log("Request user ID:", req.user.id);
  console.log("Staff ID param:", req.params.id);

  const updated = await Staff.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error('Staff not found');
  }

  res.status(200).json(updated);
});

// @desc    Delete staff
// @route   DELETE /api/staffs/:id
// @access  Manager
const deleteStaff = asyncHandler(async (req, res) => {
  const deleted = await Staff.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!deleted) {
    res.status(404);
    throw new Error('Staff not found');
  }

  res.status(200).json({ message: 'Staff deleted successfully' });
});

module.exports = {
  createStaff,
  getAllStaffs,
  getStaffById,
  updateStaff,
  deleteStaff,
};
