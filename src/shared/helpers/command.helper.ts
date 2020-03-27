import { exec } from 'child_process';

export class CommandHelper {
    static async run(cmd): Promise<any> {
        return new Promise(function (resolve, reject) {
            exec(cmd, (err, stdout, stderr) => {
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
}
