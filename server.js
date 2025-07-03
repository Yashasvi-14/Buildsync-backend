const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoutes=require('./routes/auth');

dotenv.config();
connectDB();

const app=express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/",(req,res)=>{
    res.send("BuildSync API is alive 💥");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT ,()=>{
    console.log(`Server running on PORT ${PORT}`);
});