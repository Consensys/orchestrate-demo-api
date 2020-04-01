import { Module } from '@nestjs/common';
import { ConsumerController } from 'src/consumer/controllers/consumer.controller';
import { ConsumerService } from 'src/consumer/services/consumer.service';

@Module({
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule { }
