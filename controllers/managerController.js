const Unit = require('../models/unitModel');
const Building = require('../models/Building');
const User = require('../models/User');

// Get all units created by the logged-in manager
const getMyUnits = async (req, res) => {
  try {
    const managerId = req.user._id;

    const units = await Unit.find({ createdBy: managerId }).populate('building', 'name address');

    res.status(200).json({ message: 'Units fetched successfully', units });
  } catch (error) {
    console.error('Error fetching manager units:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const createResident = async (req, res) => {
  try {
    const managerId = req.user.id;

    const manager = await User.findById(managerId);
    if (!manager || !manager.building) {
      return res.status(404).json({ message: 'Manager or building not found' });
    }

    const { name, email, password, unit } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    if (unit) {
  const unitData = await Unit.findById(unit);
  if (!unitData || unitData.building.toString() !== manager.building.toString()) {
    return res.status(400).json({ message: 'Unit does not belong to your building' });
  }

  // Optional: Mark unit as "occupied"
  unitData.status = 'occupied';
  await unitData.save();
}

    const newResident = new User({
      name,
      email,
      password,
      role: 'resident',
      building: manager.building,
      unit: unit || null // optional
    });

    await newResident.save();

    return res.status(201).json({ message: 'Resident created successfully', resident: newResident });
  } catch (error) {
    console.error("Create Resident Error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAllResidentsForManager = async (req, res) => {
  try {
    const managerId = req.user.id;
    console.log("Checking User role:", req.user.role);
    const manager = await User.findById(managerId);
    console.log("Manager building:", manager.building);
    if(!manager || !manager.building)
     return res.status(404).json({message: 'Manager or building not found'});
    // Step 1: Get manager's building ID
    
    const buildingId = manager.building;

    // Step 2: Find units in this building
    const units = await Unit.find({ building: buildingId });
    const unitIds = units.map(unit => unit._id);
    console.log("units:",units);
    console.log("unitId:",unitIds);

    // Step 3: Get residents in those units
    const residents = await User.find({
      role: 'resident',
      unit: unitIds 
    }).populate('unit', 'unitNumber floor type')
      .populate('building', 'name address');

      console.log("Residents found:",residents);

    res.status(200).json({
      message: 'Residents fetched successfully',
      residents
    });
  } catch (err) {
    console.error('Get Residents Error:', err);
    res.status(500).json({ message: 'Server error while fetching residents' });
  }
};

const updateResidentByManager = async (req, res) => {
  try {
    const managerId = req.user.id;
    const residentId = req.params.id;
    const { name, email, unit } = req.body;

    const manager = await User.findById(managerId);
    if (!manager || !manager.building) {
      return res.status(403).json({ message: 'Manager or building not found' });
    }

    const resident = await User.findById(residentId);
    if (!resident || resident.role !== 'resident') {
      return res.status(404).json({ message: 'Resident not found' });
    }

    // Check if resident belongs to the same building
    if (resident.building.toString() !== manager.building.toString()) {
      return res.status(403).json({ message: 'Resident not under your building' });
    }

    // If email is being changed, check uniqueness
    if (email && email !== resident.email) {
      const emailUsed = await User.findOne({ email });
      if (emailUsed) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      resident.email = email;
    }

    if (name) resident.name = name;

    if (unit && unit !== resident.unit?.toString()) {
      const newUnit = await Unit.findById(unit);
      if (!newUnit || newUnit.building.toString() !== manager.building.toString()) {
        return res.status(400).json({ message: 'Invalid unit for your building' });
      }

      if (newUnit.status === 'occupied') {
        return res.status(400).json({ message: 'Unit already occupied' });
      }

      // Mark old unit as vacant
      if (resident.unit) {
        await Unit.findByIdAndUpdate(resident.unit, { status: 'vacant' });
      }

      // Assign new unit
      resident.unit = unit;
      newUnit.status = 'occupied';
      await newUnit.save();
    }

    await resident.save();

    return res.status(200).json({ message: 'Resident updated successfully', resident });
  } catch (error) {
    console.error('Update Resident Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteResidentByManager = async (req, res) => {
  try {
    const managerId = req.user.id;
    const residentId = req.params.id;

    const manager = await User.findById(managerId);
    if (!manager || !manager.building) {
      return res.status(403).json({ message: 'Manager or building not found' });
    }

    const resident = await User.findById(residentId);
    if (!resident || resident.role !== 'resident') {
      return res.status(404).json({ message: 'Resident not found' });
    }

    if (resident.building.toString() !== manager.building.toString()) {
      return res.status(403).json({ message: 'Resident not under your building' });
    }

    // Mark unit as vacant if resident had one
    if (resident.unit) {
      await Unit.findByIdAndUpdate(resident.unit, { status: 'vacant' });
    }

    // Delete resident
    await resident.deleteOne();

    return res.status(200).json({ message: 'Resident deleted successfully' });
  } catch (error) {
    console.error('Delete Resident Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getResidentById = async (req, res) => {
  try {
    const managerId = req.user.id;
    const residentId = req.params.id;

    const manager = await User.findById(managerId);
    if (!manager || !manager.building) {
      return res.status(403).json({ message: 'Manager or building not found' });
    }

    const resident = await User.findById(residentId)
      .populate('unit')
      .populate('building');

    if (!resident || resident.role !== 'resident') {
      return res.status(404).json({ message: 'Resident not found' });
    }

    if (resident.building._id.toString() !== manager.building.toString()) {
      return res.status(403).json({ message: 'Resident not under your building' });
    }

    return res.status(200).json({ resident });
  } catch (error) {
    console.error('Get Single Resident Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getMyUnits,getAllResidentsForManager,createResident,updateResidentByManager,deleteResidentByManager, getResidentById
};
