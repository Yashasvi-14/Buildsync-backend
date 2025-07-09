const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');
const managerController = require('../controllers/managerController');
const {createBuilding, getMyBuildings , updateBuilding,deleteBuilding}=require('../controllers/buildingController');
const { getAllResidentsForManager, createResident } = require('../controllers/managerController');
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

module.exports = router;