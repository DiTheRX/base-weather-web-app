import {Body, Controller, Get, Inject, Post, Req, UseGuards} from '@nestjs/common';
import { WeatherResponse } from './weather.response';
import {WeatherRequest} from "./weather.request";
import { WriteManager } from 'component/weather/write.manager';
import { AuthGuard } from '../guard/auth/auth.guard';
import {IsNotEmpty, IsOptional, IsString} from "class-validator";


@Controller('/weather')
export class WeatherController {
    constructor(
        @Inject('WeatherWriteManager')
        private readonly writeManager: WriteManager,

    ) {}

    @Post()
    @UseGuards(AuthGuard)
    async getWeather(@Req() req: Request, @Body() body: WeatherRequest): Promise<WeatherResponse> {
        const current = await this.writeManager.getCurrent({
            city: body.city,
            action_time: new Date().getTime(),
            user_id:req["auth"].id,
            language:body.language
        });

        const response = new WeatherResponse();
        response.temp_c = current.temp_c;

        return response;
    }
}
