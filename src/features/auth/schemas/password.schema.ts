import * as z from "zod";

export const passwordSchema = z.object({
    password: z.string().nonempty("Your password is required").min(6,"min legth is 6 characters"),
    confirmPassword: z.string().nonempty("Your confirm password is required"),
    username: z.string().nonempty("Your username is required").min(3,"min legth is 3 characters").max(15,"max length is 15 characters"),
    firstName: z.string().nonempty("Your username is required").min(3,"min legth is 3 characters").max(15,"max length is 15 characters"),
    lastName: z.string().nonempty("Your username is required").min(3,"min legth is 3 characters").max(15,"max length is 15 characters"),
    phone: z.string().nonempty("Your phone number is required").regex(/^\+201[0125][0-9]{8}$/, "must be egyptian number"),
    email: z
        .string()
        .min(1, "Your email is required")
        .pipe(z.email("Invalid email address"))

}).refine((obj)=>{
    return obj.password === obj.confirmPassword
}, {
    error: "password and confirm password not matched",
    path: ["confirmPassword"]
})

export type TPasswordSchema = z.infer<typeof passwordSchema>;



