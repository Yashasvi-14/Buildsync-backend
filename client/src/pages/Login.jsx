import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/buildsync-logo.png"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login", // Update with your actual backend URL if needed
      {email,
       password }
    );

    const userData = response.data;

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect based on role
    if (userData.role === "admin") {
      navigate("/admin/dashboard");
    } else if (userData.role === "manager") {
      navigate("/manager/dashboard");
    } else if (userData.role === "resident") {
      navigate("/resident/dashboard");
    } else {
      alert("Unknown user role");
    }
  } catch (err) {
    console.error(err);
    alert("Invalid email or password");
  }
};

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-md relative">

        {/* Logo block */}
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

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 pt-12">
          <h2 className="text-center text-2xl font-bold text-[#111827] mb-6">
            Login to BuildSync
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#374151] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2c62f6]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#374151] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2c62f6]"
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

          {/* Submit */}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white py-3 rounded-md text-sm font-semibold shadow-md hover:opacity-90 transition-all"
          >
            Login
          </button>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-[#6b7280]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#1d4ed8] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
