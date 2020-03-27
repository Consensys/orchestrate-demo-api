import { exec } from 'child_process';

export class CommandHelper {
    static async run(command: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    let _stdout = stdout;
                    if (_stdout) {
                        _stdout = _stdout.trim();
                    }
                    let _stderr = stderr;
                    if (_stderr) {
                        _stderr = _stderr.trim();
                    }
                    resolve({
                        stdout: _stdout,
                        stderr: _stderr
                    });
                }
            });
        });
    }

    static wrap(command: string, exec: any): any {
        let response: string;
        try {
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
