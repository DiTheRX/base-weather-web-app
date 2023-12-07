import {AuthenticationModel} from "./authentication.model";
import {AuthenticationEntity} from "../../component/authentication/authentication.entity";

export function authenticationToEntity(model: AuthenticationModel): AuthenticationEntity {
    const entity = new AuthenticationEntity();
    entity.id = model.id;
    entity.salt = model.salt;
    entity.hash = model.hash;
    entity.login = model.login;
    entity.fio = model.fio;
    entity.apiToken = model.apiToken;

    return entity;
}

export function authenticationToModel(entity: AuthenticationEntity): AuthenticationModel {
    const model = new AuthenticationModel();
    model.id = entity.id;
    model.salt = entity.salt;
    model.hash = entity.hash;
    model.login = entity.login;
    model.fio = entity.fio;
    model.apiToken = entity.apiToken;
    return model;
}