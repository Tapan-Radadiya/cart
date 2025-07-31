import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DocsService } from './docs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/projects/:id/docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  async getDocs(@Param('id') projectId: string) {
    return this.docsService.getLatestSpec(projectId);
  }
}