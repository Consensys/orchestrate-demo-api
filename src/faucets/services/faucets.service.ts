import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';
import { TechnicalError } from 'src/shared/errors/technical.error';
import { ArgumentError } from 'src/shared/errors/argument.error';

import { FaucetsDto } from '../dtos/faucets.dto'

@Injectable()
export class FaucetsService {

  async listFaucets(): Promise<any> {
    const command = `curl -X GET localhost:8081/faucets`;
    try {
      const exec: any = await CommandHelper.run(command);
      const response = exec.stdout;
      return CommandHelper.wrap(command, exec, JSON.parse(response));
    } catch (e) {
      console.log(e);
      throw new TechnicalError(e.message);
    }
  }

  async registerFaucet(faucetsDto?: FaucetsDto): Promise<any> {
    if (faucetsDto) {
      if (!faucetsDto.name || faucetsDto.name === '') {
        throw new ArgumentError(`Invalid urls`);
      } else if (!faucetsDto.creditorAccount || faucetsDto.creditorAccount === '') {
        throw new ArgumentError(`Invalid creditor account`);
      } else if (!faucetsDto.chainRule || faucetsDto.chainRule === '') {
        throw new ArgumentError(`Invalid chain rule`);
      } else if (!faucetsDto.cooldown || faucetsDto.cooldown === '') {
        throw new ArgumentError(`Invalid cooldown`);
      } else if (!faucetsDto.amount || faucetsDto.amount === '') {
        throw new ArgumentError(`Invalid amount`);
      } else if (!faucetsDto.maxBalance || faucetsDto.maxBalance === '') {
        throw new ArgumentError(`Invalid max balance`);
      }
    } else {
      throw new ArgumentError(`Invalid JSON`);
    }

    const command = `curl -X POST --data '{"name":"${faucetsDto.name}", "creditorAccount":"${faucetsDto.creditorAccount}","chainRule":"${faucetsDto.chainRule}","cooldown":"${faucetsDto.cooldown}","amount":"${faucetsDto.amount}","maxBalance":"${faucetsDto.maxBalance}"}' localhost:8081/faucets`;

    try {
      const exec: any = await CommandHelper.run(command);
      let response = exec.stdout;
      response = JSON.parse(response);
      return CommandHelper.wrap(command, exec, response);
    } catch (e) {
      console.log(e);
      throw new TechnicalError(e.message);
    }
  }

}
