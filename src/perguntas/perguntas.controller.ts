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
import { PerguntasService } from './perguntas.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { AuthGuard } from '@nestjs/passport';
import { GerarIADto } from './dto/gerar-ia.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PerguntaResponse } from './response/pergunta-response';
import { ErroInterno } from 'src/biblioteca/Err/erro-interno';
import { ListaPerguntaResponse } from './response/lista-pergunta-response';
import { ErroListaPergunta } from './response/err/erro-lista-pergunta';
import { ErroPergunta } from './response/err/erro-pergunta';
import { DeleteGeneral } from 'src/biblioteca/Err/delete-general';
import { ErroUnauthorized } from 'src/biblioteca/Err/erro-unauthorized';

@ApiTags('Perguntas')
@Controller('perguntas')
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Post('ai-generate')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gerar pergunta IA',
    description:
      'Usuario pede para a IA auxilia-lo na criação de perguntas para quiz.',
  })
  @ApiResponse({
    status: 201,
    type: PerguntaResponse,
    description: 'Perguntas geradas com sucesso pela IA.',
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
  @ApiBody({
    type: GerarIADto,
    description:
      'Lembrar de todas as perguntas ja feitas para não se tornar repetitivo.',
  })
  chatCompletion(@Body() dto: GerarIADto) {
    return this.perguntasService.chatCompletion(dto);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cadastra a pergunta criada',
  })
  @ApiResponse({
    status: 201,
    type: PerguntaResponse,
    description: 'Pergunta cadastrada com sucesso',
  })
  @ApiResponse({
    status: 401,
    type: ErroUnauthorized,
    description: 'Token não autorizado.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  create(@Body() createPerguntaDto: CreatePerguntaDto) {
    return this.perguntasService.create(createPerguntaDto);
  }

  @Get('sala/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca as perguntas da sala',
    description: 'Busca por todas as perguntas de uma sala criada pelo usuario',
  })
  @ApiOkResponse({
    type: ListaPerguntaResponse,
    description:
      'Encontrou a lista de perguntas criada pelo usuario para uma sala.',
  })
  @ApiResponse({
    status: 404,
    type: ErroListaPergunta,
    description: 'Erro ao encontrar as perguntas pela mesa.',
  })
  @ApiResponse({
    status: 401,
    type: ErroUnauthorized,
    description: 'Token não autorizado.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da mesa criada pelo usuario',
    example: '6636d1eed0607d8c3cae7cbe',
  })
  findBySala(@Param('id') id: string) {
    return this.perguntasService.findBySala(id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca uma pergunta',
  })
  @ApiResponse({
    type: PerguntaResponse,
    description: 'Pergunta enncontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    type: ErroPergunta,
    description: 'Erro ao encontrar a pergunta',
  })
  @ApiResponse({
    status: 401,
    type: ErroUnauthorized,
    description: 'Token não autorizado.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da pergunta cadastrada.',
    example: '6636d1eed0607d8c3cae7cc6',
  })
  findOne(@Param('id') id: string) {
    return this.perguntasService.findOne(id);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualiza a pergunta',
  })
  @ApiOkResponse({
    type: PerguntaResponse,
    description: 'Pergunta atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    type: ErroPergunta,
    description: 'Erro ao encontrar a pergunta',
  })
  @ApiResponse({
    status: 401,
    type: ErroUnauthorized,
    description: 'Token não autorizado.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da pergunta cadastrada.',
    example: '6636d1eed0607d8c3cae7cc6',
  })
  update(
    @Param('id') id: string,
    @Body() updatePerguntaDto: UpdatePerguntaDto,
  ) {
    return this.perguntasService.update(id, updatePerguntaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta a pergunta',
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
    description: 'Id da pergunta cadastrada.',
    example: '6636d1eed0607d8c3cae7cc6',
  })
  remove(@Param('id') id: string) {
    return this.perguntasService.remove(id);
  }
}
