import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from './dtos/create.transaction.dto';
import { FilterTransactionDto } from './dtos/filter-transaction.dto';
import { PaginationDto } from './dtos/paginatio.dto';
import { TransactionService } from './transaction.service';
import { NotificationEventsService } from '../modules/notifications/notification-events.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard) // Protège toutes les routes
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly notificationEvents: NotificationEventsService,
  ) {}

  @Post()
  async create(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const transaction = await this.transactionService.create(
      req.user.userId,
      createTransactionDto,
    );

    // Vérifier les différentes conditions pour les notifications
    await this.notificationEvents.checkBudgetLimit(transaction);
    await this.notificationEvents.checkLargeTransaction(transaction);
    await this.notificationEvents.checkRecurringExpenses(transaction);
    await this.notificationEvents.checkMonthlySavings(req.user.userId);

    return transaction;
  }

  @Get()
  async findAll(
    @Request() req,
    @Query() filters: FilterTransactionDto,
    @Query() pagination: PaginationDto,
  ) {
    console.log('Controller received query:', req.query);
    console.log('Parsed filters:', filters);
    console.log('Parsed pagination:', pagination);

    const result = await this.transactionService.findAll(
      req.user.userId,
      filters,
      pagination,
    );

    console.log('Service returned transactions:', result.data.length);
    return result;
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionService.findOne(req.user.userId, id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.update(
      req.user.userId,
      id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.transactionService.remove(req.user.userId, id);
  }
}
