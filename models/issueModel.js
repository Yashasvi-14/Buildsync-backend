const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Issue title is required'],
    },
    description: {
    type: String,
    required: [true, 'Description is required'],
    },
    status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending',
    },
    priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
    },
    reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    default: null,
    },
    unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true,
    },
},{
        timestamps: true,
    }
);

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
