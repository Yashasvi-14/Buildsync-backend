import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    buildingCode: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Call backend API
    toast.success("Registration submitted. Awaiting approval.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select role</option>
          <option value="manager">Manager</option>
          <option value="resident">Resident</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      {/* Building Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Building Code</label>
        <input
          type="text"
          name="buildingCode"
          value={form.buildingCode}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow hover:opacity-90 transition"
      >
        Register
      </button>
    </form>
  );
}

