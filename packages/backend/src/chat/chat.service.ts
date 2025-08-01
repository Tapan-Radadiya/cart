import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocsService } from '../docs/docs.service';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

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

    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    const systemPrompt = `You are an API docs assistant. The latest uploaded API spec is:\n\n${latestSpec.rawText || '[binary spec]'}\n\nAnswer questions about this API.`;

    const prompt = `${systemPrompt}\n\nUser: ${userPrompt}`;

    const result = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
    });

    const replyText = result.response.text();
    return { reply: replyText };
  }
}