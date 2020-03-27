import { Module } from '@nestjs/common';
import { AccountController } from 'src/account/controllers/account.controller';
import { AccountService } from 'src/account/services/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountdModule {}
