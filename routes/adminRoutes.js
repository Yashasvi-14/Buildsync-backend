const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

const { createUser, getAllUsers, deleteUser, updateUser} = require('../controllers/adminController');
const { verify } = require('jsonwebtoken');

const{ blockUser, unblockUser,assignBuildingToManager} = require('../controllers/adminController');

router.get(
    '/test',
    authMiddleware,
    roleMiddleware(['admin']),
    (req,res) => {
        res.status(200).json({
            message: `Welcome Admin, ${req.user.id}!`,
            user: req.user,
        });
    }
);

router.post(
    '/create-user',
    authMiddleware,
    roleMiddleware(['admin']),
    createUser
);

router.get(
    '/users',
     authMiddleware,
     roleMiddleware(['admin']),
     getAllUsers
);
     
     
router.delete(
    '/users/:id',
    authMiddleware,        
    roleMiddleware(['admin']),
     deleteUser
);

router.patch(
    '/users/:id',
    authMiddleware,
    roleMiddleware(['admin']),
    updateUser
);

router.patch(
  '/users/:id/block',
  authMiddleware,
  roleMiddleware(['admin']),
  blockUser
);

router.patch(
  '/users/:id/unblock',
  authMiddleware,
  roleMiddleware(['admin']),
  unblockUser
);

router.patch(
    '/users/:id/assign-building',
     authMiddleware,
     roleMiddleware(['admin']), 
    assignBuildingToManager
);

router.get('/pending-managers', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const pendingManagers = await User.find({ role: 'manager', isApproved: false }).select('name email buildingCodeRequested createdAt');
    res.json(pendingManagers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.patch('/approve-manager/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const manager = await User.findById(req.params.id);
    if (!manager || manager.role !== 'manager') {
      return res.status(404).json({ message: "Manager not found" });
    }

    if (manager.isApproved) {
      return res.status(400).json({ message: "Manager is already approved" });
    }

    const { buildingCodeRequested } = manager;
    if (!buildingCodeRequested) {
      return res.status(400).json({ message: "No building code requested" });
    }

    // Check if building exists
    let building = await Building.findOne({ code: buildingCodeRequested });
    if (!building) {
      // Create new building
        building = new Building({
        name: buildingCodeRequested, // You can ask for building name in frontend later
        code: buildingCodeRequested,
        numFloors: 1, // default floor if not provided
        createdBy: req.user.id,
      });
      await building.save();
    }

    // Update manager details
    manager.isApproved = true;
    manager.building = building._id;
    manager.buildingCodeRequested = undefined;
    await manager.save();

    res.json({ message: "Manager approved successfully", managerId: manager._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;