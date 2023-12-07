import { validate } from 'class-validator';
import { AuthenticationError } from './authentication.error';
import { AuthenticationRepository } from './authentication.repository';
import { EncryptionService } from './encryption.service';
import { AuthenticationEntity } from './authentication.entity';
import { ErrorEnum } from '../error.enum';
import {RegistrationError} from "../registration/registration.error";
import {AuthenticationCommand} from "./command/authentication.command";

export class ReadManager{
    private readonly repository: AuthenticationRepository;
    constructor(repository: AuthenticationRepository) {
        this.repository = repository;
    }

    async getByToken(token: string): Promise<AuthenticationEntity> {
        const record = await this.repository.getByToken(token);
        return record;
    }
}
