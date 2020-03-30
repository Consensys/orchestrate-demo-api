import { Module } from '@nestjs/common';
import { FaucetsController } from 'src/faucets/controllers/faucets.controller';
import { FaucetsService } from 'src/faucets/services/faucets.service';

@Module({
  controllers: [FaucetsController],
  providers: [FaucetsService],
})
export class FaucetsModule { }
