import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsObject } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    example: { ru: 'Ru', uz: 'Uz' },
    description: 'Status title',
  })
  @IsNotEmpty({ message: 'title is required' })
  @IsObject({ message: 'title must be a valid Object' })
  title: object;

  @ApiProperty({
    example: '#000000',
    description: 'Status color',
  })
  @IsHexColor({ message: 'color must be a valid hex color' })
  color: string;
}
