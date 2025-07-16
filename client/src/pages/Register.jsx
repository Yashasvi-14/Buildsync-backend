import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/buildsync-logo.png"; // adjust path if needed

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

        {/* Register card */}
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 pt-12">
          <h2 className="text-center text-2xl font-bold text-[#111827] mb-6">
            Create your BuildSync account
          </h2>

          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-[#374151]">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2c62f6]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-[#374151]">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2c62f6]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-[#374151]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-[#374151]">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-md border border-[#d1d5db] bg-[#f9fafb] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2c62f6]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 text-sm text-[#4b5563] hover:text-[#1f2937]"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white py-3 rounded-md text-sm font-semibold shadow-md hover:opacity-90 transition-all"
            >
              Register
            </button>
          </form>

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
