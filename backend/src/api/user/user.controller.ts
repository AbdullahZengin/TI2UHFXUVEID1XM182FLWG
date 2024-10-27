import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetAllUserQueryDto } from './dto/get-all-user-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(@Query() { page, pageSize, search }: GetAllUserQueryDto) {
        return this.userService.getAll({
            page,
            pageSize,
            search,
        });
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getById(id);
    }

    @Post('save')
    async save(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('update')
    async update(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(updateUserDto);
    }
}
