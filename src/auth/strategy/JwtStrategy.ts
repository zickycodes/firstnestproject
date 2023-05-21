import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserInterface } from './user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_Secret'), // Use ConfigService to retrieve JWT secret
    });
  }

  async validate(payload: any): Promise<UserInterface> {
    const user: UserInterface = {
      userId: payload.sub,
      useremail: payload.email,
      userrole: payload.role,
    };
    return user;
  }
}
