export interface LoginResponse{
  success: boolean;
  message: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLoginAt: string;
    lastLoginIP: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken?: string;
}