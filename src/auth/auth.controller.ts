import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErroLogin } from './response/err/erro-login';
import { TokenResponse } from 'src/usuarios/response/sucess/token-response';
import { ErroInterno } from 'src/Err/erro-interno';
import { LogoutResponse } from './response/logout-response';
import { ErroUnauthorized } from 'src/Err/erro-unauthorized';
import { LoginDto } from './dto/login-dto';
import { CreatedTokenResponse } from './response/token-criado-response';

@ApiTags('Login')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Realisa o login do usuario
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({
    status: 201,
    type: CreatedTokenResponse,
    description: 'Login realizado comm sucesso',
  })
  @ApiResponse({
    status: 401,
    type: ErroLogin,
    description: 'Token não autorizado.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Formulario para se logar no jogo',
  })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  /**
   * Realisa o logout do usuario descartando o token criado
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: LogoutResponse,
    description: 'Token descartado com sucesso',
  })
  @ApiResponse({
    status: 401,
    type: ErroUnauthorized,
    description: 'Token não autorizado.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario.',
  })
  async logout(@Req() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    await this.authService.revokeToken(token);
    return { mensagem: 'deslogado com sucesso' };
  }
}
