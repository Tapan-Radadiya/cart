import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocsService } from '../docs/docs.service';
import { ConfigService } from '@nestjs/config';
// Updated for openai v4:
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

@Injectable()
export class ChatService {
  constructor(
    private docsService: DocsService,
    private config: ConfigService
  ) {}

  async reply(projectId: string, userPrompt: string) {
    const openaiApiKey = this.config.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new InternalServerErrorException('OpenAI API key missing');
    }

    const latestSpec = await this.docsService.getLatestSpec(projectId);

    const openai = new OpenAI({ apiKey: openaiApiKey });

    const systemPrompt = `You are an API docs assistant. The latest uploaded API spec is:\n\n${latestSpec.rawText || '[binary spec]'}\n\nAnswer questions about this API.`;
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 800,
    });

    return { message: completion.choices[0].message.content };
  }
}