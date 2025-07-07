
const mongoose = require('mongoose');
const userSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
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
        },
        role: {
            type: String,
            enum: ["admin", "manager","resident","staff"],
            default: "resident",
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit',
        },
    },
    { timestamps: true }
);

const User=mongoose.model("User", userSchema);
module.exports = User;


