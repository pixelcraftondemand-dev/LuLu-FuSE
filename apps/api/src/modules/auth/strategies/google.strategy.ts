import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID') || '',
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET') || '',
      callbackURL:
        config.get<string>('GOOGLE_CALLBACK_URL') || 'http://127.0.0.1:3001/auth/google/callback',
      scope: ['email', 'profile'],
      prompt: 'select_account',
      accessType: 'offline',
      includeGrantedScopes: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      return done(new Error('Google account did not provide an email address.'), false);
    }

    const usernameBase = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').slice(0, 15) || 'googleuser';
    const username = `${usernameBase}-${profile.id.slice(-5)}`;
    const displayName = profile.displayName || email;
    const locale = profile._json?.locale as string | undefined;

    const user = await this.prisma.user.upsert({
      where: { email },
      update: {
        displayName,
        isActive: true,
        isVerified: true,
        country: locale,
      },
      create: {
        email,
        username,
        displayName,
        passwordHash: await bcrypt.hash(profile.id, 12),
        country: locale,
        isActive: true,
        isVerified: true,
      },
    });

    done(null, user);
  }
}
