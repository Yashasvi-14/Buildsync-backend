const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');
const managerController = require('../controllers/managerController');
const {createBuilding, getMyBuildings , updateBuilding,deleteBuilding}=require('../controllers/buildingController');
const { getAllResidentsForManager, createResident ,updateResidentByManager,deleteResidentByManager,getResidentById} = require('../controllers/managerController');
const{ getManagerStats} =  require("../controllers/managerController");
router.get(
    '/test',
    authMiddleware,
    roleMiddleware(['manager']),
    (req,res) => {
        res.status(200).json({message: `Welcome Manager, ${req.user.id}!`,
        user: req.user,
    });
    }
);

router.get(
    '/my-units',
     authMiddleware,
    roleMiddleware(['manager']),
     managerController.getMyUnits
);

router.post(
    '/residents', 
    authMiddleware, 
    roleMiddleware(['manager']), 
    createResident);


router.get(
    '/residents',
     authMiddleware,
     roleMiddleware(['manager']),
     getAllResidentsForManager
);

router.patch(
    '/residents/:id', 
    authMiddleware, 
    roleMiddleware(['manager']), 
    updateResidentByManager
);

router.delete(
    '/residents/:id',
     authMiddleware,
    roleMiddleware(['manager']), 
    deleteResidentByManager
);

router.get(
    '/residents/:id', 
    authMiddleware, 
    roleMiddleware(['manager']), 
    getResidentById
);

router.get(
    '/stats',
    authMiddleware,
    roleMiddleware(['manager']),
    getManagerStats
);

// routes/manager.js
router.get('/pending-users', authMiddleware, roleMiddleware(['manager']), async (req, res) => {
  try {
    const manager = await User.findById(req.user.id).populate('building');
    if (!manager || !manager.building) {
      return res.status(400).json({ error: 'Manager has no building assigned' });
    }

    const pendingUsers = await User.find({
      isApproved: false,
      building: manager.building._id, // For staff
    }).populate('unit');

    // Filter residents by unit.building if needed
    const unitBasedUsers = await User.find({
      isApproved: false,
      role: 'resident',
    }).populate({
      path: 'unit',
      populate: {
        path: 'building',
      },
    });

    const pendingResidents = unitBasedUsers.filter(
      (u) => u.unit?.building?._id.toString() === manager.building._id.toString()
    );

    const allPending = [...pendingUsers, ...pendingResidents];

    res.json(allPending);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.patch('/users/:id/approve', authMiddleware, roleMiddleware(['manager']), async (req, res) => {
  try {
    const manager = await User.findById(req.user.id);
    const userToApprove = await User.findById(req.params.id)
      .populate('unit')
      .populate('building');

    if (!userToApprove) {
      return res.status(404).json({ error: 'User not found' });
    }

    const managerBuildingId = manager.building?.toString();

    const userBuildingId =
      userToApprove.role === 'resident'
        ? userToApprove.unit?.building?.toString()
        : userToApprove.building?.toString();

    if (!userBuildingId || userBuildingId !== managerBuildingId) {
      return res.status(403).json({ error: 'You can only approve users from your building' });
    }

    userToApprove.isApproved = true;
    await userToApprove.save();

    res.json({ message: 'User approved successfully', user: userToApprove });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// routes/manager.js
router.delete('/users/:id/reject', authMiddleware, roleMiddleware(['manager']), async (req, res) => {
  try {
    const manager = await User.findById(req.user.id);
    const userToDelete = await User.findById(req.params.id)
      .populate('unit')
      .populate('building');

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    const managerBuildingId = manager.building?.toString();

    const userBuildingId =
      userToDelete.role === 'resident'
        ? userToDelete.unit?.building?.toString()
        : userToDelete.building?.toString();

    if (!userBuildingId || userBuildingId !== managerBuildingId) {
      return res.status(403).json({ error: 'You can only reject users from your building' });
    }

    await userToDelete.deleteOne();

    res.json({ message: 'User rejected and deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});






module.exports = router;