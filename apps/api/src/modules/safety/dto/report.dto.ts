import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReportDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reporterId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reportedUserId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  evidenceUrl?: string;
}
