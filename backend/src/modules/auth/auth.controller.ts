import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.auth.register(dto);
    response.cookie('tablebook_refresh', session.refreshToken, cookieOptions);
    response.cookie('tablebook_user', session.user.id, cookieOptions);
    return { accessToken: session.accessToken, user: session.user };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.auth.login(dto);
    response.cookie('tablebook_refresh', session.refreshToken, cookieOptions);
    response.cookie('tablebook_user', session.user.id, cookieOptions);
    return { accessToken: session.accessToken, user: session.user };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const cookies = request.cookies as Partial<
      Record<'tablebook_user' | 'tablebook_refresh', string>
    >;
    const userId = cookies.tablebook_user;
    const refreshToken = cookies.tablebook_refresh;
    const session = await this.auth.refresh(userId ?? '', refreshToken ?? '');
    response.cookie('tablebook_refresh', session.refreshToken, cookieOptions);
    response.cookie('tablebook_user', session.user.id, cookieOptions);
    return { accessToken: session.accessToken, user: session.user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @CurrentUser() user: AuthUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('tablebook_refresh', { path: '/' });
    response.clearCookie('tablebook_user', { path: '/' });
    return this.auth.logout(user.sub);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return this.auth.me(user.sub);
  }
}
