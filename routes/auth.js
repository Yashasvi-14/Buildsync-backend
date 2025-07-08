const express=require('express');
const router = express.Router();

const User=require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) => {
    const { name, email, password, role }= req.body;
    try {
    let user = await User.findOne({email});
    if (user) return res.status(400).json({message: 'User already exists!'});

    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);

    user=new User({ name, email, password: hashedPassword, role});
    await user.save();

    res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async(req,res) => {
    const { email, password }=req.body;
    console.log("Login request received with:", { email, password });
    try {
        const user = await User.findOne({ email }).populate({
            path: 'unit',
            populate: {
                path: 'building',
                model:'Building'
            }
        });

        console.log("User found in DB:", user);

        if (!user) return res.status(400).json({message: 'Invalid Credentials'});

        if (user.isBlocked) {
         return res.status(403).json({ error: 'Your account has been blocked. Please contact admin.' });
        }

        const isMatch=await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);
        if (!isMatch) return res.status(400).json({message: 'Invalid Credentials'});

        const payload={
            user: {
                id: user._id,
                role: user.role,
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: '1d'
        });
         console.log("Token generated successfully");
        if (user.role === 'resident' && user.unit && user.unit.building) {
  res.json({
    token,
    role: user.role,
    name: user.name,
    unit: user.unit._id,
    unitNumber: user.unit.unitNumber,
    building: user.unit.building._id,
    buildingName: user.unit.building.name
  });
} else {
  // For admin and manager, no unit/building
  res.json({
    token,
    role: user.role,
    name: user.name
  });
}

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports=router;