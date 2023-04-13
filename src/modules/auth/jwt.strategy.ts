import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      _id: payload.sub,
      first_name : payload.first_name,
      last_name : payload.last_name,
      photo : payload.photo,
      username: payload.username,
      email: payload.email,
      phone_number: payload.phone_number,
    };
  }
}
