import {AuthenticationEntity} from "../authentication/authentication.entity";


export interface AuthenticationRepository {
    save(authentication: AuthenticationEntity): Promise<AuthenticationEntity>;
}
