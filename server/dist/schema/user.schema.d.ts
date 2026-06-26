import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phoneNo: z.ZodString;
    role: z.ZodEnum<{
        buyer: "buyer";
        farmer: "farmer";
        admin: "admin";
    }>;
    password: z.ZodString;
}, z.core.$strip>;
export type UserInput = z.infer<typeof userSchema>;
//# sourceMappingURL=user.schema.d.ts.map