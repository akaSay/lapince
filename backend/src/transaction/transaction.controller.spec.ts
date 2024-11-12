import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { NotificationEventsService } from '../modules/notifications/notification-events.service';
import {
  CreateTransactionDto,
  TransactionType,
} from './dtos/create.transaction.dto';
import { FilterTransactionDto } from './dtos/filter-transaction.dto';
import { PaginationDto } from './dtos/paginatio.dto';

describe('TransactionController', () => {
  let controller: TransactionController;
  let transactionService: TransactionService;
  let notificationEvents: NotificationEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: NotificationEventsService,
          useValue: {
            checkBudgetLimit: jest.fn(),
            checkLargeTransaction: jest.fn(),
            checkRecurringExpenses: jest.fn(),
            checkMonthlySavings: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    transactionService = module.get<TransactionService>(TransactionService);
    notificationEvents = module.get<NotificationEventsService>(
      NotificationEventsService,
    );
  });

  describe('create', () => {
    it('should create a transaction and trigger notifications', async () => {
      const dto: CreateTransactionDto = {
        amount: 100,
        type: TransactionType.EXPENSE,
        category: 'Food',
        date: new Date().toISOString(),
        description: 'Test',
      };

      const mockTransaction = { id: '1', ...dto, userId: 'user1' };
      (transactionService.create as jest.Mock).mockResolvedValue(
        mockTransaction,
      );

      const result = await controller.create(
        { user: { userId: 'user1' } },
        dto,
      );

      expect(result).toEqual(mockTransaction);
      expect(notificationEvents.checkBudgetLimit).toHaveBeenCalledWith(
        mockTransaction,
      );
      expect(notificationEvents.checkLargeTransaction).toHaveBeenCalledWith(
        mockTransaction,
      );
      expect(notificationEvents.checkRecurringExpenses).toHaveBeenCalledWith(
        mockTransaction,
      );
      expect(notificationEvents.checkMonthlySavings).toHaveBeenCalledWith(
        'user1',
      );
    });
  });

  describe('findAll', () => {
    it('should return filtered and paginated transactions', async () => {
      const mockTransactions = {
        data: [
          {
            id: '1',
            amount: 100,
            type: TransactionType.EXPENSE,
            category: 'Food',
            date: new Date(),
            description: 'Test',
            userId: 'user1',
          },
        ],
        meta: {
          total: 1,
          page: 1,
          lastPage: 1,
        },
      };

      (transactionService.findAll as jest.Mock).mockResolvedValue(
        mockTransactions,
      );

      const filters: FilterTransactionDto = {
        type: TransactionType.EXPENSE,
        category: 'Food',
      };

      const pagination: PaginationDto = {
        page: 1,
        limit: 10,
        skip: 0,
        take: 10,
      };

      const result = await controller.findAll(
        { user: { userId: 'user1' }, query: {} },
        filters,
        pagination,
      );

      expect(result).toEqual(mockTransactions);
    });
  });

  describe('findOne', () => {
    it('should return a single transaction', async () => {
      const mockTransaction = {
        id: '1',
        amount: 100,
        type: TransactionType.EXPENSE,
        category: 'Food',
        date: new Date(),
        description: 'Test',
        userId: 'user1',
      };

      (transactionService.findOne as jest.Mock).mockResolvedValue(
        mockTransaction,
      );

      const result = await controller.findOne(
        { user: { userId: 'user1' } },
        '1',
      );
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const dto: CreateTransactionDto = {
        amount: 150,
        type: TransactionType.EXPENSE,
        category: 'Food',
        date: new Date().toISOString(),
        description: 'Updated test',
      };

      const mockTransaction = { id: '1', ...dto, userId: 'user1' };
      (transactionService.update as jest.Mock).mockResolvedValue(
        mockTransaction,
      );

      const result = await controller.update(
        { user: { userId: 'user1' } },
        '1',
        dto,
      );

      expect(result).toEqual(mockTransaction);
    });
  });

  describe('remove', () => {
    it('should delete a transaction', async () => {
      const mockTransaction = {
        id: '1',
        amount: 100,
        type: TransactionType.EXPENSE,
        userId: 'user1',
      };

      (transactionService.remove as jest.Mock).mockResolvedValue(
        mockTransaction,
      );

      const result = await controller.remove(
        { user: { userId: 'user1' } },
        '1',
      );
      expect(result).toEqual(mockTransaction);
    });
  });
});
