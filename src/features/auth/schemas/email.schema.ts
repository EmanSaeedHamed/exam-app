import * as z from "zod";

export const emailSchema = z.object({
    email: z
        .string()
        .min(1, "Your email is required")
        .pipe(z.email("Invalid email address")),
})

export type TEmailSchema = z.infer<typeof emailSchema>;

//^ >>
export const forgotPasswordEmailSchema = z.object({
    email: z
        .string()
        .min(1, "Your email is required")
        .pipe(z.email("Invalid email address")),
        
    redirectUrl: z
        .string()
})

export type TForgotPasswordEmailSchema = z.infer<typeof forgotPasswordEmailSchema>;




