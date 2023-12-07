import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class WeatherCommand {
    @IsNotEmpty()
    @IsString()
    public city: string;

    @IsNotEmpty()
    @IsString()
    public action_time: number;

    @IsNotEmpty()
    @IsString()
    public user_id: string;

    @IsOptional()
    @IsString()
    public language: string = "ru"
}
