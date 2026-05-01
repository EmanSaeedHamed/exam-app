import * as z from "zod";

export const newEmailSchema = z.object({
    newEmail: z
        .string()
        .min(1, "Your email is required")
        .pipe(z.email("Invalid email address")),
})

export type TNewEmailSchema = z.infer<typeof newEmailSchema>;