import {
  Controller,
  Get,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private prisma: PrismaService) {}

  private formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  private formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  private translateType(type: string): string {
    return type === 'expense' ? 'Dépense' : 'Revenu';
  }

  private translateCategory(category: string): string {
    const categoryTranslations: Record<string, string> = {
      // Dépenses essentielles
      housing: 'Logement',
      utilities: 'Services publics',
      groceries: 'Courses',
      healthcare: 'Santé',
      insurance: 'Assurance',

      // Transport
      transport: 'Transport',
      fuel: 'Carburant',
      parking: 'Stationnement',
      publicTransport: 'Transport public',
      maintenance: 'Entretien',

      // Alimentation & Sorties
      food: 'Alimentation',
      restaurants: 'Restaurants',
      coffee: 'Café',
      bars: 'Bars',

      // Loisirs & Culture
      leisure: 'Loisirs',
      entertainment: 'Divertissement',
      sports: 'Sports',
      travel: 'Voyages',
      culture: 'Culture',

      // Éducation
      education: 'Éducation',
      training: 'Formation',
      books: 'Livres',

      // Shopping
      shopping: 'Shopping',
      clothing: 'Vêtements',
      electronics: 'Électronique',
      gifts: 'Cadeaux',

      // Bien-être
      wellness: 'Bien-être',
      beauty: 'Beauté',
      fitness: 'Fitness',

      // Services & Abonnements
      subscriptions: 'Abonnements',
      internet: 'Internet',
      streaming: 'Streaming',
      software: 'Logiciels',

      // Finances
      savings: 'Épargne',
      investments: 'Investissements',
      taxes: 'Impôts',
      fees: 'Frais bancaires',

      // Revenus
      salary: 'Salaire',
      freelance: 'Freelance',
      rental: 'Location',
      interests: 'Intérêts',
      other: 'Autre',
    };

    return categoryTranslations[category] || category;
  }

  @Get('transactions')
  async exportTransactions(@Request() req, @Res() res: Response) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: { date: 'desc' },
      select: {
        description: true,
        amount: true,
        date: true,
        category: true,
        type: true,
        categoryIcon: true,
      },
    });

    const csvHeader = 'Date, Description, Montant, Catégorie, Type\n';
    const csvContent = transactions
      .map((t) =>
        [
          this.formatDate(t.date),
          `"${t.description.replace(/"/g, '""')}"`,
          this.formatAmount(t.amount),
          this.translateCategory(t.category),
          this.translateType(t.type),
        ].join(', '),
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=transactions.csv',
    );
    return res.send(csvHeader + csvContent);
  }

  @Get('budgets')
  async exportBudgets(@Request() req, @Res() res: Response) {
    const budgets = await this.prisma.budget.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      select: {
        category: true,
        limit: true,
        icon: true,
        createdAt: true,
      },
    });

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: req.user.userId,
        type: 'expense',
      },
      select: {
        category: true,
        amount: true,
      },
    });

    const expensesByCategory = transactions.reduce(
      (acc, t) => {
        const translatedCategory = this.translateCategory(t.category);
        acc[translatedCategory] = (acc[translatedCategory] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const csvHeader =
      'Catégorie, Budget Prévu, Dépenses Actuelles, Reste Disponible, Date de création\n';
    const csvContent = budgets
      .map((b) => {
        const translatedCategory = this.translateCategory(b.category);
        const spent = expensesByCategory[translatedCategory] || 0;
        const remaining = b.limit - spent;
        return [
          translatedCategory,
          this.formatAmount(b.limit),
          this.formatAmount(spent),
          this.formatAmount(remaining),
          this.formatDate(b.createdAt),
        ].join(', ');
      })
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=budgets.csv');
    return res.send(csvHeader + csvContent);
  }
}
