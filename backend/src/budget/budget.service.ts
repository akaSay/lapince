import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dtos/create-budget.dto';
import { Budget } from '@prisma/client';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        ...createBudgetDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    const budgets = await this.prisma.budget.findMany({
      where: { userId },
    });

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        type: 'expense',
      },
    });

    return this.mapBudgetsWithSpent(budgets, transactions);
  }

  async findOne(userId: string, id: string) {
    const budget = await this.prisma.budget.findFirst({
      where: { id, userId },
    });

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        category: budget.category,
        type: 'expense',
      },
    });

    return this.mapBudgetWithSpent(budget, transactions);
  }

  update(userId: string, id: string, updateBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.update({
      where: {
        id,
        userId,
      },
      data: updateBudgetDto,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.budget.delete({
      where: {
        id,
        userId,
      },
    });
  }

  private mapBudgetsWithSpent(budgets: Budget[], transactions: any[]) {
    return budgets.map((budget) => {
      const budgetTransactions = transactions.filter(
        (transaction) => transaction.category === budget.category,
      );
      return this.mapBudgetWithSpent(budget, budgetTransactions);
    });
  }

  private mapBudgetWithSpent(budget: Budget, transactions: any[]) {
    const spent = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    return {
      ...budget,
      spent,
      remaining: budget.limit - spent,
      percentageUsed: (spent / budget.limit) * 100,
    };
  }
}
