import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Status title',
  })
  @IsNotEmpty({ message: 'username' })
  @IsString({ message: 'username must be a valid string' })
  username: object;

  @ApiProperty({
    example: 'Pass1234',
    description: 'Password',
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a valid string' })
  password: string;
}
