import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
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
}
