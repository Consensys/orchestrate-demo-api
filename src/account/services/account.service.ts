import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';

@Injectable()
export class AccountService {

    async generateAccount(chain: string): Promise<any> {
        const endpoint = environment.orchestrate.endpoint;
        const command = `orchestrate accounts generate --endpoint ${endpoint} --chain ${chain}`;
        let response: string;
        try {
            const exec = await CommandHelper.run(command);
            const { stdout, stderr } = exec;
            response = !stdout ? stderr : stdout;
        } catch (e) {
            console.log(e);
            response = e.message;
        }
        return {
            command,
            response
        };
    }

}
