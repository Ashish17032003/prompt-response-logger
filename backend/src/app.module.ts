import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirequestModule } from './airequest/airequest.module';

@Module({
  imports: [AirequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
