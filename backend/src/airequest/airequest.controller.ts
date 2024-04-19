import { Body, Controller, Post, Get } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';
import { ClickhouseService } from 'src/services/clickhouse.service';

@Controller()
export class AirequestController {
  cohere = new CohereClient({
    token: 'Fu6sKkJtE4QYQPSt0GEn78srOm3BCNWaybBybp3H',
  });

  constructor(private clickhouseService: ClickhouseService) {}

  model = 'command';

  // gets response from the cohere api ( endpoint : airequest/chat )
  @Post('chat')
  async chat(@Body() body: { message: string }): Promise<any> {
    try {
      const startTime = Date.now();
      const chat = await this.cohere.chat({
        model: this.model,
        message: body.message,
      });

      const endTime = Date.now();

      const latency = endTime - startTime;

      await this.clickhouseService.insertIntoChats({
        ChatId: chat.generationId,
        CreatedAt:  Date.now(),
        Status: chat.finishReason,
        Request: body.message,
        Response: chat.text,
        Model: this.model,
        Inputokens: chat.meta.tokens.inputTokens,
        PromptTokens: chat.meta.tokens.outputTokens,
        Latency: latency,
      });

      // Log the response
      //console.log(`Received response from Cohere API: ${JSON.stringify(chat)}`);

      return chat;
    } catch (error) {
      console.error(
        `Error while fetching response from Cohere API: ${error.message}`,
      );
      throw error;
    }
  }

  @Get('chat')
  async getRequests() {
    const result = await this.clickhouseService.getAllChats();
    return result;
  }
}
