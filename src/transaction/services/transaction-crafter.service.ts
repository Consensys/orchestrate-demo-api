import { Injectable } from '@nestjs/common';
import { Transaction } from '../models/transaction.model';
import { Producer } from 'pegasys-orchestrate';
import { environment } from 'src/config/environments/environment';

@Injectable()
export class TransactionCrafterService {
    async send(transaction: Transaction): Promise<any> {
        const producer = new Producer([environment.orchestrate.kafka.endpoint]);
        await producer.connect();
        const requestId = await producer.sendTransaction({
            chainName: transaction.chain,
            contractName: 'Counter',
            methodSignature: 'increment(uint256)',
            args: [transaction.increment],
            from: transaction.from,
            to: transaction.to
        });
        console.log('Transaction request sent with id', requestId);
        await producer.disconnect();
        return requestId;
    }
}
