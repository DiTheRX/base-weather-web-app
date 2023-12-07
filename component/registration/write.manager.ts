import { validate } from 'class-validator';

import { RegistrationError } from './registration.error';
import { ErrorEnum } from '../error.enum';
import { RegistrationCommand } from './commands/registration.command';
import { RegistrationEntity } from './registration.entity';
import { EncryptionService } from './encryption.service';
import { AuthenticationRepository } from './authentication.repository';
import {AuthenticationEntity} from "../authentication/authentication.entity";



export class WriteManager {
    private readonly authenticationRepository: AuthenticationRepository;
    private readonly encryptionService: EncryptionService;

    constructor(authenticationRepository: AuthenticationRepository, encryptionService: EncryptionService) {
        this.authenticationRepository = authenticationRepository;
        this.encryptionService = encryptionService;
    }

    async _validateOrThrow(command: object): Promise<void> {
        const validationErrors = await validate(command);
        console.log(validationErrors)
        if (validationErrors.length > 0) {
            throw new RegistrationError(ErrorEnum.Validation, 'The incoming data object did not pass the validation process');
        }
    }

    async registration(command: RegistrationCommand): Promise<RegistrationEntity> {
        const com = new RegistrationCommand();
        com.fio = command.fio;
        com.login = command.login;
        com.password = command.password;

        await this._validateOrThrow(com);

        const authentication = new AuthenticationEntity();

        const salt = await this.encryptionService.generateSalt();

        authentication.fio = command.fio;
        authentication.login = command.login;
        authentication.salt = salt;
        authentication.hash = await this.encryptionService.generatePasswordHash(command.password, salt);

        const authenticationRepository = await this.authenticationRepository.save(authentication);

        const registration = new RegistrationEntity();
        registration.fio = authenticationRepository.fio;
        registration.login = authenticationRepository.login;
        registration.apiToken = authenticationRepository.apiToken;

        return registration;
    }
}
