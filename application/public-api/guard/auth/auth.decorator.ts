import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RequestersAuth } from './auth.type';

export const AuthDecorator = createParamDecorator(async (data: unknown, ctx: ExecutionContext): Promise<RequestersAuth> => {
    const request = ctx.switchToHttp().getRequest();

    if (!request['auth']) {
        throw new UnauthorizedException(`Authorization required for that action.`);
    }

    return request['auth'];
});
