const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    unitNumber: {
        type: String,
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['residential','commercial'],
        default: 'residential',
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
    },
    staffAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['vacant','occupied','maintenance'],
        default: 'vacant',
    },
},{ timestamps: true }
);

module.exports=mongoose.model('Unit',unitSchema);