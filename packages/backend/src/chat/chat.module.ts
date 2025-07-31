import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaModule } from '../prisma.module';
import { DocsModule } from '../docs/docs.module';

@Module({
  imports: [PrismaModule, DocsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}