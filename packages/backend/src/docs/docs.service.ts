import { Injectable } from '@nestjs/common';

@Injectable()
export class DocsService {
  async getLatestSpec(projectId: string) {
    // TODO: Implement DB lookup for latest ApiSpec for this project
    return { projectId, docs: 'TODO: Docs go here' };
  }
}