import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';

@Injectable()
export class AccountService {

    async listAccounts(): Promise<any> {
        const command = `make hashicorp-accounts`;
        const exec: any = await CommandHelper.run(command);
        return CommandHelper.wrap(command, exec);
    }

    async generateAccount(chain: string): Promise<any> {
        const endpoint = environment.orchestrate.endpoint;
        const command = `orchestrate accounts generate --endpoint ${endpoint} --chain ${chain}`;
        const exec: any = await CommandHelper.run(command);
        return CommandHelper.wrap(command, exec);
    }

}
