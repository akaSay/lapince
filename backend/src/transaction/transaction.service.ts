import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dtos/create.transaction.dto';
import { FilterTransactionDto } from './dtos/filter-transaction.dto';
import { PaginatedResponse } from './dtos/paginated-response.interface';
import { PaginationDto } from './dtos/paginatio.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        userId,
      },
    });
  }

  async findAll(
    userId: string,
    filters?: FilterTransactionDto,
    pagination?: PaginationDto,
  ): Promise<PaginatedResponse<Transaction>> {
    console.log('Service received filters:', filters);

    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    if (filters?.startDate && filters?.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      console.log('Date filter:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        startDateType: typeof startDate,
        endDateType: typeof endDate,
      });

      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    console.log('Final where clause:', JSON.stringify(where, null, 2));

    const data = await this.prisma.transaction.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
      skip: pagination?.skip,
      take: pagination?.take,
    });

    console.log('Found transactions:', {
      count: data.length,
      dates: data.map((t) => t.date),
    });

    const total = await this.prisma.transaction.count({ where });

    return {
      data,
      meta: {
        total,
        page: pagination?.page || 1,
        lastPage: Math.ceil(total / (pagination?.take || 10)),
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  findOne(userId: string, id: string) {
    return this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  update(userId: string, id: string, dto: CreateTransactionDto) {
    return this.prisma.transaction.update({
      where: {
        id,
        userId,
      },
      data: dto,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.transaction.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
