'use server';
import { TEmailSchema } from "@/features/auth/schemas/email.schema";
import { TPasswordSchema } from "@/features/auth/schemas/password.schema";
import { TVerifyEmailSchema } from "@/features/auth/schemas/verify-email-schema";

// send email verify 
export async function sendEmailVerify(values:TEmailSchema) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });
      const payload = await response.json();
      return payload;
}

// confirm-email-verification
export async function confirmEmailVerify(values:TVerifyEmailSchema) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        code: values.code
      }),
    });
    const payload = await response.json();
    return payload;
}

// Register
export async function register(values:TPasswordSchema) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone
      }),
    });
    const payload = await response.json();
    return payload;
}