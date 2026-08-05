import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Create or update profile' })
  @ApiResponse({ status: 201, description: 'Profile saved' })
  async create(@Request() req: any, @Body() dto: CreateProfileDto) {
    return this.profileService.create({ ...dto, userId: req.user.id });
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  async findCurrent(@Request() req: any) {
    return this.profileService.findOne(req.user.id);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get profile by user id' })
  async findOne(@Param('userId') userId: string) {
    return this.profileService.findOne(userId);
  }
}
