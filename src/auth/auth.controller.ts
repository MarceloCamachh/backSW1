import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const jwt = await this.authService.generateJwt(req.user);

    // Opción 1: Devuelves directamente el token (ideal para desarrollo)
    return {
      user: req.user,
      token: jwt.access_token,
    };

    // Opción 2: Rediriges al frontend con el token en la URL (ejemplo)
    // return res.redirect(`http://localhost:5173/auth/callback?token=${jwt.access_token}`);
  }
}
