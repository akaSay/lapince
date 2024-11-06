export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    currency: string;
    language: string;
    theme: "light" | "dark";
  };
  verificationStatus: {
    email: boolean;
    phone: boolean;
  };
}

export default User;
