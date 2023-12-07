import { v4 as uuid } from 'uuid';

export class WeatherEntity {
    public id: string = uuid();
    public user_id: string;
    public action_time: number;
    public request_result: number;
    public temp_c: number;
}
