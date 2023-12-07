import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import {EncryptionService} from "../../../../component/registration/encryption.service";

export class PasswordEncryptionService implements EncryptionService {
    async generatePasswordHash(password: string, salt: string): Promise<string> {
        return argon2.hash(`${password}${salt}`);
    }

    async generateSalt(): Promise<string> {
        return crypto.randomBytes(16).toString('base64');
    }
}
