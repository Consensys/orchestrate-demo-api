import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { route } from 'src/app.routing';
import { AccountService } from '../services/account.service';
import { AccountDto } from '../dtos/account.dto'
import { httpStatus } from 'src/shared/constants/http.status'

@Controller(route.account)
@ApiTags(route.account)
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    @ApiResponse(httpStatus.ok)
    @ApiResponse(httpStatus.internalServerError)
    async getAccounts(): Promise<any> {
        const wrapper = await this.accountService.listAccounts();
        return {
            data: [wrapper]
        };
    }

    @Post()
    @ApiResponse(httpStatus.created)
    @ApiResponse(httpStatus.badRequest)
    @ApiResponse(httpStatus.internalServerError)
    @ApiBody({ type: AccountDto, required: true })
    async createAccount(@Body() accountDto: AccountDto): Promise<any> {
        const wrapper = await this.accountService.generateAccount(accountDto.chain);
        return {
            data: [wrapper]
        };
    }

}
