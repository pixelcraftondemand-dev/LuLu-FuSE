import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SafetyService } from './safety.service';
import { ReportDto } from './dto/report.dto';

@ApiTags('safety')
@Controller('safety')
export class SafetyController {
  constructor(private readonly safetyService: SafetyService) {}

  @Post('report')
  @ApiOperation({ summary: 'Submit a safety report' })
  @ApiResponse({ status: 201, description: 'Report accepted' })
  async report(@Body() dto: ReportDto) {
    return this.safetyService.report(dto);
  }
}
