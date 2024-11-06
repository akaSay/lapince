import api from "../lib/api";

export const notificationService = {
  async subscribeToNotifications() {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  },

  async sendEmailNotification(userId: string, message: string) {
    return api.post("/notifications/email", { userId, message });
  },

  async sendPushNotification(userId: string, message: string) {
    return api.post("/notifications/push", { userId, message });
  },

  async sendBudgetAlert(userId: string, budgetInfo: any) {
    return api.post("/notifications/budget-alert", { userId, budgetInfo });
  },

  async sendWeeklySummary(userId: string) {
    return api.post("/notifications/weekly-summary", { userId });
  },

  async sendMonthlySummary(userId: string) {
    return api.post("/notifications/monthly-summary", { userId });
  },
};
