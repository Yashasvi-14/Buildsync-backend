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
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({message: 'Invalid Credentials'});

        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid Credentials'});

        const payload={
            user: {
                id: user._id,
                role: user.role
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: '1d'
        });
        res.json({token, role:user.role, name: user.name});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports=router;