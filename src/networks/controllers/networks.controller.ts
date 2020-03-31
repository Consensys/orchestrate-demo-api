import { Controller, Post, Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { route } from 'src/app.routing';
import { NetworksService } from '../services/networks.service';
import { NetworksDto } from '../dtos/networks.dto'
import { httpStatus } from 'src/shared/constants/http.status'
import { ErrorInterceptor } from 'src/shared/interceptors/error.interceptor';

@Controller(route.networks)
@UseInterceptors(ErrorInterceptor)
@ApiTags(route.networks)
export class NetworksController {
    constructor(private readonly networksService: NetworksService) { }

    @Get()
    @ApiResponse(httpStatus.ok)
    @ApiResponse(httpStatus.internalServerError)
    async getNetworks(): Promise<any> {
        const wrapper = await this.networksService.listNetworks();
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

    // @Get(':name')
    // @ApiResponse(httpStatus.ok)
    // @ApiResponse(httpStatus.internalServerError)
    // async getNetwork(@Param() params): Promise<any> {
    //     const wrapper = await this.networksService.getNetwork(params.name);
    //     return {
    //         commands: [wrapper],
    //         response: wrapper.response
    //     };
    // }

    @Post()
    @ApiResponse(httpStatus.created)
    @ApiResponse(httpStatus.badRequest)
    @ApiResponse(httpStatus.internalServerError)
    @ApiBody({ type: NetworksDto, required: true })
    async createNetworks(@Body() networksDto: NetworksDto): Promise<any> {
        const wrapper = await this.networksService.registerNetwork(networksDto);
        return {
            commands: [wrapper],
            response: wrapper.response
        };
    }

}
