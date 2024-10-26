import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const configService: ConfigService = app.get(ConfigService);

    app.enableCors();

    await app.init();

    const port: number = configService.get<number>('NODE_SERVER_PORT', 3000);

    await app.listen(port, () => {
        console.log(`[🚀 ready ] http://localhost:${port}`);
    });
}
bootstrap();
