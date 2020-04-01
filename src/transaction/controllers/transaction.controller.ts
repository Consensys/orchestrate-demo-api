import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { httpStatus } from 'src/shared/constants/http.status';
import { TransactionDto } from '../dtos/transaction.dto';
import { TransactionCrafterService } from '../services/transaction-crafter.service';
import { route } from 'src/app.routing';
import { ErrorInterceptor } from 'src/shared/interceptors/error.interceptor';

@Controller(route.transactions)
@UseInterceptors(ErrorInterceptor)
@ApiTags(route.transactions)
export class TransactionController {
    constructor(private readonly transactionCrafterService: TransactionCrafterService) { }

    @Post()
    @ApiResponse(httpStatus.created)
    @ApiResponse(httpStatus.badRequest)
    @ApiResponse(httpStatus.internalServerError)
    @ApiBody({ type: TransactionDto, required: true })
    async createContracts(@Body() transactionDto: TransactionDto): Promise<any> {
        const wrapper = await this.transactionCrafterService.send(transactionDto);
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }
}
