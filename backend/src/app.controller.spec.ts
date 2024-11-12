import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationEventsService } from './modules/notifications/notification-events.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
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

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
