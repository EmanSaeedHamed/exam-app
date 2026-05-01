'use server';

import { TNewEmailSchema } from "@/features/account-settings/schemas/new-email.schema";
import { getNextAuthToken } from "../../utils/get-token.util";

// new email verify 
export async function newEmailVerify(values:TNewEmailSchema) {
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify({
          newEmail: values.newEmail,
        }),
      });
      const payload = await response.json();
      return payload;
}