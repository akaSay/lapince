import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SavingsService } from './savings.service';

@Controller('savings-goals')
@UseGuards(JwtAuthGuard)
export class SavingsController {
  constructor(private savingsService: SavingsService) {}

  @Get(':month')
  async getSavingsGoal(@Request() req, @Param('month') month: string) {
    console.log('Getting savings goal for month:', month); // Debug log
    return this.savingsService.getSavingsGoal(req.user.userId, month);
  }

  @Patch(':month')
  async updateSavingsGoal(
    @Request() req,
    @Param('month') month: string,
    @Body() data: { target?: number; current?: number },
  ) {
    console.log('Updating savings goal:', { month, data }); // Debug log
    return this.savingsService.updateSavingsGoal(req.user.userId, month, data);
  }
}
