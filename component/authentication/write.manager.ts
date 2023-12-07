import { validate } from 'class-validator';
import { AuthenticationError } from './authentication.error';
import { AuthenticationRepository } from './authentication.repository';
import { EncryptionService } from './encryption.service';
import { AuthenticationEntity } from './authentication.entity';
import { ErrorEnum } from '../error.enum';
import {AuthenticationCommand} from "./command/authentication.command";

export class WriteManager{
    private readonly repository: AuthenticationRepository;
    private readonly encryptionService: EncryptionService;

    constructor(repository: AuthenticationRepository, encryptionService: EncryptionService) {
        this.repository = repository;
        this.encryptionService = encryptionService;
    }

    async _validateOrThrow(command: object): Promise<void> {
        const validationErrors = await validate(command);
        if (validationErrors.length > 0) {
            throw new AuthenticationError(ErrorEnum.Validation, 'The incoming data object did not pass the validation process');
        }
    }
    async authenticate(command: AuthenticationCommand): Promise<AuthenticationEntity> {
        await this._validateOrThrow(command);

        const record = await this.repository.getByLogin(command.login);
        if (record === null) {
            throw new AuthenticationError(ErrorEnum.Credential, 'Record with matching credentials was not found');
        }

        const isPasswordCorrect = await this.encryptionService.verifyHash(record.hash, `${command.password}${record.salt}`);
        if (isPasswordCorrect === false) {
            throw new AuthenticationError(ErrorEnum.Credential, 'Record with matching credentials was not found');
        }

        return record;
    }

}
