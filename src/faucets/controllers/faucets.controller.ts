import { Controller, Post, Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { route } from 'src/app.routing';
import { FaucetsService } from '../services/faucets.service';
import { FaucetsDto } from '../dtos/faucets.dto'
import { httpStatus } from 'src/shared/constants/http.status'
import { ErrorInterceptor } from 'src/shared/interceptors/error.interceptor';

@Controller(route.faucets)
@UseInterceptors(ErrorInterceptor)
@ApiTags(route.faucets)
export class FaucetsController {
    constructor(private readonly faucetsService: FaucetsService) { }

    @Get()
    @ApiResponse(httpStatus.ok)
    @ApiResponse(httpStatus.internalServerError)
    async getFaucets(): Promise<any> {
        const wrapper = await this.faucetsService.listFaucets();
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

    // @Get(':name')
    // @ApiResponse(httpStatus.ok)
    // @ApiResponse(httpStatus.internalServerError)
    // async getFaucet(@Param() params): Promise<any> {
    //     const wrapper = await this.faucetsService.getFaucet(params.name);
    //     return {
    //         commands: [wrapper],
    //         response: wrapper.response
    //     };
    // }

    @Post()
    @ApiResponse(httpStatus.created)
    @ApiResponse(httpStatus.badRequest)
    @ApiResponse(httpStatus.internalServerError)
    @ApiBody({ type: FaucetsDto, required: true })
    async createFaucets(@Body() faucetsDto: FaucetsDto): Promise<any> {
        const wrapper = await this.faucetsService.registerFaucet(faucetsDto);
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

}
