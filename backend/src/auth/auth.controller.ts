import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(registerDto);

    // Utiliser le même nom de cookie que pour le login
    response.cookie('vercel_jwt', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return {
      user: result.user,
      message: 'Registration successful',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const tokens = await this.authService.login(loginDto);

      // Configuration des cookies pour la production avec Cloudflare
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
        path: '/',
        domain: 'lapince-api.onrender.com', // Domaine explicite
      };

      // Définir les cookies avec les nouvelles options
      response.cookie('vercel_jwt', tokens.access_token, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      // Log pour débogger
      console.log('Setting cookies with options:', cookieOptions);
      console.log('Response headers:', response.getHeaders());

      // Ajouter le token dans la réponse pour le débogage
      return response.json({
        message: 'Login successful',
        user: tokens.user,
        access_token: tokens.access_token, // Temporaire pour le débogage
      });
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof UnauthorizedException) {
        const errorResponse = error.getResponse() as any;
        return response.status(401).json({
          statusCode: 401,
          message: errorResponse.message,
          type: errorResponse.type,
        });
      }
      throw error;
    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    response.cookie('token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Tokens refreshed' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req, @Res({ passthrough: true }) response: Response) {
    await this.authService.logout(req.user.userId);
    response.clearCookie('vercel_jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    // Log détaillé pour le débogage
    console.log('Profile request received');
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);

    if (!req.cookies.vercel_jwt && !req.headers.authorization) {
      console.log('No token found in cookies or Authorization header');
    }

    return this.authService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(req.user.userId, updateProfileDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }
}
