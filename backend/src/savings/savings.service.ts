import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavingsService {
  constructor(private prisma: PrismaService) {}

  async getSavingsGoal(userId: string, month: string) {
    const savings = await this.prisma.savingsGoal.findUnique({
      where: {
        userId_month: {
          userId,
          month,
        },
      },
    });

    if (!savings) {
      return this.prisma.savingsGoal.create({
        data: {
          userId,
          month,
          target: 1000, // valeur par défaut
          current: 0,
        },
      });
    }

    return savings;
  }

  async updateSavingsGoal(
    userId: string,
    month: string,
    data: { target?: number; current?: number },
  ) {
    return this.prisma.savingsGoal.upsert({
      where: {
        userId_month: {
          userId,
          month,
        },
      },
      update: data,
      create: {
        userId,
        month,
        target: data.target ?? 1000,
        current: data.current ?? 0,
      },
    });
  }
}
