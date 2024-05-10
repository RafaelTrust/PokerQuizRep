import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Get('verifica-cadastro/:cod')
  async verificaCadastro(@Param('cod') cod: string) {
    return await this.usuariosService.verificaCadastro(cod);
  }

  @Get('verifica-nick/:nick')
  async verificaNick(@Param('nick') nick: string) {
    return await this.usuariosService.verificaNick(nick);
  }

  @Get('verifica-email/:email')
  async verificaEmail(@Param('nick') nick: string) {
    return await this.usuariosService.verificaEmail(nick);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usuariosService.findAll();
  }

  @Get('email/:email')
  async findEmail(@Param('email') email: string) {
    return await this.usuariosService.findEmail(email);
  }

  @Get('esquece/:cod')
  async esqueciSenha(@Param('cod') cod: string) {
    return await this.usuariosService.esqueciSenha(cod);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':nick')
  async findOne(@Param('nick') nick: string) {
    return await this.usuariosService.findOne(nick);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  async update(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Param('id') id: string,
  ) {
    return await this.usuariosService.update(updateUsuarioDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usuariosService.remove(id);
  }
}
