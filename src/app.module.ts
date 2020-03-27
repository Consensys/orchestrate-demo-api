import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { HelloWorldModule } from 'src/hello-world/hello-world.module';
import { AccountdModule } from './account/account.module';
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    HelloWorldModule,
    AccountdModule
  ]
})
export class AppModule { }
