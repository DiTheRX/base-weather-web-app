import { DataSource } from 'typeorm';

import {  Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {AuthenticationModel} from "../../../data/authentication/authentication.model";
import {AuthenticationController} from "./authentication.controller";
import {PostgresAuthenticationRepository} from "../../../data/authentication/postgres-authentication.repository";
import {WriteManager} from "../../../component/authentication/write.manager";
import {Argon2EncryptionService} from "./argon2-encryption-service";
import {ReadManager} from "../../../component/authentication/read.manager";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([AuthenticationModel]),
    ],
    controllers: [AuthenticationController],
    providers: [
        {
            provide: 'AuthenticationRepository',
            useFactory: (dataSource: DataSource) => {
                return new PostgresAuthenticationRepository(dataSource);
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: 'AuthenticationWriteManager',
            useFactory: (repository: PostgresAuthenticationRepository) => {
                const service = new Argon2EncryptionService();

                return new WriteManager(repository, service);
            },
            inject: ['AuthenticationRepository'],
        },
        {
            provide: 'AuthenticationReadManager',
            useFactory: (repository: PostgresAuthenticationRepository) => {

                return new ReadManager(repository);
            },
            inject: ['AuthenticationRepository'],
        },
    ],
    exports: ['AuthenticationReadManager','AuthenticationWriteManager', 'AuthenticationRepository'],
})
export class AuthenticationModule {}
