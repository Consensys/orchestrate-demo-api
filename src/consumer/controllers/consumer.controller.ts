import { Controller, Post, Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { route } from 'src/app.routing';
import { ConsumerService } from '../services/consumer.service';
import { ConsumerDto } from '../dtos/consumer.dto'
import { httpStatus } from 'src/shared/constants/http.status'
import { ErrorInterceptor } from 'src/shared/interceptors/error.interceptor';

@Controller(route.consumer)
@UseInterceptors(ErrorInterceptor)
@ApiTags(route.consumer)
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) { }

    @Post()
    @ApiResponse(httpStatus.ok)
    @ApiResponse(httpStatus.internalServerError)
    async getConsumer(): Promise<any> {
        const wrapper = await this.consumerService.consumeMessages();
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

}
