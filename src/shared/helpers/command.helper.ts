import { exec } from 'child_process';

export class CommandHelper {
    static async run(cmd: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    const _stdout = stdout ? stdout.trim() : stdout;
                    const _stderr = stderr ? stderr.trim() : stderr;
                    resolve({
                        stdout: _stdout,
                        stderr: _stderr
                    });
                }
            });
        });
    }

    static wrap(cmd: string, exec: any, response: any): any {
        const { stdout, stderr } = exec;
        const rawResponse = stdout ? stdout : stderr;
        return {
            command: cmd,
            response,
            rawResponse
        };
    }
}
