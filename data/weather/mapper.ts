import {WeatherModel} from "./weather.model";
import {WeatherEntity} from "../../component/weather/weather.entity";

export function weatherToEntity(model: WeatherModel): WeatherEntity {
    const entity = new WeatherEntity();
    entity.id = model.id;
    entity.user_id = model.user_id;
    entity.action_time = model.action_time;
    entity.request_result = model.request_result;
    entity.temp_c = model.temp_c;

    return entity;
}

export function weatherToModel(entity: WeatherEntity): WeatherModel {
    const model = new WeatherModel();
    model.id = entity.id;
    model.user_id = entity.user_id;
    model.action_time = entity.action_time;
    model.request_result = entity.request_result;
    model.temp_c = entity.temp_c;

    return model;
}