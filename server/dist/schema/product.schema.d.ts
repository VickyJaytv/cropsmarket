import { z } from "zod";
export declare const productSchema: z.ZodObject<{
    name: z.ZodString;
    description: () => z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=product.schema.d.ts.map