import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  private readonly logger = new Logger(SettingsController.name);

  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Request() req) {
    this.logger.debug(`Getting settings for user ${req.user.userId}`);
    return this.settingsService.getSettings(req.user.userId);
  }

  @Patch()
  async updateSettings(
    @Request() req,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    this.logger.debug(`Updating settings for user ${req.user.userId}`);
    return this.settingsService.updateSettings(
      req.user.userId,
      updateSettingsDto,
    );
  }
}
