const Unit = require('../models/unitModel');

const createUnit = async (req,res) => {
    try{
        const { unitNumber, floor, building } = req.body;

  if (!unitNumber || !floor || !building) {
    res.status(400).json({message: 'All fields are required'});
  }

  const unit = await Unit.create({
    unitNumber,
    floor,
    building,
  });

  res.status(201).json(unit);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
};

const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find().populate('building').populate('staffAssigned');
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUnitById = async (req,res) => {
    try{
        const unit = await Unit.findById(req.params.id).populate('building').populate('staffAssigned');

        if(!unit) return res.status(404).json({message: 'Unit not found'});
        res.status(200).json(unit);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};
const updateUnit = async (req, res) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUnit) return res.status(404).json({ message: 'Unit not found' });
    res.status(200).json(updatedUnit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(req.params.id);
    if (!deletedUnit) return res.status(404).json({ message: 'Unit not found' });
    res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={createUnit,getAllUnits,getUnitById,updateUnit,deleteUnit};
