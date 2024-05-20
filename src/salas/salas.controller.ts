import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SalaPerguntaResponse } from './response/sala-pergunta-response';
import { ErroInterno } from 'src/biblioteca/Err/erro-interno';
import { ListaPerguntasResponse } from './response/lista-salas-response';
import { ErroUnauthorized } from 'src/biblioteca/Err/erro-unauthorized';
import { ErroUsuario } from 'src/usuarios/response/err/erro-usuario';
import { SalaResponse } from './response/sala-response';
import { DeleteGeneral } from 'src/biblioteca/Err/delete-general';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get('solitario/:cod')
  @ApiOperation({
    summary: 'Encontra a sala e perguntas',
    description:
      'Encontra a sala pelo codigo solicitado e traz todas as perguntas cadastradas dentro dela',
  })
  @ApiOkResponse({
    type: SalaPerguntaResponse,
    description: 'Resposta da api ao encontrar a mesa para iniciar o jogo.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'cod',
    description: 'Codigo de identificação da mesa',
    example: 'LELHiO',
  })
  findPerguntasSala(@Param('cod') cod: string) {
    return this.salasService.findPerguntasSala(cod);
  }

  @Get('publicas')
  @ApiOperation({
    summary: 'Busca por todas as sala publicas',
  })
  @ApiOkResponse({
    type: ListaPerguntasResponse,
    description:
      'Resposta da api encontrando todas as mesas disponiveis como publicas',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  findSalasPublicas() {
    return this.salasService.findSalasPublicas();
  }

  @Post('cadastro')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cadastra uma sala pelo usuario',
  })
  @ApiResponse({
    status: 201,
    type: ListaPerguntasResponse,
    description:
      'Retorno de todas as mesas cadastradas do usuario dps de cadastrar a nova.',
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
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salasService.create(createSalaDto);
  }

  @Get('responsavel/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca todas as mesas do usuario',
  })
  @ApiOkResponse({
    type: ListaPerguntasResponse,
    description: 'Retornando todas as mesas cadastradas pelo usuario',
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
    description: 'Id do usuario no sistema do banco',
    example: '663de96267b9531920a75b14',
  })
  findSalasByPlayer(@Param('id') id: string) {
    return this.salasService.findByPlayer(id);
  }

  @Get(':cod')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca uma mesa',
    description: 'Busca por uma mesa especifica através do codigo dela',
  })
  @ApiOkResponse({
    type: SalaResponse,
    description: 'Mesa encontrada com sucesso',
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
    name: 'cod',
    description: 'Codigo da mesa cadastrada',
    example: 'LELHiO',
  })
  findOne(@Param('cod') cod: string) {
    return this.salasService.findOne(cod);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualiza a mesa',
    description: 'Atualiza a mesa especifica atravez de seu id do banco',
  })
  @ApiOkResponse({
    type: SalaResponse,
    description: 'Mesa encontrada com sucesso',
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
    description: 'Id da mesa cadastrada',
    example: '6636d1eed0607d8c3cae7cbe',
  })
  update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto) {
    return this.salasService.update(id, updateSalaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta tudo da mesa',
    description:
      'Deleta a mesa especifica junto de todas as perguntas cadastradas com ela atravez do seu id',
  })
  @ApiOkResponse({
    type: DeleteGeneral,
    description: 'Mesa deletada junto de todas as perguntas com ela',
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
    description: 'Id da mesa cadastrada',
    example: '6636d1eed0607d8c3cae7cbe',
  })
  remove(@Param('id') id: string) {
    return this.salasService.remove(id);
  }
}
