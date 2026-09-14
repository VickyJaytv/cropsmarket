import { z } from "zod";

export const createListingSchema = z.object({
  productId: z.number({ message: "Please select a product" }).min(1),
  quantity: z.number({ message: "Quantity must be a number" }).min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
  price: z.number({ message: "Price must be a number" }).min(10, "Price must be at least 10"),
  locationState: z.string().min(2, "State is required"),
  locationLGA: z.string().min(2, "LGA is required"),
  description: z.string().optional(),
  availability: z.boolean(),
});

export type CreateListingFormData = z.infer<typeof createListingSchema>;
