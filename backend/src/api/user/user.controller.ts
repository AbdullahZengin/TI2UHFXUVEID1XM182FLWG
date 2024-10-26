import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetAllUserQueryDto } from './dto/get-all-user-query.dto';

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
}
