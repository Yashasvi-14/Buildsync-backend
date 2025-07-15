const Unit = require('../models/unitModel');
const Building = require('../models/Building');
const createUnit = async (req,res) => {
    try{
        const { unitNumber, floor, buildingId } = req.body;
        const building=await Building.findById(buildingId);

  if (!unitNumber || !floor || !buildingId) {
    return res.status(400).json({message: 'All fields are required'});
  }
  if (!building) return res.status(404).json({ message: 'Building not found' });
  const unit = await Unit.create({
    unitNumber,
    floor,
    building: building._id,
  });

  building.units.push(unit._id);
  await building.save();

  res.status(201).json({ message: 'Unit created successfully', unit: unit });
    } catch (error) {
        console.log('Create Unit Error:',error);
        res.status(500).json({message: 'Server error while creating unit'});
    }
};

const getUnitsByBuilding = async (req, res) => {
  try {
    const { buildingId } = req.params;

    const units = await Unit.find({ building: buildingId }).populate('building', 'name address');

    res.status(200).json({ message: 'Units fetched successfully', units });
  } catch (err) {
    console.error('Get Units Error:', err);
    res.status(500).json({ message: 'Server error while fetching units' });
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
    const { id } = req.params;
    const { unitNumber, floor, type, status, buildingId } = req.body;

    const unit = await Unit.findById(id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });

    // If buildingId changed, update both buildings
    if (buildingId && !unit.building.equals(buildingId)) {
      const oldBuilding = await Building.findById(unit.building);
      const newBuilding = await Building.findById(buildingId);
      if (!newBuilding) return res.status(404).json({ message: 'New building not found' });

      // Remove from old building
      oldBuilding.units.pull(unit._id);
      await oldBuilding.save();

      // Add to new building
      newBuilding.units.push(unit._id);
      await newBuilding.save();

      // Update unit's building ref
      unit.building = buildingId;
    }

    if (unitNumber) unit.unitNumber = unitNumber;
    if (floor) unit.floor = floor;
    if (type) unit.type = type;
    if (status) unit.status = status;

    await unit.save();
    res.status(200).json({ message: 'Unit updated successfully', unit });
  } catch (err) {
    console.error('Update Unit Error:', err);
    res.status(500).json({ message: 'Server error while updating unit' });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findByIdAndDelete(id);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    // Remove reference from building
    await Building.findByIdAndUpdate(unit.building, {
      $pull: { units: unit._id },
    });

    // Unassign unit from all staff
    await User.updateMany(
      { _id: { $in: unit.staff } },
      { $unset: { unit: "" } }
    );

    res.status(200).json({ message: 'Unit deleted and staff unassigned' });
  } catch (err) {
    console.error('Delete Unit Error:', err);
    res.status(500).json({ message: 'Server error while deleting unit' });
  }
};



module.exports={createUnit,getUnitsByBuilding,getAllUnits,getUnitById,updateUnit,deleteUnit};
