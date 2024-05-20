import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CadastroResponse } from './response/sucess/cadastro-response';
import { UsuarioResponse } from './response/sucess/usuario_response';
import { TokenResponse } from './response/sucess/token-response';
import { NickValidoResponse } from './response/sucess/nick-response';
import { EmailValidoResponse } from './response/sucess/email-response';
import { ErroCodigo } from './response/err/erro-codigo';
import { ErroInterno } from 'src/biblioteca/Err/erro-interno';
import { ErroCadastro } from './response/err/erro-cadastro';
import { ErroEmail } from './response/err/erro-email';
import { ErroUnauthorized } from 'src/biblioteca/Err/erro-unauthorized';
import { ErroUsuario } from './response/err/erro-usuario';
import { DeleteGeneral } from 'src/biblioteca/Err/delete-general';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro')
  @ApiOperation({
    summary: 'Cria o cadastro do usuario',
  })
  @ApiResponse({
    status: 201,
    type: CadastroResponse,
    description:
      'Resposta da api com o codigo de validação do usuario enviado também por email.',
  })
  @ApiResponse({
    status: 409,
    type: ErroCadastro,
    description:
      'Erro ao cadastrar por ter tido conflito com email ou nick ja existentes.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<string> {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Get('verifica-cadastro/:cod')
  @ApiOperation({
    summary: 'Valida o cadastro',
    description: 'Faz o usuario estar finalmente validado para uso',
  })
  @ApiOkResponse({
    type: TokenResponse,
    description: 'Resposta da api ao encontrar e validar o usuario.',
  })
  @ApiResponse({
    status: 400,
    type: ErroCodigo,
    description: 'O codigo usado é invalido',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'cod',
    description: 'A identificação da validação do usuario.',
    example: '923292',
  })
  async verificaCadastro(@Param('cod') cod: string) {
    return await this.usuariosService.verificaCadastro(cod);
  }

  @Get('verifica-nick/:nick')
  @ApiOperation({
    summary: 'Nick é permmitido?',
    description:
      'Verifica se o nick fornecido ja existe no sistema para validar um novo possivel cadastro',
  })
  @ApiOkResponse({
    type: NickValidoResponse,
    description: 'Resposta da api se esta disponivel o nick para cadastro',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'nick',
    description: 'A identificação unica do jogador para ser cadastrado.',
    example: 'RafaelTrust',
  })
  async verificaNick(@Param('nick') nick: string) {
    return await this.usuariosService.verificaNick(nick);
  }

  @Get('verifica-email/:email')
  @ApiOperation({
    summary: 'Email é permitido?',
    description:
      'Verifica se o email fornecido ja existe no sistema para validar um novo possivel cadastro',
  })
  @ApiOkResponse({
    type: EmailValidoResponse,
    description: 'Resposta da api se esta disponivel o email para cadastro',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'email',
    description: 'Email do usuario para ser cadastrado.',
    example: 'rafaelimaferreira@gmail.com',
  })
  async verificaEmail(@Param('email') email: string) {
    return await this.usuariosService.verificaEmail(email);
  }

  @Get('email/:email')
  @ApiOperation({
    summary: 'Busca email',
    description:
      'Busca email para recuperação de senha esquecida enviando um codigo de recuperação por email.',
  })
  @ApiOkResponse({
    type: UsuarioResponse,
    description: 'Resposta da api ao encontrar algum nick existente.',
  })
  @ApiResponse({
    status: 404,
    type: ErroEmail,
    description: 'Erro ao encontrar o email para recuperação de senha.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'email',
    description: 'Email do usuario para renovar senha perdida.',
    example: 'rafaelimaferreira@gmail.com',
  })
  async findEmail(@Param('email') email: string) {
    return await this.usuariosService.findEmail(email);
  }

  /**
   * Verifica se o codigo de recuperação de senha esta correto
   */
  @Get('esquece/:cod')
  @ApiOperation({
    summary: 'Codigo de recuperação de senha',
    description: 'Verifica se o codigo de recuperação de senha esta correto',
  })
  @ApiOkResponse({
    type: TokenResponse,
    description: 'Resposta da api ao encontrar algum nick existente.',
  })
  @ApiResponse({
    status: 400,
    type: ErroCodigo,
    description: 'O codigo usado é invalido',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'cod',
    description: 'Codigo de recuperação de senha',
    example: '939040',
  })
  async esqueciSenha(@Param('cod') cod: string) {
    return await this.usuariosService.esqueciSenha(cod);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':nick')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca usuario pelo nick',
    description: 'Busca dados do usuario pelo seu nick',
  })
  @ApiOkResponse({
    type: UsuarioResponse,
    description: 'Dados do usuario recuperado com sucesso',
  })
  @ApiResponse({
    status: 404,
    type: ErroUsuario,
    description: 'Usuario não encontrado.',
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
  @ApiParam({
    name: 'nick',
    description: 'Nick do usuario existente',
    example: 'RafaelTrust',
  })
  async findOne(@Param('nick') nick: string) {
    return await this.usuariosService.findOne(nick);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualiza dados do usuario',
  })
  @ApiOkResponse({
    type: UsuarioResponse,
    description: 'Usuario atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    type: ErroUsuario,
    description: 'Usuario não encontrado.',
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
  @ApiParam({
    name: 'id',
    description: 'id do usuario existente',
    example: '663d743e7f23ac859733eac0',
  })
  async update(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Param('id') id: string,
  ) {
    return await this.usuariosService.update(updateUsuarioDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta usuario',
  })
  @ApiOkResponse({
    type: DeleteGeneral,
    description: 'Usuario deletado com sucesso',
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
  @ApiParam({
    name: 'id',
    description: 'Id do usuario existente',
    example: '663af0503b99e8720c507512',
  })
  async remove(@Param('id') id: string) {
    return await this.usuariosService.remove(id);
  }
}
