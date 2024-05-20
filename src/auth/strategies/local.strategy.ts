import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const usuario = await this.authService.validateUser(email, password);

    if (!usuario)
      throw new HttpException(
        { statusCode: 401, message: 'Email ou Senha Invalidos' },
        HttpStatus.UNAUTHORIZED,
      );

    return usuario;
  }
}
