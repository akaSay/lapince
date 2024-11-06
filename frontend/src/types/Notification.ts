export type NotificationType = "info" | "warning" | "success" | "error";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: Date;
  isRead: boolean;
  link?: string; // Lien optionnel pour rediriger l'utilisateur
}
