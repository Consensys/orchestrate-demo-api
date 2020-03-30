import { Injectable } from '@nestjs/common';
import { Producer, Consumer, EventType, ResponseMessage } from 'pegasys-orchestrate'
import { environment } from 'src/config/environments/environment';

@Injectable()
export class TxSenderService {
    async increment(chainName: string, fromAddress: string, toAddress: string, increment: Number): Promise<any> {
        const producer = new Producer([environment.orchestrate.kafka.endpoint]);
        await producer.connect();
        const requestId = await producer.sendTransaction({
            chainName: chainName,
            contractName: 'Counter',
            methodSignature: 'increment(uint256)',
            args: [increment],
            from: fromAddress,
            to: toAddress
        });
        console.log('Transaction request sent with id', requestId);
        await producer.disconnect();
        return requestId;
    }
}
