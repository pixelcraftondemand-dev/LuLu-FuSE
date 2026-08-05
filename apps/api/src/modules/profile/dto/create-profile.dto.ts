import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  interests?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  languages?: string[];
}
