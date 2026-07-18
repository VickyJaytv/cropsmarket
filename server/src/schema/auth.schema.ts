import { string, z } from "zod";
const specialCharRegex = /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>/?`~]/;

export const signUpSchema = z.object({
  firstName: z.string().trim().min(3, "Name required"),
  lastName: z.string().trim().min(3, "Name required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .trim()
    .length(11, "Phone number must be 11 digits")
    .startsWith("0", "Phone number must start with 0"),
  role: z.enum(["buyer", "farmer", "admin"]),
  accountType: z.enum(["individual", "business"]),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => specialCharRegex.test(value), {
      message: "Password must contain at least one special character",
    }),
});

export type SignupDTO = z.infer<typeof signUpSchema>;

export const loginSchema = signUpSchema.pick({
  email: true,
  password: true,
});

export type LoginDTO = z.infer<typeof loginSchema>;
