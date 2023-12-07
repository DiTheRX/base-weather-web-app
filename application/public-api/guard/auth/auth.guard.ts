import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import {ReadManager} from "../../../../component/authentication/read.manager";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AuthenticationReadManager')
        private readonly authManager: ReadManager,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const { apiToken } = request.body;
        if (!apiToken) {
            throw new UnauthorizedException('Token Not Valid');
        }

        let auth = await this.authManager.getByToken(apiToken);
        if (!auth) {
            throw new UnauthorizedException('Token Not Valid');
        }

        try {
            request['auth'] = auth;
        } catch (e) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
