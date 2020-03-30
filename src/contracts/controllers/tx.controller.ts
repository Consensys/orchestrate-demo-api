import { Controller, UseInterceptors, Post, Body } from '@nestjs/common';
import { route } from 'src/app.routing';
import { ErrorInterceptor } from 'src/shared/interceptors/error.interceptor';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { httpStatus } from 'src/shared/constants/http.status';
import { TxDto } from '../dtos/transaction.dto'
import { TxSenderService } from '../services/tx-sender.service';

@Controller(route.transactions)
@UseInterceptors(ErrorInterceptor)
@ApiTags(route.transactions)
export class TxController {
    constructor(private readonly txSenderService: TxSenderService) { }

    @Post()
    @ApiResponse(httpStatus.created)
    @ApiResponse(httpStatus.badRequest)
    @ApiResponse(httpStatus.internalServerError)
    @ApiBody({ type: TxDto, required: true })
    async createContracts(@Body() transaction: TxDto): Promise<any> {
        const requestId = await this.txSenderService.increment(
            transaction.chain,
            transaction.fromAddress,
            transaction.toAddress,
            transaction.increment
        );
        return {
            response: requestId
        };
    }
}
