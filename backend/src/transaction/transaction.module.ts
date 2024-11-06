import { Module } from '@nestjs/common';
import { NotificationModule } from '../modules/notifications/notification.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
