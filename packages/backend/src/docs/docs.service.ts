import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}

  async getLatestSpec(projectId: string) {
    const apiSpec = await this.prisma.apiSpec.findFirst({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
    if (!apiSpec) throw new NotFoundException('No API spec found for project');
    return {
      id: apiSpec.id,
      specType: apiSpec.specType,
      rawText: apiSpec.rawText,
      filePath: apiSpec.filePath,
      createdAt: apiSpec.createdAt,
    };
  }
}