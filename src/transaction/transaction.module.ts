import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionCrafterService } from './services/transaction-crafter.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionCrafterService]
})
export class TransactionModule {}
