import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectConnection() private readonly knex: Knex) {}

    async getAll({
        page,
        pageSize,
        search,
    }: {
        page: number;
        pageSize: number;
        search: string;
    }) {
        const dataQuery = this.knex<User>('users');

        if (search) {
            dataQuery
                .where('name', 'ilike', `%${search}%`)
                .orWhere('surname', 'ilike', `%${search}%`);
        }

        const totalCountQuery = dataQuery
            .clone()
            .count<{ total: number }>('* as total')
            .first();

        const offset = (page - 1) * pageSize;
        dataQuery.limit(pageSize).offset(offset);

        dataQuery.select(
            'id',
            'name',
            'surname',
            'email',
            'phone',
            'age',
            'country',
            'district',
            'role',
            this.knex.raw('created_at as "createdAt"'),
            this.knex.raw('updated_at as "updatedAt"'),
        );

        const [totalCount, data] = await Promise.all([
            totalCountQuery,
            dataQuery,
        ]);

        return {
            data,
            page,
            pageSize,
            total: +totalCount.total,
        };
    }

    async getById(id: number) {
        const user = await this.knex<User>('users')
            .where('id', id)
            .select(
                'id',
                'name',
                'surname',
                'email',
                'phone',
                'age',
                'country',
                'district',
                'role',
                this.knex.raw('created_at as "createdAt"'),
                this.knex.raw('updated_at as "updatedAt"'),
            )
            .first<Omit<User, 'password'>>();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
