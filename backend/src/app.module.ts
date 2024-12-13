import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';
import { ExportController } from './export/export.controller';
import { NotificationModule } from './modules/notifications/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { SavingsModule } from './savings/savings.module';
import { SettingsModule } from './settings/settings.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    TransactionModule,
    BudgetModule,
    NotificationModule,
    SettingsModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'votre_secret_jwt',
      signOptions: { expiresIn: '1d' },
    }),
    SavingsModule,
  ],
  controllers: [AppController, ExportController],
  providers: [AppService],
})
export class AppModule {}
