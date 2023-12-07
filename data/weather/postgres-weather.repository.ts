import { DataSource, EntityManager } from 'typeorm';

import {WeatherRepository} from "../../component/weather/weather.repository";
import {WeatherEntity} from "../../component/weather/weather.entity";
import {weatherToEntity, weatherToModel} from "./mapper";

export class PostgresWeatherRepository implements WeatherRepository {
    private readonly dataSource: DataSource;
    private readonly manager: EntityManager;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.manager = dataSource.manager;
    }

    async save(record: WeatherEntity): Promise<WeatherEntity> {
        const model = weatherToModel(record);
        const result = await this.manager.save(model);

        return weatherToEntity(result);
    }
}
