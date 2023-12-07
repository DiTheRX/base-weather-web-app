import { v4 as uuid } from 'uuid';

export class AuthenticationEntity {
    public id: string = uuid();
    public login: string;
    public hash: string;
    public salt: string;
    public fio: string;
    public apiToken: string = uuid();
}
