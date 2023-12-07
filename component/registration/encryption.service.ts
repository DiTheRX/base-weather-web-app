export interface EncryptionService {
    generatePasswordHash(password: string, salt: string): Promise<string>;
    generateSalt(): Promise<string>;
}
