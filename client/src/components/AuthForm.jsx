// src/components/AuthForm.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";

const roles = ["admin", "manager", "resident"];

export default function AuthForm({ type = "login", onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "resident",
    buildingCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, name, role, buildingCode } = formData;

    if (!email || !password || (type === "register" && !name)) {
      return toast.error("All fields are required");
    }

    if (type === "register" && role === "resident" && !buildingCode) {
      return toast.error("Resident must enter Building Code");
    }

    onSubmit(formData); // Passed from Login/Register pages
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 capitalize">{type} to BuildSync</h2>

      {type === "register" && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={formData.password}
        onChange={handleChange}
      />

      {type === "register" && (
        <>
          <select
            name="role"
            className="w-full mb-3 px-4 py-2 border rounded"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>

          {formData.role === "resident" && (
            <input
              type="text"
              name="buildingCode"
              placeholder="Building Code"
              className="w-full mb-3 px-4 py-2 border rounded"
              value={formData.buildingCode}
              onChange={handleChange}
            />
          )}
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
