import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { HelloWorldModule } from 'src/hello-world/hello-world.module';

@Module({
  imports: [
    ConfigModule,
    HelloWorldModule
  ],
})
export class AppModule { }
