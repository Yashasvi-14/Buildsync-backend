const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    numberOfFloors: {
        type: Number,
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    timestamps: true
});

module.exports=mongoose.model('Building', buildingSchema);