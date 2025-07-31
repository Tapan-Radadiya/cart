import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async list(@Req() req: Request) {
    return this.projectsService.listForUser((req.user as any).userId);
  }

  @Post()
  async create(@Req() req: Request, @Body() body: { name: string }) {
    return this.projectsService.createForUser((req.user as any).userId, body.name);
  }
}