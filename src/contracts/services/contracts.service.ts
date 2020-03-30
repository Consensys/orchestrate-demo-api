import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';
import { TechnicalError } from 'src/shared/errors/technical.error';
import { ArgumentError } from 'src/shared/errors/argument.error';

@Injectable()
export class ContractsService {

  async listContracts(): Promise<any> {
    const command = `orchestrate contracts catalog --endpoint ${environment.orchestrate.contractRegistry.endpoint}`;
    try {
      const exec: any = await CommandHelper.run(command);
      let response = exec.stdout;
      response = response.replace(/'/g, '"');
      response = JSON.parse(response);
      return CommandHelper.wrap(command, exec, response);
    } catch (e) {
      console.log(e);
      throw new TechnicalError(e.message);
    }
  }

  async getContract(name): Promise<any> {
    const command = `orchestrate contracts contract -e ${environment.orchestrate.contractRegistry.endpoint} -n ${name}`;
    try {
      const exec: any = await CommandHelper.run(command);
      let response = exec.stdout;
      response = response.replace(/'/g, '"');
      response = response.replace(/\[Array\]/g, '"[Array]"');
      response = response.replace(/[a-zA-Z]+:+/g, matchKey =>
        matchKey.replace(/[a-zA-Z]+/g, matchWord => `"${matchWord}"`)
      );
      response = JSON.parse(response);
      return CommandHelper.wrap(command, exec, response);
    } catch (e) {
      console.log(e);
      throw new TechnicalError(e.message);
    }
  }

  async generateContracts(chain?: string): Promise<any> {
    let command = `orchestrate contracts generate --endpoint ${environment.orchestrate.kafka.endpoint}`;
    if (chain) {
      if (chain.trim().length === 0) {
        throw new ArgumentError(`Invalid chain name`);
      } else {
        command = `${command} --chain ${chain}`
      }
    }
    try {
      const exec: any = await CommandHelper.run(command);
      const response = exec.stdout;
      return CommandHelper.wrap(command, exec, response);
    } catch (e) {
      console.log(e);
      throw new TechnicalError(e.message);
    }
  }

}
