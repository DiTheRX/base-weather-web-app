import { DataSource, EntityManager } from 'typeorm';

import { AuthenticationModel } from './authentication.model';
import { authenticationToEntity, authenticationToModel } from './mapper';
import {AuthenticationRepository} from "../../component/authentication/authentication.repository";
import {AuthenticationRepository as RegAuthenticationRepository } from "../../component/registration/authentication.repository";

import {AuthenticationEntity} from "../../component/authentication/authentication.entity";

export class PostgresAuthenticationRepository implements AuthenticationRepository,RegAuthenticationRepository {
    private readonly dataSource: DataSource;
    private readonly manager: EntityManager;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.manager = dataSource.manager;
    }

    async getByLogin(login: string): Promise<AuthenticationEntity | null> {
        const model: AuthenticationModel | null = await this.manager.findOne(AuthenticationModel, {
            where: { login: login },
        });

        return model ? authenticationToEntity(model) : null;
    }

    async getByToken(token: string): Promise<AuthenticationEntity | null> {
        const model = await this.manager.findOne(AuthenticationModel, {
            where: { apiToken: token },
        });

        return model ? authenticationToEntity(model) : null;
    }

    async save(record: AuthenticationEntity): Promise<AuthenticationEntity> {
        const model = authenticationToModel(record);
        const result = await this.manager.save(model);

        return authenticationToEntity(result);
    }
}
