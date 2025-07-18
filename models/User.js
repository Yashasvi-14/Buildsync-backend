const mongoose = require('mongoose');
const userSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Please enter your Password"],
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["admin", "manager","resident","staff"],
            default: "resident",
        },

        status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        },

        buildingCodeRequested: {
        type: String,
        required: function () {
            return this.role !== "admin";
        },
        trim: true,
        uppercase: true,
        },

        building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        default: null,
        },

        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit',
        },

        createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },

        isBlocked: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const User=mongoose.model("User", userSchema);
module.exports = User;


