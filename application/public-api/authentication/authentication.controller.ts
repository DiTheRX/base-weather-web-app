import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticationResponse } from './authentication.response';
import {WriteManager} from "../../../component/authentication/write.manager";
import {AuthenticationRequest} from "./authentication.request";


@Controller('/authentication')
export class AuthenticationController {
    constructor(
        @Inject('AuthenticationWriteManager')
        private readonly writeManager: WriteManager,

    ) {}

    @Post()
    async authentication(@Body() body: AuthenticationRequest): Promise<AuthenticationResponse> {
        const authenticationRecord = await this.writeManager.authenticate(body);

        const response = new AuthenticationResponse();
        response.fio = authenticationRecord.fio;
        response.apiToken = authenticationRecord.apiToken;

        return response;
    }
}
