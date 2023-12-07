import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class RegistrationCommand {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    public login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[^.,!_]+$/, {
        message: 'Password must not contain ., !, or _',
    })
    public password: string;

    @IsNotEmpty()
    @IsString()
    public fio: string;
}
