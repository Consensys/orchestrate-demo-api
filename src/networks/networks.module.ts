import { Module } from '@nestjs/common';
import { NetworksController } from 'src/networks/controllers/networks.controller';
import { NetworksService } from 'src/networks/services/networks.service';

@Module({
  controllers: [NetworksController],
  providers: [NetworksService],
})
export class NetworksModule { }
