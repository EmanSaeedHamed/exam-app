import * as z from "zod";
//^ change password
export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty("Your current password is required").min(6,"min legth is 6 characters"),
    newPassword: z.string().nonempty("Your new password is required").min(6,"min legth is 6 characters"),
    confirmPassword: z.string().nonempty("Your confirm password is required"),
}).refine((obj)=>{
    return obj.newPassword === obj.confirmPassword
}, {
    error: "password and confirm password not matched",
    path: ["confirmPassword"]
})

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>; 