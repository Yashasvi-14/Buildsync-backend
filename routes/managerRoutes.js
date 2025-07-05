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

router.post(
    '/buildings',
    authMiddleware,
    roleMiddleware(['manager']),
    createBuilding
);

router.get(
    '/buildings',
    authMiddleware,
    roleMiddleware(['manager']),
    getMyBuildings
);

router.put(
    '/buildings/:id',
    authMiddleware,
    roleMiddleware(['manager']),
    updateBuilding
)

router.delete(
    '/buildings/:id',
    authMiddleware,
    roleMiddleware(['manager']),
    deleteBuilding
)

module.exports = router;