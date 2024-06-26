import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecordeService } from './recorde.service';
import { RecordeCreateDto } from './dto/recorde-create.dto';
import { EstatisticaCompletoCreateDto } from './dto/estatistica-create.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecordeResponse } from './response/recorde-response';
import { ErroInterno } from 'src/biblioteca/Err/erro-interno';
import { ListaRecordeResponse } from './response/lista-recorde-response';
import { listaEstatisticaResponse } from './response/lista-estatistica-response';
import { ErroRecorde } from './response/err/erro-recorde';
import { EstatisticaResponse } from './response/estatistica- response';
import { ErroEstatistica } from './response/err/erro-estatistica';

@ApiTags('Recorde')
@Controller('recorde')
export class RecordeController {
  constructor(private readonly recordeService: RecordeService) {}

  @Post('criar')
  @ApiOperation({
    summary: 'Cria recorde',
    description: 'Cria um registro de recorde após a conclusão do jogo online',
  })
  @ApiResponse({
    status: 201,
    type: RecordeResponse,
    description: 'Recorde foi cadastrado com sucesso',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  createRecorde(@Body() recordeCreateDto: RecordeCreateDto) {
    return this.recordeService.createRecorde(recordeCreateDto);
  }

  @Get('sala/:cod')
  @ApiOperation({
    summary: 'Busca lista de recordes da sala',
  })
  @ApiOkResponse({
    type: ListaRecordeResponse,
    description: 'Lista de recordes recuperado com sucesso',
  })
  @ApiResponse({
    status: 404,
    type: ErroRecorde,
    description: 'Erro ao encontrar os recordes da mesa',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'cod',
    description: 'Codigo da sala cadastrada',
    example: 'LELHiO',
  })
  findRecordSala(@Param('cod') cod: string) {
    return this.recordeService.findRecordSala(cod);
  }

  @Post('criarEstatiscas')
  @ApiOperation({
    summary: 'Cadastra a resposta',
    description: 'Cadastra a resposta de uma pergunta dentro de uma sala',
  })
  @ApiResponse({
    status: 201,
    type: EstatisticaResponse,
    description: 'Resposta a pergunta registrado comm sucesso.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario.',
  })
  createEstatisticas(
    @Body() estatisticaCreateDto: EstatisticaCompletoCreateDto,
  ) {
    return this.recordeService.createEstatistica(estatisticaCreateDto);
  }

  @Get('estatistica/:cod')
  @ApiOperation({
    summary: 'Busca todas respostas da mesa',
    description:
      'Busca por todas as respostas feitas por todos os usuarios na mesa',
  })
  @ApiOkResponse({
    type: ListaRecordeResponse,
    description:
      'Encontrou todas respostas de usuario na mesa especificada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    type: ErroEstatistica,
    description: 'Erro ao encontrar as respostas da mesa.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'cod',
    description: 'Codigo da sala cadastrada',
    example: 'LELHiO',
  })
  findSalaEstatisticas(@Param('cod') cod: string) {
    return this.recordeService.getSalaEstatistica(cod);
  }
}
