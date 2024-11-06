export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  isRead: boolean;
  userId: string;
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  type: NotificationType;
}
