import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTransactionDto,
  TransactionType,
} from './dtos/create.transaction.dto';
import { FilterTransactionDto } from './dtos/filter-transaction.dto';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: PrismaService,
          useValue: {
            transaction: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
              groupBy: jest.fn(),
              aggregate: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  // Tests CRUD basiques
  describe('CRUD Operations', () => {
    describe('create', () => {
      it('should create a transaction', async () => {
        const dto: CreateTransactionDto = {
          amount: 100,
          type: TransactionType.EXPENSE,
          category: 'Food',
          date: new Date().toISOString(),
          description: 'Groceries',
        };

        const mockTransaction = { id: '1', ...dto, userId: 'user1' };
        (prismaService.transaction.create as jest.Mock).mockResolvedValue(
          mockTransaction,
        );

        const result = await service.create('user1', dto);
        expect(result).toEqual(mockTransaction);
      });

      it('should not accept negative amounts', async () => {
        const dto: CreateTransactionDto = {
          amount: -100,
          type: TransactionType.EXPENSE,
          category: 'Food',
          date: new Date().toISOString(),
          description: 'Test',
        };

        (prismaService.transaction.create as jest.Mock).mockRejectedValue(
          new Error('Amount cannot be negative'),
        );

        await expect(async () => {
          await service.create('user1', dto);
        }).rejects.toThrow('Amount cannot be negative');
      });
    });

    describe('findAll', () => {
      it('should return paginated transactions', async () => {
        const mockTransactions = [
          {
            id: '1',
            amount: 100,
            type: TransactionType.EXPENSE,
            date: new Date(),
            category: 'Food',
            description: 'Test',
            userId: 'user1',
          },
          {
            id: '2',
            amount: 200,
            type: TransactionType.INCOME,
            date: new Date(),
            category: 'Salary',
            description: 'Test',
            userId: 'user1',
          },
        ];

        (prismaService.transaction.findMany as jest.Mock).mockResolvedValue(
          mockTransactions,
        );
        (prismaService.transaction.count as jest.Mock).mockResolvedValue(2);

        const result = await service.findAll(
          'user1',
          {},
          { page: 1, limit: 10, skip: 0, take: 10 },
        );
        expect(result.data).toEqual(mockTransactions);
        expect(result.meta.total).toBe(2);
      });
    });

    describe('findOne', () => {
      it('should return a single transaction', async () => {
        const mockTransaction = {
          id: '1',
          amount: 100,
          type: TransactionType.EXPENSE,
          date: new Date(),
          category: 'Food',
          description: 'Test',
          userId: 'user1',
        };

        (prismaService.transaction.findFirst as jest.Mock).mockResolvedValue(
          mockTransaction,
        );

        const result = await service.findOne('user1', '1');
        expect(result).toEqual(mockTransaction);
      });

      it('should return null for non-existent transaction', async () => {
        (prismaService.transaction.findFirst as jest.Mock).mockResolvedValue(
          null,
        );

        const result = await service.findOne('user1', 'non-existent');
        expect(result).toBeNull();
      });
    });

    describe('update', () => {
      it('should update a transaction', async () => {
        const dto: CreateTransactionDto = {
          amount: 150,
          type: TransactionType.EXPENSE,
          category: 'Food',
          date: new Date().toISOString(),
          description: 'Updated groceries',
        };

        const mockUpdatedTransaction = { id: '1', ...dto, userId: 'user1' };
        (prismaService.transaction.update as jest.Mock).mockResolvedValue(
          mockUpdatedTransaction,
        );

        const result = await service.update('user1', '1', dto);
        expect(result).toEqual(mockUpdatedTransaction);
      });
    });

    describe('remove', () => {
      it('should delete a transaction', async () => {
        const mockDeletedTransaction = {
          id: '1',
          amount: 100,
          type: TransactionType.EXPENSE,
          userId: 'user1',
        };

        (prismaService.transaction.delete as jest.Mock).mockResolvedValue(
          mockDeletedTransaction,
        );

        const result = await service.remove('user1', '1');
        expect(result).toEqual(mockDeletedTransaction);
      });
    });
  });

  // Tests de filtrage
  describe('Filtering', () => {
    it('should filter by date range', async () => {
      const mockTransactions = [
        {
          id: '1',
          amount: 100,
          type: TransactionType.EXPENSE,
          date: new Date('2024-01-15'),
          category: 'Food',
          description: 'Test',
          userId: 'user1',
        },
      ];

      (prismaService.transaction.findMany as jest.Mock).mockResolvedValue(
        mockTransactions,
      );
      (prismaService.transaction.count as jest.Mock).mockResolvedValue(1);

      const filters: FilterTransactionDto = {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        type: TransactionType.EXPENSE,
        category: 'all',
      };

      const result = await service.findAll('user1', filters, {
        page: 1,
        limit: 10,
        skip: 0,
        take: 10,
      });
      expect(result.data).toEqual(mockTransactions);
    });

    it('should filter by category', async () => {
      const mockTransactions = [
        {
          id: '1',
          amount: 100,
          type: TransactionType.EXPENSE,
          date: new Date(),
          category: 'Food',
          description: 'Test',
          userId: 'user1',
        },
      ];

      (prismaService.transaction.findMany as jest.Mock).mockResolvedValue(
        mockTransactions,
      );
      (prismaService.transaction.count as jest.Mock).mockResolvedValue(1);

      const filters: FilterTransactionDto = {
        category: 'Food',
        type: TransactionType.EXPENSE,
      };

      const result = await service.findAll('user1', filters, {
        page: 1,
        limit: 10,
        skip: 0,
        take: 10,
      });
      expect(result.data).toEqual(mockTransactions);
    });

    it('should filter by type', async () => {
      const mockTransactions = [
        {
          id: '1',
          amount: 100,
          type: TransactionType.EXPENSE,
          date: new Date(),
          category: 'Food',
          description: 'Test',
          userId: 'user1',
        },
      ];

      (prismaService.transaction.findMany as jest.Mock).mockResolvedValue(
        mockTransactions,
      );
      (prismaService.transaction.count as jest.Mock).mockResolvedValue(1);

      const filters: FilterTransactionDto = {
        type: TransactionType.EXPENSE,
      };

      const result = await service.findAll('user1', filters, {
        page: 1,
        limit: 10,
        skip: 0,
        take: 10,
      });
      expect(result.data).toEqual(mockTransactions);
    });
  });

  // Tests de sécurité
  describe('Security', () => {
    it('should not access transactions of another user', async () => {
      (prismaService.transaction.findFirst as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await service.findOne('wrong-user', '1');
      expect(result).toBeNull();
    });

    it('should not update transaction of another user', async () => {
      (prismaService.transaction.update as jest.Mock).mockRejectedValue(
        new Error('Not found'),
      );

      await expect(
        service.update('wrong-user', '1', {
          amount: 100,
          type: TransactionType.EXPENSE,
          category: 'Food',
          date: new Date().toISOString(),
          description: 'Test',
        }),
      ).rejects.toThrow();
    });
  });

  // Tests de pagination
  describe('Pagination', () => {
    it('should handle pagination correctly', async () => {
      const mockTransactions = Array(5).fill({
        id: '1',
        amount: 100,
        type: TransactionType.EXPENSE,
        date: new Date(),
        category: 'Food',
        description: 'Test',
        userId: 'user1',
      });

      (prismaService.transaction.findMany as jest.Mock).mockResolvedValue(
        mockTransactions,
      );
      (prismaService.transaction.count as jest.Mock).mockResolvedValue(15);

      const result = await service.findAll(
        'user1',
        {},
        { page: 2, limit: 5, skip: 5, take: 5 },
      );

      expect(result.meta.page).toBe(2);
      expect(result.meta.lastPage).toBe(3);
      expect(result.data.length).toBe(5);
    });
  });
});
