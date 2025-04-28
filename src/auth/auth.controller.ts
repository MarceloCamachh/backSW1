import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwt = await this.authService.generateJwt(req.user);
    const { email, name, picture } = req.user;

    const redirectUrl = new URL(`${process.env.FRONTEND_URL}/auth/callback`);
    redirectUrl.searchParams.set('token', jwt.access_token);
    redirectUrl.searchParams.set('email', email);
    redirectUrl.searchParams.set('name', name);
    redirectUrl.searchParams.set('picture', picture);

    return res.redirect(redirectUrl.toString());
  }
}
