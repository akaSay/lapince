import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: string) {
    try {
      console.log(
        'GetSettings - Recherche des paramètres pour userId:',
        userId,
      );

      const settings = await this.prisma.settings.findUnique({
        where: { userId },
      });

      if (!settings) {
        console.log('Création des paramètres par défaut');

        const defaultSettings: Prisma.SettingsUncheckedCreateInput = {
          userId,
          theme: 'dark',
          language: 'fr',
          currency: 'EUR',
          notifications: {
            email: false,
            push: false,
            budget: false,
            weekly: false,
            monthly: false,
          },
          privacy: {
            showProfile: false,
            showStats: false,
            showBudget: false,
          },
          export: {
            format: 'csv',
            frequency: 'monthly',
          },
        };

        console.log('Données à créer:', defaultSettings);

        const createdSettings = await this.prisma.settings.create({
          data: defaultSettings,
        });

        return createdSettings;
      }

      return settings;
    } catch (error) {
      console.error('Erreur complète dans getSettings:', error);
      throw new InternalServerErrorException(
        `Erreur lors de la récupération des paramètres: ${error.message}`,
      );
    }
  }

  async updateSettings(userId: string, updateSettingsDto: UpdateSettingsDto) {
    try {
      const updateData: Prisma.SettingsUncheckedUpdateInput = {
        theme: updateSettingsDto.theme,
        language: updateSettingsDto.language,
        currency: updateSettingsDto.currency,
        notifications: updateSettingsDto.notifications,
        privacy: updateSettingsDto.privacy,
        export: updateSettingsDto.export,
      };

      return await this.prisma.settings.update({
        where: { userId },
        data: updateData,
      });
    } catch (error) {
      console.error('Erreur complète dans updateSettings:', error);
      throw new InternalServerErrorException(
        `Erreur lors de la mise à jour des paramètres: ${error.message}`,
      );
    }
  }
}
