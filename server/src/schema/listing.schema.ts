import z from "zod";
export const listingSchema = z.object({
  quantity: z.number().positive(),
  unit: z.number().positive(),
  price: z.number().positive(),
  desc: z.string().trim().min(1).max(500).optional(),
  description: z.string().trim().min(1).max(500).optional(),
  location: z.string().trim().min(1),
  status: z.enum(["active", "sold", "paused"]).optional(),
  image: z.string().url("invalid image url").nullable().optional(),
});

export const listingFilterSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  name: z.string().trim().optional(),
  status: z.enum(["active", "sold", "paused"]).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  minQuantity: z.coerce.number().nonnegative().optional(),
  maxQuantity: z.coerce.number().nonnegative().optional(),
  state: z.string().trim().optional(),
  lga: z.string().trim().optional(),
  farmerId: z.coerce.number().int().positive().optional(),
  farmerName: z.string().trim().optional(),
  sortBy: z.enum(["price", "quantity", "createdAt"]).optional(),
  sortOrder: z.enum(["ASC", "DESC", "asc", "desc"]).optional(),
});

export const updateListingSchema = listingSchema.partial();

export type CreateListingDTO = z.infer<typeof listingSchema>;
export type FilterListingDTO = z.infer<typeof listingFilterSchema>;
export type UpdateListingDTO = z.infer<typeof updateListingSchema>;
