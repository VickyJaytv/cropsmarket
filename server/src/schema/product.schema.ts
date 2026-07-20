import { z } from "zod";
export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "product name must be a minimum of two characters"),
});
