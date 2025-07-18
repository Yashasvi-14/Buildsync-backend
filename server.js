const express = require("express");
const dotenv = require("dotenv");

const cors=require('cors');
const connectDB = require("./config/connectDB");
const authRoutes=require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const unitRoutes = require('./routes/unitRoutes');
const staffRoutes = require('./routes/staffRoutes');
const issueRoutes = require('./routes/manager/issueRoutes');
dotenv.config();
connectDB();

const app=express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/manager', managerRoutes);

app.use('/api/admin/buildings', require('./routes/admin/buildingRoutes'));

app.use('/api/units',unitRoutes);

app.use('/api/manager/staff', staffRoutes);

app.use('/api/manager/issues', issueRoutes);

app.get("/",(req,res)=>{
    res.send("BuildSync API is alive 💥");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT ,()=>{
    console.log(`Server running on PORT ${PORT}`);
});