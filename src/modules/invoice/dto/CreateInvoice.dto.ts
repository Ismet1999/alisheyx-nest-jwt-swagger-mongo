import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    example: { key: 'value', key1: 'value' },
    description: 'This is Data ',
  })
  @IsOptional()
  @IsObject({ message: 'data must be a valid Object' })
  data: object;

  @ApiProperty({
    example: '63f7d9078f6d39f09bdb90fa',
    description: 'Invoice status',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsString({ message: 'status must be a valid string' })
  status: string;

  user: string;
}
