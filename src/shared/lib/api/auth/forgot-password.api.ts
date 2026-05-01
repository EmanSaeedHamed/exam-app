'use server';
import { TForgotPasswordEmailSchema } from "@/features/auth/schemas/email.schema";
import { ForgotPasswordResponse } from "../../types/forgot-password";
import { TResetPasswordSchema } from "@/features/auth/schemas/password.schema";

//^ send email verify 
export async function sendEmailForgotPassword(values:TForgotPasswordEmailSchema):Promise<ForgotPasswordResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          redirectUrl: values.redirectUrl
        }),
      });
      const payload = await response.json();
      return payload;
}

//^ Reset password using token from forgot-password
export async function resetPassword(values:TResetPasswordSchema):Promise<ForgotPasswordResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          confirmPassword: values.confirmPassword,
          newPassword: values.newPassword,
          token: values.token
        }),
      });
      const payload = await response.json();
      return payload;
}