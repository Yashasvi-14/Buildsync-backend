
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Building = require('../models/Building');
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 5. Respond with success
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllUsers=async (req,res) => {
    try{
    const users = await User.find().select('-password');
    res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
};

const deleteUser = async (req, res) => {
  try{
    const userId=req.params.id;

    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({message: 'User deleted successfully'});
  } catch (err) {
    console.err('Error Deleting User:',err.message);
    res.status(500).json({message: 'Server error while deleting user'});
  }
};

const updateUser= async(req,res) => {
  try{
    const { id }=req.params;
    const { name, email, role }=req.body;

    const user=await User.findById(id);
    if(!user) return res.status(404).json({message: 'User not found'});

    if(name) user.name=name;
    if(email) user.email=email;
    if(role) user.role=role;

    await user.save();

    res.status(200).json({message: 'User updated successfully',user,});
  } catch(err) {
    console.error('update error: ',err);
    res.status(500).json({message: 'Server error while updating user'});
  }
};

// Block user
const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: `User ${user.name} has been blocked.`,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Unblock user
const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: `User ${user.name} has been unblocked.`,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const assignBuildingToManager = async (req, res) => {
  try {
    const { id } = req.params; // manager id
    const { buildingId } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'manager')
      return res.status(400).json({ message: 'User is not a manager' });

    const building = await Building.findById(buildingId);
    if (!building) return res.status(404).json({ message: 'Building not found' });

    user.building = buildingId;
    await user.save();

    res.status(200).json({ message: 'Building assigned to manager successfully', user });
  } catch (err) {
    console.error('Assign building error:', err);
    res.status(500).json({ message: 'Server error while assigning building' });
  }
};

module.exports = { createUser, getAllUsers ,deleteUser,updateUser,blockUser,unblockUser,assignBuildingToManager};
