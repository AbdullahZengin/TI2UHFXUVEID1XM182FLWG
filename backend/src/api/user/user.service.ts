import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Knex, KnexTimeoutError } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from 'src/common/bcrypt';
import { SuccessResponse } from 'src/common/responses/success.response';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private bcryptService: BcryptService,
    ) {}

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

        const totalCount = await dataQuery
            .clone()
            .count<{ total: number }>('* as total')
            .first();

        if (page > Math.ceil(+totalCount.total / pageSize)) {
            page = 1;
        }

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

        const data = await dataQuery;

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

    async create(createUserDto: CreateUserDto) {
        const userExists = await this.checkUserExistsByEmail(
            createUserDto.email,
        );

        if (userExists) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await this.bcryptService.hash(
            createUserDto.password,
        );

        await this.knex<User>('users').insert({
            ...createUserDto,
            password: hashedPassword,
        });

        return SuccessResponse;
    }

    async update(updateUserDto: UpdateUserDto) {
        const user = await this.knex<User>('users')
            .where('id', updateUserDto.id)
            .first();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const userExists = await this.checkUserExistsByEmail(
                updateUserDto.email,
            );

            if (userExists) {
                throw new ConflictException(
                    'User already exists with this email',
                );
            }
        }

        if (updateUserDto.password) {
            updateUserDto.password = await this.bcryptService.hash(
                updateUserDto.password,
            );
        }

        await this.knex('users')
            .where('id', updateUserDto.id)
            .update({
                ...updateUserDto,
                updated_at: new Date().toISOString(),
            });

        return SuccessResponse;
    }

    async checkUserExistsByEmail(email: string) {
        const user = await this.knex<User>('users')
            .where('email', email)
            .first();

        return !!user;
    }
}
