import * as z from "zod";

export const otpSchema = z.object({
    code: z
        .string()
        .nonempty("Your OPT is required")
        .min(6,"Your OTP must be 6 numbers")
})

export type TOtpSchema = z.infer<typeof otpSchema>;
