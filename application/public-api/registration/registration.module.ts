import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {PasswordEncryptionService} from "./service/encryption.service";
import {RegistrationController} from "./registration.controller";
import {PostgresAuthenticationRepository} from "../../../data/authentication/postgres-authentication.repository";
import {WriteManager} from "../../../component/registration/write.manager";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'RegistrationWriteManager',
            useFactory: (dataSource: DataSource) => {
                const authenticationRepository = new PostgresAuthenticationRepository(dataSource);
                const encryptionService = new PasswordEncryptionService();

                return new WriteManager(authenticationRepository, encryptionService);
            },
            inject: [getDataSourceToken()],
        }
    ],
    controllers: [RegistrationController],
})
export class RegistrationModule {}
