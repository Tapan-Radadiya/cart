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
    const { userId } = req.user as { userId: string };
    return this.projectsService.listForUser(userId);
  }

  @Post()
  async create(@Req() req: Request, @Body('name') name: string) {
    const { userId } = req.user as { userId: string };
    return this.projectsService.createForUser(userId, name);
  }
}