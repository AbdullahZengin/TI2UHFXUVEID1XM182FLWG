import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import { mockUsers } from './data/mock-user.data';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private client: Client;
    private dbName: string = this.configService.get<string>(
        'POSTGRES_DB_DATABASE',
        'study-case',
    );
    private host: string = this.configService.get<string>(
        'POSTGRES_DB_HOST',
        'localhost',
    );
    private port: number = this.configService.get<number>(
        'POSTGRES_DB_PORT',
        5432,
    );
    private user: string = this.configService.get<string>(
        'POSTGRES_DB_USER',
        'postgres',
    );
    private password: string = this.configService.get<string>(
        'POSTGRES_DB_PASSWORD',
        'postgres',
    );

    constructor(private configService: ConfigService) {
        this.client = new Client({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: 'postgres',
        });
    }

    async onModuleInit() {
        await this.client.connect();
        await this.createDatabase();
        await this.client.end();

        this.client = new Client({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.dbName,
        });

        await this.client.connect();

        await this.createTableAndPopulate();

        this.client.end();
    }

    private async createDatabase() {
        const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${this.dbName}';`;

        const res = await this.client.query(checkDbQuery);

        if (res.rowCount === 0) {
            console.log(`Database ${this.dbName} does not exist. Creating...`);

            const createDbQuery = `CREATE DATABASE "${this.dbName}";`;
            await this.client.query(createDbQuery);

            console.log(`Database ${this.dbName} created.`);
        }
    }

    private async createTableAndPopulate() {
        const checkTableQuery = `SELECT 1 FROM information_schema.tables WHERE table_name = 'users';`;

        const res = await this.client.query(checkTableQuery);

        if (res.rowCount === 0) {
            console.log(
                `users table does not exist. Creating and populating...`,
            );

            const createTableQuery = `
               CREATE TABLE "users" (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    surname VARCHAR(50) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    age INT CHECK (age >= 0),
                    country VARCHAR(100),
                    district VARCHAR(100),
                    role VARCHAR(10) CHECK (role IN ('USER', 'MODERATOR','ADMIN')) NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ DEFAULT NULL
                );
            `;

            await this.client.query(createTableQuery);

            console.log(`users table created.`);

            const insertQuery = this.generateInsertQuery();
            await this.client.query(insertQuery);

            console.log(`users table populated.`);

            console.log(`Database setup completed.`);
        }
    }

    private generateInsertQuery() {
        const values = mockUsers
            .map(
                (user) =>
                    `('${user.name}', '${user.surname}', '${user.email}', '${
                        user.password
                    }', ${user.phone ? `'${user.phone}'` : 'NULL'}, ${user.age}, ${
                        user.country ? `'${user.country}'` : 'NULL'
                    }, ${user.district ? `'${user.district}'` : 'NULL'}, '${
                        user.role
                    }')`,
            )
            .join(',\n');

        return `INSERT INTO "users" (name, surname, email, password, phone, age, country, district, role)\nVALUES\n${values};`;
    }
}
