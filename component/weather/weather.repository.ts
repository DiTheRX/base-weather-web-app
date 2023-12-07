import { WeatherEntity } from './weather.entity';

export interface WeatherRepository {
    save(entity: WeatherEntity): Promise<WeatherEntity | null>;
}
