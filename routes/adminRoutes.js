const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

const { createUser, getAllUsers, deleteUser} = require('../controllers/adminController');
const { verify } = require('jsonwebtoken');

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
     getAllUsers);

     router.delete(
        '/users/:id',
        authMiddleware,
        roleMiddleware(['admin']),
        deleteUser
     );

module.exports = router;