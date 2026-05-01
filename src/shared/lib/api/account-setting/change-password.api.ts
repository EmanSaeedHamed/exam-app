'use server';
import { getNextAuthToken } from "../../utils/get-token.util";
import { TChangePasswordSchema } from "@/features/account-settings/schemas/change-password.schema";

//* Change password (authenticated)
export async function changePassword(values:TChangePasswordSchema) {
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword

        }),
      });
      const payload = await response.json();
      return payload;
}