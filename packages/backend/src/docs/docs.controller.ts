import { Controller, Get, Param } from '@nestjs/common';
import { DocsService } from './docs.service';

@Controller('api/projects/:id/docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  async getDocs(@Param('id') projectId: string) {
    // TODO: fetch latest ApiSpec for project from DB
    return this.docsService.getLatestSpec(projectId);
  }
}