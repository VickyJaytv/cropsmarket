import { z } from "zod";
export const farmerSchema = z.object({
  profilePicture: z.string().url().nullable().optional(),
  farmName: z.string().min(2).max(100).nullable().optional(),
  address: z.string().min(1, "address is required"),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
});

export type FarmerProfileDTO = z.infer<typeof farmerSchema>;

export const UpdateFarmerSchema = farmerSchema.partial();
export type UpdateFarmerProfileDTO = z.infer<typeof UpdateFarmerSchema>;
