import { NestFactory } from '@nestjs/core';
import Helmet from 'helmet';
import { AppModule } from './app.module';
import { ExceptionFilters } from './exception.filters';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //#region Use Middleware
    app.use(Helmet());
    //#endregion

    app.enableCors({
        origin: '*',
    });

    app.useGlobalFilters(new ExceptionFilters());

    await app.listen(3000);
}
bootstrap();
