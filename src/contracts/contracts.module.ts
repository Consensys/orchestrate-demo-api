import { Module } from '@nestjs/common';
import { ContractsController } from 'src/contracts/controllers/contracts.controller';
import { ContractsService } from 'src/contracts/services/contracts.service';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule { }
