import * as z from "zod";

export const verifyEmailSchema = z.object({
    email: z
        .string()
        .min(1, "Your email is required")
        .pipe(z.email("Invalid email address")),
    code: z
        .string()
        .nonempty("Your OPT is required")
        .min(6,"Your OTP must be 6 numbers")
})

export type TVerifyEmailSchema = z.infer<typeof verifyEmailSchema>;



