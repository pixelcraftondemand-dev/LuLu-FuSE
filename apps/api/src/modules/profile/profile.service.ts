import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto) {
    const profile = await this.prisma.profile.upsert({
      where: { userId: dto.userId },
      update: {
        bio: dto.bio,
        interests: dto.interests,
        languages: dto.languages,
        updatedAt: new Date(),
      },
      create: {
        userId: dto.userId,
        bio: dto.bio,
        interests: dto.interests || [],
        languages: dto.languages || [],
      },
    });

    return {
      message: 'Profile saved successfully',
      profile,
    };
  }

  async findOne(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: { select: { id: true, email: true, username: true, displayName: true } } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}
