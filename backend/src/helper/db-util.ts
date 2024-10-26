import { ConfigService } from '@nestjs/config';
import { DbConnectionOptions } from 'src/common/interfaces/db-connection-options.interface';

export class DBUtil {
    static getPostgresConnectionOptions(
        configService: ConfigService,
    ): DbConnectionOptions {
        return {
            host: configService.get<string>('POSTGRES_DB_HOST', 'localhost'),
            user: configService.get<string>('POSTGRES_DB_USER', 'postgres'),
            port: configService.get<number>('POSTGRES_DB_PORT', 5432),
            password: configService.get<string>('POSTGRES_DB_PASSWORD','postgres'),
            database: configService.get<string>('POSTGRES_DB_DATABASE','usersdot-case'),
        };
    }
}
