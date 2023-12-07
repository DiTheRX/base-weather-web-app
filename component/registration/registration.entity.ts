import { v4 as uuid } from 'uuid';

/**
 * Представление сущности Registration
 */
export class RegistrationEntity {
    public id: string = uuid();
    public apiToken: string;
    public login: string;
    public fio: string;
}