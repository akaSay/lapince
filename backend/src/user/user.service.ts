import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteAccount(userId: string) {
    return await this.prisma.$transaction([
      // Supprimer dans l'ordre à cause des relations dans le schéma
      this.prisma.notification.deleteMany({
        where: { userId },
      }),
      this.prisma.transaction.deleteMany({
        where: { userId },
      }),
      this.prisma.budget.deleteMany({
        where: { userId },
      }),
      this.prisma.settings.delete({
        where: { userId },
      }),
      this.prisma.user.delete({
        where: { id: userId },
      }),
    ]);
  }
}
