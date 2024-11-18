import { Controller, Delete, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('me')
  async deleteAccount(@Request() req) {
    await this.userService.deleteAccount(req.user.userId);
    return { message: 'Account deleted successfully' };
  }
}
