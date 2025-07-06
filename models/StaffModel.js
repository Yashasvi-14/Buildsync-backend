const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['guard', 'cleaner', 'electrician', 'plumber', 'managerial', 'other'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    assignedBuilding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
    },
    shift: {
      type: String,
      enum: ['morning', 'evening', 'night', 'rotational'],
      default: 'morning',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
