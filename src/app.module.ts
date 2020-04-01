import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { HelloWorldModule } from 'src/hello-world/hello-world.module';
import { AccountdModule } from './account/account.module';
import { ContractsModule } from './contracts/contracts.module';
import { FaucetsModule } from './faucets/faucets.module';
import { NetworksModule } from './networks/networks.module';
import { SharedModule } from './shared/shared.module'
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    HelloWorldModule,
    AccountdModule,
    ContractsModule,
    FaucetsModule,
    NetworksModule,
    TransactionModule,
  ]
})
export class AppModule { }
