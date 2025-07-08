const Building=require('../models/Building');

const createBuilding= async (req,res) => {
    try{
        const { name,address,numberOfFloors}=req.body;

        if(!name || !address || !numberOfFloors){
            return res.status(400).json({message: 'All fields are required'});
        }
        const building=await Building.create({
            name,
            address,
            numberOfFloors,
            createdBy: req.user.id,
        });

        res.status(201).json({message: 'Building created successfully',building});
    } catch(err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
};

const getMyBuildings= async (req,res) => {
    try {
        const buildings = await Building.find({createdBy: req.user.id}).sort({createdAt: -1});
        res.status(200).json({buildings});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server error'});
    }
};
const getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }

    res.status(200).json(building);
  } catch (error) {
    console.error('Error in getBuildingById:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateBuilding = async (req,res) => {
    try{
        const buildingId=req.params.id;
        const managerId=req.user.id;
        const{ name,address }=req.body;

        const building = await Building.findById(buildingId);

        if(!building) {
            return res.status(404).json({message: 'Building not found'});
        }

        if(building.createdBy.toString() !== managerId){
            return res.status(403).json({message: 'Not authorized to update this building'});
        }

        if(name) building.name=name;
        if(address) building.address=address;

        const updatedBuilding = await building.save();

        res.status(200).json({message: 'Building updated successfully', building: updatedBuilding});
    } catch(error) {
        console.error('Error updating building:', error);
        res.status(500).json({message: 'Server error'});
    }
};

const deleteBuilding = async(req,res) => {
    try{
        const buildingId = req.params.id;
        const managerId=req.user.id;

        const building=await Building.findById(buildingId);

        if(!building) {
            return res.status(404).json({message: 'Building not found'});
        }

        if(building.createdBy.toString()!== managerId){
            return res.status(403).json({message: 'Not authorized to delete this building'});
        }

        await Building.findByIdAndDelete(buildingId);

        res.status(200).json({message: 'Building deleted successfully'});
    } catch (error) {
        console.error('Erroe deleting building:',error);
        res.status(500).json({message:'Server error'});
    }
};

module.exports = {createBuilding, getMyBuildings,getBuildingById,updateBuilding ,deleteBuilding};