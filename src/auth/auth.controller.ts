import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { Prisma } from '@prisma/client';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {
    return true;
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.signIn(
      req.user as Prisma.UserCreateInput,
    );

    res.cookie('access_token', tokens.accessToken, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.redirect('/');
  }

  @Get('me')
  @UseGuards(JwtAccessAuthGuard)
  async me() {
    return true;
  }

  @Get('logout')
  @UseGuards(JwtAccessAuthGuard)
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user['sub']);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie('access_token', tokens.accessToken, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK).json({ result: true });
  }
}
