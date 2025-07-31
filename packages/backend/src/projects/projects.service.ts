import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async listForUser(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
    });
  }

  async createForUser(userId: string, name: string) {
    return this.prisma.project.create({
      data: {
        name,
        ownerId: userId,
      },
    });
  }
}