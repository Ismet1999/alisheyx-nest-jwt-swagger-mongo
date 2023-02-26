import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { toBoolean, toNumber } from 'src/common/helper/cast.helper';

export class FindInvoiceDto {
  @ApiProperty({
    example: 1,
    description: 'Page',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'page must be a valid number' })
  @Type(() => Number)
  page: string;

  @ApiProperty({
    example: 10,
    description: 'Limit',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'limit must be a valid number' })
  @Type(() => Number)
  limit: string;

  @ApiProperty({
    example: '63f7d9078f6d39f09bdb90fa',
    description: 'Invoice status',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'status must be a valid string' })
  status: string;

  @ApiProperty({
    example: 'true',
    description: 'Invoice all',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'status must be a valid string true or false' })
  all_user: 'true' | 'false';

  // @ApiProperty({
  //   example: false,
  //   description: 'all user',
  //   required: false,
  // })
  // @Transform(({ value }) => toBoolean(value))
  // @IsBoolean()
  // @IsOptional()
  // public all_user: boolean;
}
