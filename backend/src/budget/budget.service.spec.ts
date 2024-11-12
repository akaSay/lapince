import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetService,
        {
          provide: PrismaService,
          useValue: {
            budget: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createBudget', () => {
    it('should create a budget', async () => {
      const mockBudget = {
        id: '1',
        category: 'Food',
        limit: 300,
        userId: 'user1',
        icon: '🍕',
      };

      (prisma.budget.create as jest.Mock).mockResolvedValue(mockBudget);

      const result = await service.create('user1', {
        category: 'Food',
        limit: 300,
        icon: '🍕',
      });

      expect(result).toEqual(mockBudget);
    });
  });
});
