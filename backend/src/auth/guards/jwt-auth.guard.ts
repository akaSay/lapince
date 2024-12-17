import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Vérifier les cookies
    const token = request.cookies?.vercel_jwt;
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }

    return super.canActivate(context);
  }
}
