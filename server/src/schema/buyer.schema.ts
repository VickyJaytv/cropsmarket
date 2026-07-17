import { z } from "zod";

export const buyerSchema = z.object({
  profilePicture: z.string().url().nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  companyName: z.string().min(2).max(100).nullable().optional(),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
});

export const UpdateBuyerProfileSchema = buyerSchema.partial();

export type BuyerProfileDTO = z.infer<typeof buyerSchema>;
export type UpdateBuyerProfileDTO = z.infer<typeof UpdateBuyerProfileSchema>;
