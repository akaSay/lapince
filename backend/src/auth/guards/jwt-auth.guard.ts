import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log('Cookies:', request.cookies);
    console.log('Headers:', request.headers);

    // Vérifier les cookies
    const token = request.cookies?.vercel_jwt;
    if (token) {
      console.log('Token found in cookies');
      request.headers.authorization = `Bearer ${token}`;
    } else {
      console.log('No token found in cookies');
    }

    return super.canActivate(context);
  }
}
