export interface EncryptionService {
    verifyHash(hash: string, plain: string): Promise<boolean>;
}
