import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { RegistrationRequest } from './registration.request';
import {WriteManager} from "../../../component/registration/write.manager";
import {RegistrationEntity} from "../../../component/registration/registration.entity";
import {RegistrationResponse} from "./registration.response";

@Controller('/registration')
export class RegistrationController {
    private readonly writeManager: WriteManager;

    constructor(
        @Inject('RegistrationWriteManager')
        writeManager: WriteManager,
    ) {
        this.writeManager = writeManager;
    }

    @Post()
    async registration(@Body() body: RegistrationRequest): Promise<RegistrationResponse> {
        const result = await this.writeManager.registration(body);

        const response  = new RegistrationResponse();
        response.fio = result.fio;
        response.apiToken = result.apiToken;

        return response;
    }
}
