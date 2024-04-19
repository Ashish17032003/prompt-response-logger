import { Injectable } from '@nestjs/common';
import { createClient } from '@clickhouse/client'; // or '@clickhouse/client-web'

interface ChatInterface {
  ChatId: string;
  CreatedAt: number;
  Status: String;
  Request: String;
  Response: String;
  Model: String;
  Inputokens: number;
  PromptTokens: number;
  Latency: number;
}

@Injectable()
export class ClickhouseService {
  client = createClient({
    url: process.env.CLICKHOUSE_HOST ?? 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USER ?? 'default',
    password: process.env.CLICKHOUSE_PASSWORD ?? '',
  });

  // Method to execute a query
  async getAllChats(): Promise<any> {
    const resultSet = await this.client.query({
      query: 'SELECT * FROM Chats',
      format: 'JSONEachRow',
    });

    const dataset = await resultSet.json();
    return dataset;
  }

  async insertIntoChats(info: ChatInterface) {
    await this.client.command({
      query: `
        CREATE TABLE IF NOT EXISTS Chats (
            ChatId UUID PRIMARY KEY,
            CreatedAt DateTime,
            Status String,
            Request String,
            Response String,
            Model String,
            Inputokens UInt32,
            PromptTokens UInt32,
            Latency UInt32
        ) ENGINE = MergeTree ORDER BY ChatId;
        `,
      // Recommended for cluster usage to avoid situations where a query processing error occurred after the response code,
      // and HTTP headers were already sent to the client.
      // See https://clickhouse.com/docs/en/interfaces/http/#response-buffering
      clickhouse_settings: {
        wait_end_of_query: 1,
      },
    });

    await this.client.insert({
      table: 'Chats',
      values: [info],
      format: 'JSONEachRow',
    });
  }
}

/*

DB 

CREATE TABLE IF NOT EXISTS Chats (
    ChatId UUID PRIMARY KEY,
    CreatedAt DateTime,
    Status String,
    Request String,
    Response String,
    Model String,
    Inputokens UInt32,
    PromptTokens UInt32,
    Latency UInt32
) ENGINE = MergeTree ORDER BY ChatId;


*/
