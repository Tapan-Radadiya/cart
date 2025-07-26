import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() body: { projectId: string; message: string }) {
    // TODO: Call OpenAI later
    return this.chatService.reply(body.projectId, body.message);
  }
}