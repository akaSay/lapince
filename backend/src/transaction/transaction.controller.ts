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

@Controller('transactions')
@UseGuards(JwtAuthGuard) // Protège toutes les routes
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    console.log('Creating transaction:', createTransactionDto);
    console.log('User:', req.user);
    return this.transactionService.create(
      req.user.userId,
      createTransactionDto,
    );
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
