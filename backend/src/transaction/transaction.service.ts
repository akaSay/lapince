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
    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(filters?.startDate &&
        filters?.endDate && {
          date: {
            gte: new Date(filters.startDate),
            lte: new Date(filters.endDate),
          },
        }),
      ...(filters?.category && {
        category: filters.category,
      }),
      ...(filters?.type && {
        type: filters.type,
      }),
      ...(filters?.minAmount && {
        amount: {
          gte: filters.minAmount,
        },
      }),
      ...(filters?.maxAmount && {
        amount: {
          lte: filters.maxAmount,
        },
      }),
    };

    // Calculer le skip pour la pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    // Récupérer les données et le total
    const [data, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        orderBy: {
          date: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    // Calculer les métadonnées de pagination
    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1,
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
