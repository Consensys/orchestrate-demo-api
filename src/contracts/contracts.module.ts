import { Module } from '@nestjs/common';
import { ContractsController } from 'src/contracts/controllers/contracts.controller';
import { ContractsService } from 'src/contracts/services/contracts.service';
import { TxSenderService } from './services/tx-sender.service';
import { TxController } from './controllers/tx.controller';

@Module({
  controllers: [ContractsController, TxController],
  providers: [ContractsService, TxSenderService],
})
export class ContractsModule { }
