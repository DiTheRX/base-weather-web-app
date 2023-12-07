import { DataSource } from 'typeorm';
import {forwardRef, Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getDataSourceToken, TypeOrmModule} from "@nestjs/typeorm";
import {WeatherController} from "./weather.controller";
import {PostgresWeatherRepository} from "../../../data/weather/postgres-weather.repository";
import {AxiosService} from "./axios.service";
import {WriteManager} from "../../../component/weather/write.manager";
import {AuthenticationModule} from "../authentication/authentication.module";
import {WeatherModel} from "../../../data/weather/weather.model";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([WeatherModel]),
        forwardRef(() => AuthenticationModule),
    ],
    controllers: [WeatherController],
    providers: [
        {
            provide: 'WeatherRepository',
            useFactory: (dataSource: DataSource) => {
                return new PostgresWeatherRepository(dataSource);
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: 'WeatherWriteManager',
            useFactory: (repository: PostgresWeatherRepository,config: ConfigService) => {
                const service = new AxiosService(
                    config.get('WeatherAPI_Host'),
                    config.get('WeatherAPI_Token'),
                );

                return new WriteManager(repository, service);
            },
            inject: ['WeatherRepository', ConfigService],
        },

    ],
    exports: ['WeatherWriteManager', 'WeatherRepository'],
})
export class WeatherModule {}
