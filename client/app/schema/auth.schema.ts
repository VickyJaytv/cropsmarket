import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>/?`~]/,
    "Password must contain at least one special character"
  );

const phoneValidation = z
  .string()
  .trim()
  .length(11, "Phone number must be exactly 11 digits")
  .startsWith("0", "Phone number must start with 0")
  .regex(/^\d{11}$/, "Phone number must contain only digits");

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: phoneValidation,
  role: z.enum(["buyer", "farmer"], { message: "Please select a role" }),
  accountType: z.enum(["INDIVIDUAL", "BUSINESS"], {
    message: "Please select an account type",
  }),
  password: passwordValidation,
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
