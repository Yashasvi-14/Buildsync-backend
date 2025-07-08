const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');
const {createBuilding, getMyBuildings , updateBuilding,deleteBuilding}=require('../controllers/buildingController');
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

module.exports = router;