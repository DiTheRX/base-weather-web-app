import { validate } from 'class-validator';
import { WeatherError } from './weather.error';
import { WeatherRepository } from './weather.repository';
import {AxiosService, IAxiosResult} from './axios.service';
import { WeatherEntity } from './weather.entity';
import { ErrorEnum } from '../error.enum';
import {RegistrationError} from "../registration/registration.error";
import {WeatherCommand} from "./command/weather.command";

export class WriteManager{
    private readonly repository: WeatherRepository;
    private readonly _axiosService: AxiosService;

    constructor(repository: WeatherRepository, axiosService: AxiosService) {
        this.repository = repository;
        this._axiosService = axiosService;
    }

    async _validateOrThrow(command: object): Promise<void> {
        const validationErrors = await validate(command);
        if (validationErrors.length > 0) {
            throw new RegistrationError(ErrorEnum.Validation, 'The incoming data object did not pass the validation process');
        }
    }
    async getCurrent(command: WeatherCommand): Promise<WeatherEntity> {
        await this._validateOrThrow(command);

        const {city , language} = command;

        const axios: IAxiosResult = await this._axiosService.send(city, language);
        const {error, temp_c, status} = axios;


        const entity = new WeatherEntity();
        entity.user_id = command.user_id;
        entity.action_time = command.action_time;
        entity.request_result = status;
        entity.temp_c = temp_c;

        await this.repository.save(entity)
        if (error) {
            throw new WeatherError(ErrorEnum.BadReq, error["error"]["message"]);
        }

        return entity;
    }

}
