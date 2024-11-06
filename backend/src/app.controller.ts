import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { NotificationEventsService } from './modules/notifications/notification-events.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly notificationEvents: NotificationEventsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('app-update')
  @UseGuards(JwtAuthGuard)
  async notifyUpdate(@Request() req, @Body() updateInfo: { version: string }) {
    await this.notificationEvents.notifyAppUpdate(
      req.user.userId,
      updateInfo.version,
    );
    return { message: 'Notification envoyée' };
  }
}
