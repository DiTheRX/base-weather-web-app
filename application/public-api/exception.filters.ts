import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {ErrorEnum} from "../../component/error.enum";
import {AuthenticationError} from "../../component/authentication/authentication.error";
import {RegistrationError} from "../../component/registration/registration.error";
import {WeatherError} from "../../component/weather/weather.error";


type Exception = Error & { code: string; error: ErrorEnum; details?: unknown };

@Catch(AuthenticationError, RegistrationError, WeatherError)
export class ExceptionFilters implements ExceptionFilter {
    private readonly _statusCode = new Map<ErrorEnum, number>([
        [ErrorEnum.Credential, 401],
        [ErrorEnum.NotFound, 404],
        [ErrorEnum.Conflict, 409],
        [ErrorEnum.Validation, 422],
        [ErrorEnum.BadReq, 422],
        [ErrorEnum.RunTime, 500],
    ]);

    catch(exception: Exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = this.getStatusCode(exception.error);

        response.status(status).json({
            code: exception.code,
            error: exception.error,
            message: exception.message,
            details: exception.details,
        });
    }

    private getStatusCode(error: ErrorEnum): number {
        if (this._statusCode.has(error) === false) {
            return 418;
        } else {
            const statusCode = this._statusCode.get(error);

            return statusCode ?? 500;
        }
    }
}
