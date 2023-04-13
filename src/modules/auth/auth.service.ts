import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../users/hash.service';
import { Users } from '../users/users.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}
  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<Users | Error> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new BadRequestException();
    const valid = await this.hashService.comparePassword(
      password,
      user.password,
    );

    if (!valid) throw new UnauthorizedException();

    return user;
  }
  async generateToken(user: Users) {
    // Generate JWT token here
    return {
      access_token: this.jwtService.sign({
        sub: user._id,
        first_name : user.first_name,
        last_name : user.last_name,
        photo : user.photo,
        email: user.email,
        username: user.username,
        phone_number: user.phone_number,
      }),
      data: user,
    };
  }
}
