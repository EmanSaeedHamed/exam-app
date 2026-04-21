
import * as z from "zod";
export const userInfoSchema = z.object({
    username: z.string().nonempty("Your username is required").min(3,"min legth is 3 characters").max(15,"max length is 15 characters"),
    firstName: z.string().nonempty("Your username is required").min(3,"min legth is 3 characters").max(15,"max length is 15 characters"),
    lastName: z.string().nonempty("Your username is required").min(3,"min legth is 3 characters").max(15,"max length is 15 characters"),
    phone: z.string().nonempty("Your phone number is required").regex(/^\+201[0125][0-9]{8}$/, "must be egyptian number")

})

export type TUserInfoSchema = z.infer<typeof userInfoSchema>;



