import { Injectable } from '@nestjs/common';
import { CommandHelper } from 'src/shared/helpers/command.helper';
import { environment } from 'src/config/environments/environment';
import { Consumer, EventType, ResponseMessage } from 'pegasys-orchestrate';

@Injectable()
export class ConsumerService {

  async consumeMessages(): Promise<any> {
    const consumer = new Consumer([environment.orchestrate.kafka.endpoint]);
    await consumer.connect();

    consumer.on(EventType.Response, async (responseMessage: ResponseMessage) => {
      const { value } = responseMessage.content()
      if (value.errors && value.errors.length > 0) {
        console.error('Transaction failed with error: ', value.errors)
        return
      } else {
        await responseMessage.commit()

        console.log('Transaction ID:', value.id)
        console.log('Transaction receipt: ', value.receipt)
      }
    })

    await consumer.consume()
    await consumer.disconnect();
    console.log("=>>>>>>>>>>>>>>>>>");
    const command = "temp"
    const exec = "temp"
    const request = "temp"
    return CommandHelper.wrap(command, exec, request);
  }

}
