export interface SettingsData {
  theme: string;
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    budget: boolean;
    weekly: boolean;
    monthly: boolean;
  };
  privacy: {
    showProfile: boolean;
    showStats: boolean;
    showBudget: boolean;
  };
  export: {
    format: string;
    frequency: string;
  };
}
