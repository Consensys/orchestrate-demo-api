import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';
import { TechnicalError } from 'src/shared/errors/technical.error';
import { ArgumentError } from 'src/shared/errors/argument.error';

import { NetworksDto } from '../dtos/networks.dto'

@Injectable()
export class NetworksService {

  async listNetworks(): Promise<any> {
    const command = `curl -X GET localhost:8081/chains`;
    try {
      const exec: any = await CommandHelper.run(command);
      const response = exec.stdout;
      return CommandHelper.wrap(command, exec, JSON.parse(response));
    } catch (e) {
      console.log(e);
      throw new TechnicalError(e.message);
    }
  }

  // async getNetwork(name): Promise<any> {
  //   const command = `orchestrate networks network -e localhost:8020 -n ${name}`;
  //   try {
  //     const exec: any = await CommandHelper.run(command);
  //     let response = exec.stdout;
  //     response = response.replace(/'/g, '"');
  //     response = response.replace(/\[Array\]/g, '"[Array]"');
  //     response = response.replace(/[a-zA-Z]+:+/g, matchKey =>
  //       matchKey.replace(/[a-zA-Z]+/g, matchWord => `"${matchWord}"`)
  //     );
  //     response = JSON.parse(response);
  //     return CommandHelper.wrap(command, exec, response);
  //   } catch (e) {
  //     console.log(e);
  //     throw new TechnicalError(e.message);
  //   }
  // }

  async registerNetwork(networksDto?: NetworksDto): Promise<any> {
    if (networksDto) {
      if (!networksDto.name || networksDto.name === '') {
        throw new ArgumentError(`Invalid name`);
      } else if (networksDto.urls.length === 0) {
        throw new ArgumentError(`Invalid urls`);
      }
    } else {
      throw new ArgumentError(`Invalid JSON`);
    }

    let command = `curl -X POST --data '{"name": "${networksDto.name}", "urls":${JSON.stringify(networksDto.urls)}}' localhost:8081/chains`;

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
