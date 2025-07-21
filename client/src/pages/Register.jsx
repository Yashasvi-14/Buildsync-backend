import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "@/assets/buildsync-logo.png"; // Update if path differs

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    buildingCodeRequested: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    alert("Triggered");
    console.log("Building Code Sent:", formData.buildingCodeRequested);

    console.log("Form Submitted:", formData);
    try {

      console.log("Form Data Submitted:", formData);

      const response = await axios.post("http://localhost:5000/api/auth/register", {...formData, buildingCodeRequested: formData.buildingCodeRequested.trim()});
      
      alert("Registration successful! Awaiting approval.");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
        <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-md relative">

        {/* Logo */}
        <div
          className="w-28 h-20 bg-white rounded-xl shadow-xl p-2 flex items-center justify-center z-10"
          style={{
            marginBottom: "-2rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
          }}
        >
          <img
            src={logo}
            alt="BuildSync Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Register card */}
        
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 pt-12">
          <form onSubmit={handleRegister}>
          <h2 className="text-center text-2xl font-bold text-[#111827] mb-6">
            Create Your Account
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm focus:ring-2 focus:ring-[#2c62f6] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm focus:ring-2 focus:ring-[#2c62f6] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm focus:ring-2 focus:ring-[#2c62f6] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-sm text-[#4b5563] hover:text-[#1f2937]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm focus:ring-2 focus:ring-[#2c62f6] focus:outline-none"
            >
              <option value="">Select role</option>
              <option value="manager">Manager</option>
              <option value="resident">Resident</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Building Code */}
          <div className="mb-6">
            <label
             className="block text-sm font-medium text-[#374151] mb-1">
              Building Code
            </label>
            <input
              name="buildingCodeRequested"
              value={formData.buildingCodeRequested}
              onChange={handleChange}
              type="text"
              placeholder="Enter Building Code"
              className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm focus:ring-2 focus:ring-[#2c62f6] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            
            className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white py-3 rounded-md text-sm font-semibold shadow-md hover:opacity-90 transition-all"
          >
            Register
          </button>
          </form>
          


          {/* Login link */}
          <p className="mt-6 text-center text-sm text-[#6b7280]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#1d4ed8] hover:underline"
            >
              Login
            </Link>
          </p>
          
        </div>
        
      </div>
    </div>
    
  );
}
