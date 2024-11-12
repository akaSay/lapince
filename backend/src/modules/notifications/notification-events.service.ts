import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationEventsService {
  constructor(
    private notificationService: NotificationService,
    private prisma: PrismaService,
  ) {}

  // Notification pour mise à jour de l'application
  async notifyAppUpdate(userId: string, version: string) {
    await this.notificationService.create(userId, {
      title: 'Nouvelle mise à jour',
      message: `L'application a été mise à jour vers la version ${version}`,
      type: 'info',
    });
  }

  // Notification pour approche de la limite du budget
  async checkBudgetLimit(transaction: Transaction) {
    const budget = await this.prisma.budget.findFirst({
      where: {
        userId: transaction.userId,
        category: transaction.category,
      },
    });

    if (!budget) return;

    // Calculer le total des dépenses pour cette catégorie
    const totalExpenses = await this.prisma.transaction.aggregate({
      where: {
        userId: transaction.userId,
        category: transaction.category,
        type: 'expense',
      },
      _sum: {
        amount: true,
      },
    });

    const total = totalExpenses._sum.amount || 0;
    const limitPercentage = (total / budget.limit) * 100;

    // Notification à 80% du budget
    if (limitPercentage >= 80 && limitPercentage < 100) {
      await this.notificationService.create(transaction.userId, {
        title: 'Attention au budget !',
        message: `Vous avez atteint ${Math.round(limitPercentage)}% de votre budget "${
          transaction.category
        }"`,
        type: 'warning',
      });
    }

    // Notification de dépassement
    if (limitPercentage >= 100) {
      await this.notificationService.create(transaction.userId, {
        title: 'Budget dépassé !',
        message: `Vous avez dépassé votre budget "${transaction.category}" de ${Math.round(
          limitPercentage - 100,
        )}%`,
        type: 'error',
      });
    }
  }

  // Notification pour les transactions importantes
  async checkLargeTransaction(transaction: Transaction) {
    if (transaction.type === 'expense' && transaction.amount > 1000) {
      await this.notificationService.create(transaction.userId, {
        title: 'Transaction importante détectée',
        message: `Une dépense importante de ${transaction.amount}€ a été enregistrée`,
        type: 'warning',
      });
    }
  }

  // Notification pour les dépenses récurrentes
  async checkRecurringExpenses(transaction: Transaction) {
    const similarTransactions = await this.prisma.transaction.findMany({
      where: {
        userId: transaction.userId,
        category: transaction.category,
        description: transaction.description,
        type: 'expense',
      },
      orderBy: {
        date: 'desc',
      },
      take: 3,
    });

    if (similarTransactions.length >= 3) {
      await this.notificationService.create(transaction.userId, {
        title: 'Dépense récurrente détectée',
        message: `Vous avez effectué plusieurs paiements similaires pour "${transaction.description}"`,
        type: 'info',
      });
    }
  }

  // Notification pour les économies réalisées
  async checkMonthlySavings(userId: string) {
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const transactions = await this.prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId,
        date: {
          gte: firstDayOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const income =
      transactions.find((t) => t.type === 'income')?._sum.amount || 0;
    const expenses =
      transactions.find((t) => t.type === 'expense')?._sum.amount || 0;
    const savings = income - expenses;

    if (savings > 0) {
      await this.notificationService.create(userId, {
        title: 'Félicitations !',
        message: `Vous avez économisé ${savings}€ ce mois-ci !`,
        type: 'success',
      });
    }
  }
}
