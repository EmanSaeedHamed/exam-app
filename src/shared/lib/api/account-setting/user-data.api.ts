'use server';
import { UserProfileResponse } from "../../types/user-profile-data";
import { getNextAuthToken } from "../../utils/get-token.util";

// Get current user profile 
export async function getUserProfile() :Promise<UserProfileResponse> {
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token?.token}`
        }
      });
      const payload = await response.json();
      return payload;
}