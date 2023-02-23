import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    // Add your own validation logic here
    // for example, query user from a database
    const user = this.authService.validateUserCredentials(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
