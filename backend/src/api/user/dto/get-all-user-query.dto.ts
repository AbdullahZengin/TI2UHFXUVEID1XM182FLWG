import { Transform, Type } from 'class-transformer';
import {
    IsInt,
    IsNumberString,
    IsOptional,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';

export class GetAllUserQueryDto {
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    pageSize: number;

    @IsOptional()
    search: string;
}
