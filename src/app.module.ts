import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { HelloWorldModule } from 'src/hello-world/hello-world.module';
import { AccountdModule } from './account/account.module';
import { ContractsModule } from './contracts/contracts.module';
import { NetworksModule } from './networks/networks.module';
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    HelloWorldModule,
    AccountdModule,
    ContractsModule,
    NetworksModule,
  ]
})
export class AppModule { }
