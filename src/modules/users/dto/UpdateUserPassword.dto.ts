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

export class UpdateUserPasswordDto {
  // @IsNotEmpty({ message: 'Question is required' })
  // @Length(3, 255, { message: 'Question must be between 3 and 255 characters' })
  // question: string;
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

}
