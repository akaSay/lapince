import { Test, TestingModule } from '@nestjs/testing';
import { NotificationEventsService } from './notification-events.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from './notification.service';
import { Transaction } from '@prisma/client';

describe('NotificationEventsService', () => {
  let service: NotificationEventsService;
  let prismaService: PrismaService;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationEventsService,
        {
          provide: PrismaService,
          useValue: {
            transaction: {
              findMany: jest.fn(),
              groupBy: jest.fn(),
              aggregate: jest.fn(),
            },
            budget: {
              findFirst: jest.fn(),
            },
          },
        },
        {
          provide: NotificationService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationEventsService>(NotificationEventsService);
    prismaService = module.get<PrismaService>(PrismaService);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  describe('checkLargeTransaction', () => {
    it('should create notification for large expenses', async () => {
      const transaction = {
        id: '1',
        amount: 1500,
        type: 'expense',
        userId: 'user1',
        category: 'Shopping',
        description: 'Large purchase',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Transaction;

      await service.checkLargeTransaction(transaction);

      expect(notificationService.create).toHaveBeenCalledWith(
        'user1',
        expect.objectContaining({
          type: 'warning',
          title: 'Transaction importante détectée',
          message: expect.stringContaining('1500€'),
        }),
      );
    });

    it('should not create notification for small expenses', async () => {
      const transaction = {
        id: '1',
        amount: 500,
        type: 'expense',
        userId: 'user1',
        category: 'Food',
        description: 'Groceries',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Transaction;

      await service.checkLargeTransaction(transaction);

      expect(notificationService.create).not.toHaveBeenCalled();
    });
  });

  describe('checkBudgetLimit', () => {
    it('should create notification when budget limit is exceeded', async () => {
      const currentDate = new Date();
      const transaction = {
        id: '1',
        amount: 300,
        type: 'expense',
        userId: 'user1',
        category: 'Food',
        description: 'Groceries',
        date: currentDate,
        createdAt: currentDate,
        updatedAt: currentDate,
      } as Transaction;

      const mockBudget = {
        id: '1',
        limit: 1000,
        category: 'Food',
        userId: 'user1',
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      };

      (prismaService.budget.findFirst as jest.Mock).mockResolvedValue(
        mockBudget,
      );
      (prismaService.transaction.aggregate as jest.Mock).mockResolvedValue({
        _sum: {
          amount: 800,
        },
      });

      await service.checkBudgetLimit(transaction);

      expect(notificationService.create).toHaveBeenCalledWith('user1', {
        type: 'warning',
        title: 'Attention au budget !',
        message: 'Vous avez atteint 80% de votre budget "Food"',
      });
    });

    it('should not create notification when within budget', async () => {
      const currentDate = new Date();
      const transaction = {
        id: '1',
        amount: 100,
        type: 'expense',
        userId: 'user1',
        category: 'Food',
        description: 'Groceries',
        date: currentDate,
        createdAt: currentDate,
        updatedAt: currentDate,
      } as Transaction;

      const mockBudget = {
        id: '1',
        limit: 1000,
        category: 'Food',
        userId: 'user1',
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      };

      (prismaService.budget.findFirst as jest.Mock).mockResolvedValue(
        mockBudget,
      );
      (prismaService.transaction.aggregate as jest.Mock).mockResolvedValue({
        _sum: {
          amount: 500,
        },
      });

      await service.checkBudgetLimit(transaction);

      expect(notificationService.create).not.toHaveBeenCalled();
    });
  });

  describe('checkRecurringExpenses', () => {
    it('should detect recurring expenses', async () => {
      const transaction = {
        id: '1',
        amount: 100,
        type: 'expense',
        userId: 'user1',
        category: 'Subscription',
        description: 'Netflix',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Transaction;

      const mockSimilarTransactions = Array(3).fill({ ...transaction });
      (prismaService.transaction.findMany as jest.Mock).mockResolvedValue(
        mockSimilarTransactions,
      );

      await service.checkRecurringExpenses(transaction);

      expect(notificationService.create).toHaveBeenCalledWith(
        'user1',
        expect.objectContaining({
          type: 'info',
          title: expect.any(String),
        }),
      );
    });
  });

  describe('checkMonthlySavings', () => {
    it('should calculate and notify positive savings', async () => {
      (prismaService.transaction.groupBy as jest.Mock).mockResolvedValue([
        { type: 'income', _sum: { amount: 3000 } },
        { type: 'expense', _sum: { amount: 2000 } },
      ]);

      await service.checkMonthlySavings('user1');

      expect(notificationService.create).toHaveBeenCalledWith(
        'user1',
        expect.objectContaining({
          type: 'success',
          title: 'Félicitations !',
          message: expect.stringContaining('1000€'),
        }),
      );
    });

    it('should not notify when no savings', async () => {
      (prismaService.transaction.groupBy as jest.Mock).mockResolvedValue([
        { type: 'income', _sum: { amount: 2000 } },
        { type: 'expense', _sum: { amount: 2000 } },
      ]);

      await service.checkMonthlySavings('user1');

      expect(notificationService.create).not.toHaveBeenCalled();
    });
  });
});
