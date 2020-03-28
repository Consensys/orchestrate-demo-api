import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';
import { TechnicalError } from 'src/shared/errors/technical.error';
import { ArgumentError } from 'src/shared/errors/argument.error';

@Injectable()
export class ContractsService {

    async listContracts(): Promise<any> {
        const command = `orchestrate contracts catalog --endpoint localhost:8020`;
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

    async generateContracts(chain?: string): Promise<any> {
        let command = `orchestrate contracts generate --endpoint ${environment.orchestrate.endpoint}`;
        if (chain) {
            if (chain.trim().length === 0) {
                throw new ArgumentError(`Invalid chain`);
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
