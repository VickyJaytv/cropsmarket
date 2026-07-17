import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phoneNumber: z.ZodString;
    role: z.ZodEnum<{
        buyer: "buyer";
        farmer: "farmer";
        admin: "admin";
    }>;
    password: z.ZodString;
}, z.core.$strip>;
export type SignupDTO = z.infer<typeof signUpSchema>;
//# sourceMappingURL=user.schema.d.ts.map