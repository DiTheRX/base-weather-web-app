import { AuthenticationEntity } from './authentication.entity';

export interface AuthenticationRepository {
    getByLogin(email: string): Promise<AuthenticationEntity | null>;
    getByToken(id: string): Promise<AuthenticationEntity | null>;
}
