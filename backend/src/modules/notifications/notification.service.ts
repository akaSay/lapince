import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto } from './notification.types';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: string): Promise<Notification[]> {
    return await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(
    notificationId: string,
    userId: string,
  ): Promise<Notification> {
    return await this.prisma.notification.update({
      where: {
        id: notificationId,
        userId,
      },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    return await this.prisma.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });
  }

  async delete(notificationId: string, userId: string): Promise<Notification> {
    return await this.prisma.notification.delete({
      where: {
        id: notificationId,
        userId,
      },
    });
  }

  async create(
    userId: string,
    data: CreateNotificationDto,
  ): Promise<Notification> {
    return await this.prisma.notification.create({
      data: {
        ...data,
        userId,
        isRead: false,
      },
    });
  }
}
