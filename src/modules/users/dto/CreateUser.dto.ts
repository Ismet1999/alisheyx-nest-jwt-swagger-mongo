import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class CreateUserDto {
  // @IsNotEmpty({ message: 'Question is required' })
  // @Length(3, 255, { message: 'Question must be between 3 and 255 characters' })
  // question: string;
  @ApiProperty({ example: 'username', description: 'User name' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: 'Password is too weak' },
  )
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @ApiProperty({ example: '123456', description: 'User confirm password' })
  @IsNotEmpty({ message: 'confirm_password is required' })
  @Match('password', { message: 'Passwords do not match' })
  confirm_password: string;

  @ApiProperty({ example: '+998912345678', description: 'User phone number' })
  @IsOptional()
  @IsPhoneNumber('UZ', { message: 'Invalid phone number' })
  phone_number: string;

  @ApiProperty({ example: 'example@mail.com', description: 'User email' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  // first_name;
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsNotEmpty({ message: 'first_name is required' })
  @IsString({ message: 'first_name must be a valid string' })
  first_name: string;

  // last_name;
  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsNotEmpty({ message: 'last_name is required' })
  @IsString({ message: 'last_name must be a valid string' })
  last_name: string;
}
