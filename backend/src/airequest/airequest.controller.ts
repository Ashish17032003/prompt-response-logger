import { Body, Controller, Post } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';

@Controller('airequest')
export class AirequestController {
  cohere = new CohereClient({
    token: 'Fu6sKkJtE4QYQPSt0GEn78srOm3BCNWaybBybp3H',
  });

  // gets response from the cohere api ( endpoint : airequest/chat )
  @Post('chat')
  async chat(@Body() body: { message: string }): Promise<any> {
    try {
      const chat = await this.cohere.chat({
        model: 'command',
        message: body.message,
      });

      // Log the response
      console.log(`Received response from Cohere API: ${JSON.stringify(chat)}`);

      return chat;
    } catch (error) {
      console.error(
        `Error while fetching response from Cohere API: ${error.message}`,
      );
      throw error;
    }
  }
  
  

}
