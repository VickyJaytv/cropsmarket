import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(4, "name must be a minimum of 4 characters"),
  image: z.string().url("invalid image url").nullable().optional(),
});

export type CreateCategoryDTO = z.infer<typeof categorySchema>;
export type UpdateCategoryDTO = z.infer<typeof categorySchema>;
