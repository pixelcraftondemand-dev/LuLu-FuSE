import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  async login(@Request() req: any, @Body() dto: LoginDto) {
    const loginResponse = await this.authService.login(dto);
    return new Promise((resolve, reject) => {
      req.login(loginResponse.user, (err: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ message: 'Logged in successfully', user: loginResponse.user });
      });
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Sign in with Google' })
  googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  googleAuthRedirect(@Request() req: any, @Res() res: Response) {
    req.login(req.user, (err: any) => {
      if (err) {
        return res.status(500).send('Google login failed');
      }
      const frontendUrl = process.env.WEB_URL || 'http://127.0.0.1:3000';
      return res.redirect(`${frontendUrl}/auth/success`);
    });
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Get current authenticated user' })
  me(@Request() req: any) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Logout current user' })
  logout(@Request() req: any) {
    return new Promise((resolve, reject) => {
      req.logout((err: any) => {
        if (err) {
          reject(err);
          return;
        }
        req.session.destroy((sessionErr: any) => {
          if (sessionErr) {
            reject(sessionErr);
            return;
          }
          resolve({ message: 'Logged out successfully' });
        });
      });
    });
  }
}
