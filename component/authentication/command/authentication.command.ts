import {IsNotEmpty, IsString} from "class-validator";

export class AuthenticationCommand {
    @IsNotEmpty()
    @IsString()
    public login: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}
