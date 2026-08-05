import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }, { phone: dto.phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException('An account already exists with the provided email, username, or phone.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        country: dto.country,
        dateOfBirth: new Date(dto.dateOfBirth),
        username: dto.username,
        displayName: dto.displayName,
      },
    });

    return {
      message: 'Registration received. Email and phone verification are required before activation.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
    };
  }
}
