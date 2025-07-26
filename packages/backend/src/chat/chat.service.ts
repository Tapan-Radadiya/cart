import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async reply(projectId: string, message: string) {
    // TODO: Integrate GPT later
    return { reply: `Echo [${projectId}]: ${message}` };
  }
}