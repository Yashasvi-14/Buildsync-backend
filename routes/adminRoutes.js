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

module.exports = router;