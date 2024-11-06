import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './notification.types';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
    console.log('NotificationController initialized');
  }

  @Get()
  async findAll(@Request() req) {
    try {
      const notifications = await this.notificationService.findAllByUserId(
        req.user.userId,
      );

      return notifications.map((notification) => ({
        ...notification,
        createdAt: notification.createdAt
          ? new Date(notification.createdAt).toISOString()
          : null,
      }));
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  @Put(':id/read')
  async markAsRead(@Request() req, @Param('id') id: string) {
    try {
      const updated = await this.notificationService.markAsRead(
        id,
        req.user.userId,
      );
      return {
        ...updated,
        createdAt: updated.createdAt
          ? new Date(updated.createdAt).toISOString()
          : null,
      };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  @Put('read-all')
  async markAllAsRead(@Request() req) {
    try {
      const updated = await this.notificationService.markAllAsRead(
        req.user.userId,
      );
      return {
        ...updated,
      };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    try {
      return await this.notificationService.delete(id, req.user.userId);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  @Post()
  async create(
    @Request() req,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    try {
      const created = await this.notificationService.create(
        req.user.userId,
        createNotificationDto,
      );
      return {
        ...created,
        createdAt: created.createdAt
          ? new Date(created.createdAt).toISOString()
          : null,
      };
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }
}
