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
        min: 1,
    },
    buildingCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
    type: String,
    default: '',
    trim: true,
    },
    units: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    },],

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },


},{
    timestamps: true
});

buildingSchema.index({ buildingCode: 1 }, { unique: true });
buildingSchema.index({ name: 1, address: 1 });


module.exports=mongoose.model('Building', buildingSchema);