import { Module } from '@nestjs/common';
import { AirequestController } from './airequest.controller';
import { ServiceModule } from 'src/services/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [AirequestController]
})
export class AirequestModule {}


