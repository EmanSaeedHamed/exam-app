export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  status: boolean;
  code: number;
  payload: {
    user: User;
  };
}