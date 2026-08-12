import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "product name must be a minimum of two characters"),

  description: z.string().trim().optional(),
  image: z.string().url("invalid image url").optional(),
});

export const productFilterSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  name: z.string().trim().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  isActive: z.coerce.boolean().optional(),
});

export type CreateProductDTO = z.infer<typeof productSchema>;
export type FilterProductDTO = z.infer<typeof productFilterSchema>;

export const updateProductSchema = productSchema.partial();
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
