import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    let id = payload.rawHeaders.indexOf('Authorization');
    const token = payload.rawHeaders[id + 1].split(' ')[1];
    if (await this.authService.isTokenRevoked(token)) {
      return null;
    }

    return { sub: payload.sub, email: payload.email };
  }
}
