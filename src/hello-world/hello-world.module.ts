import { Module } from '@nestjs/common';
import { HelloWorldController } from 'src/hello-world/controllers/hello-world.controller';
import { HelloWorldService } from 'src/hello-world/services/hello-world.service';

@Module({
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class HelloWorldModule {}
