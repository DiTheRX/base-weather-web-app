import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';
import {WeatherModule} from "./weather/weather.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DataBase_Host'),
                port: config.get<number>('DataBase_Port'),
                username: config.get<string>('DataBase_UserName'),
                password: config.get<string>('DataBase_Password'),
                database: config.get<string>('DataBase_Name'),
                synchronize: true,
                entities: [],
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        AuthenticationModule,
        RegistrationModule,
        WeatherModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    constructor(
        @Inject(ConfigService) private configService: ConfigService,
    ) {}
}
