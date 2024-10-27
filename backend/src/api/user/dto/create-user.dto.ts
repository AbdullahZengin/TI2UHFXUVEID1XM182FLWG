import {
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    IsStrongPassword,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Role } from '../interfaces/user.interface';

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    surname: string;

    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(255)
    @IsStrongPassword(
        {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message:
                'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
        },
    )
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @IsOptional()
    phone?: string;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    @IsOptional()
    age?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @IsOptional()
    country?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @IsOptional()
    district?: string;

    @IsEnum(Role)
    role: Role;
}
