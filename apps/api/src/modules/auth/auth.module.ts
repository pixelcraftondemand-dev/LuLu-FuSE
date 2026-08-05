import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'google', session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer, AuthenticatedGuard],
  exports: [AuthService],
})
export class AuthModule {}
