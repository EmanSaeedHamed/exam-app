'use server';
import { getNextAuthToken } from "../../utils/get-token.util";

//! Delete own account 
export async function deleteAccount() {
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token?.token}`
        }
      });
      const payload = await response.json();
      return payload;
}