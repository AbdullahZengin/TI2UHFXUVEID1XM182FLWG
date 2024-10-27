import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptModule } from 'src/common/bcrypt';

@Module({
    imports: [BcryptModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
