import { z } from "zod";

const specialCharRegex = /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>/?`~]/;

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().trim().min(3, "First name must be at least 3 characters"),
  lastName: z.string().trim().min(3, "Last name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email address"),
  phoneNumber: z
    .string()
    .trim()
    .length(11, "Phone number must be exactly 11 digits")
    .startsWith("0", "Phone number must start with 0")
    .regex(/^\d{11}$/, "Phone number must contain only numbers"),
  role: z.enum(["farmer", "buyer", "FARMER", "BUYER"], {
    error: () => ({ message: "Please select a valid role" }),
  }),
  accountType: z.enum(["INDIVIDUAL", "BUSINESS"]),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((value) => /[a-z]/.test(value), {
      message: "Must contain a lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Must contain an uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Must contain a number",
    })
    .refine((value) => specialCharRegex.test(value), {
      message: "Must contain a special character",
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
