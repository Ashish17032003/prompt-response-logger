import { Module } from '@nestjs/common';
import { ClickhouseService } from './clickhouse.service';

@Module({
  exports: [ClickhouseService],

  providers: [ClickhouseService],
})
export class ServiceModule {}
