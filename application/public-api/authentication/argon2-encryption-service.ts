import * as argon2 from 'argon2';
import {EncryptionService} from "../../../component/authentication/encryption.service";

export class Argon2EncryptionService implements EncryptionService {
    async verifyHash(hash: string, plain: string): Promise<boolean> {
        return argon2.verify(hash, plain);
    }
}
