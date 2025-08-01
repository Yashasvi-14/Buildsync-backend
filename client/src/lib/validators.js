// src/lib/validators.js
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["manager", "resident", "staff"], {
    required_error: "Role is required",
  }),
  buildingCode: z.string().min(3, "Building code is required"),
});
