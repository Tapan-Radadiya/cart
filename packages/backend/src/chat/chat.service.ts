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
    const geminiApiKey = this.config.get('GEMINI_API_KEY') || this.config.get('OPENAI_API_KEY');
    if (!geminiApiKey) throw new InternalServerErrorException('Gemini API key missing');

    const latestSpec = await this.docsService.getLatestSpec(projectId);

    const openai = new OpenAI({
      apiKey: geminiApiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai',
    });

    const systemPrompt = `You are an API docs assistant. The latest uploaded API spec is:\n\n${latestSpec.rawText || '[binary spec]'}\n\nAnswer questions about this API.`;

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gemini-1.5-pro',
      messages,
      max_tokens: 800,
    });

    return { reply: completion.choices[0].message.content };
  }
}