export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    currency?: string;
    language?: string;
    theme?: "light" | "dark";
  };
  verificationStatus: {
    email: boolean;
    phone: boolean;
  };
}

export interface ProfileFormData {
  firstName: string;
  lastName?: string;
  email: string;
  language: string;
}

export interface ProfileUpdateData {
  name: string;
  email: string;
}

export default User;
