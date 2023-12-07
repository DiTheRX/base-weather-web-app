import { v4 as uuid } from 'uuid';
import { ErrorEnum } from '../error.enum';

export class AuthenticationError extends Error {
    public readonly code: string = uuid();
    public readonly error: ErrorEnum;
    public readonly details?: unknown;

    constructor(error: ErrorEnum, message: string, details?: unknown) {
        super(message);
        this.error = error;
        this.details = details;
    }
}
