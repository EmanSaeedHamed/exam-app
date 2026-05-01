'use server';
import { TOtpSchema } from "@/features/account-settings/schemas/otp.schema";
import { getNextAuthToken } from "../../utils/get-token.util";
import { UserProfileResponse } from "../../types/user-profile-data";

// Confirm email change with code "opt"
export async function changeEmailWithOtp(values:TOtpSchema) :Promise<UserProfileResponse>{
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify({
          code: values.code,
        }),
      });
      const payload = await response.json();
      return payload;
}