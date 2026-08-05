import { Injectable } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class SafetyService {
  report(dto: ReportDto) {
    return {
      message: 'Report received and escalated for review.',
      report: {
        reason: dto.reason,
        description: dto.description,
        evidenceUrl: dto.evidenceUrl,
      },
    };
  }
}
