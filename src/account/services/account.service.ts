import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';
import { TechnicalError } from 'src/shared/errors/technical.error';
import { ArgumentError } from 'src/shared/errors/argument.error';

@Injectable()
export class AccountService {

    async listAccounts(): Promise<any> {
        const command = `make hashicorp-accounts`;
        try {
            const exec: any = await CommandHelper.run(command);
            const response = exec.stdout;
            return CommandHelper.wrap(command, exec, response.split('\n').slice(2));
        } catch (e) {
            console.log(e);
            throw new TechnicalError(e.message);
        }
    }

    async generateAccount(chain?: string): Promise<any> {
        let command = `orchestrate accounts generate --endpoint ${environment.orchestrate.kafka.endpoint}`;
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
