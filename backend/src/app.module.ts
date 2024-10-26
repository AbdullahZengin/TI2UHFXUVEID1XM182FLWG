import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { DBUtil } from './helper/db-util';
import { UserModule } from './api/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        KnexModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const config =
                    DBUtil.getPostgresConnectionOptions(configService);

                return {
                    config: {
                        client: 'pg',
                        connection: {
                            host: config.host,
                            user: config.user,
                            port: config.port,
                            password: config.password,
                            database: config.database,
                        },
                    },
                };
            },
            inject: [ConfigService],
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        MorganMiddleware.configure('common');
        consumer.apply(MorganMiddleware).forRoutes('*');
    }
}
