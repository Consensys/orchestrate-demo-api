import { Controller, Post, Body, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { route } from 'src/app.routing';
import { ContractsService } from '../services/contracts.service';
import { ContractsDto } from '../dtos/contracts.dto'
import { httpStatus } from 'src/shared/constants/http.status'
import { ErrorInterceptor } from 'src/shared/interceptors/error.interceptor';

@Controller(route.contracts)
@UseInterceptors(ErrorInterceptor)
@ApiTags(route.contracts)
export class ContractsController {
    constructor(private readonly contractsService: ContractsService) { }

    @Get()
    @ApiResponse(httpStatus.ok)
    @ApiResponse(httpStatus.internalServerError)
    async getContracts(): Promise<any> {
        const wrapper = await this.contractsService.listContracts();
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

    @Post()
    @ApiResponse(httpStatus.created)
    @ApiResponse(httpStatus.badRequest)
    @ApiResponse(httpStatus.internalServerError)
    @ApiBody({ type: ContractsDto, required: true })
    async createContracts(@Body() contractsDto: ContractsDto): Promise<any> {
        const wrapper = await this.contractsService.generateContracts(contractsDto.chain);
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

}
