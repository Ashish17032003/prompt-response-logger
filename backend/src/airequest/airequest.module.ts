import { Module } from '@nestjs/common';
import { AirequestController } from './airequest.controller';

@Module({
  controllers: [AirequestController]
})
export class AirequestModule {}


