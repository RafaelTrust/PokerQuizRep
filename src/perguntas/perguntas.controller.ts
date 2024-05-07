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

@Controller('perguntas')
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Get('ai-generate/')
  @UseGuards(AuthGuard('jwt'))
  chatCompletion(@Body() dto: GerarIADto) {
    return this.perguntasService.chatCompletion(dto);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPerguntaDto: CreatePerguntaDto) {
    return this.perguntasService.create(createPerguntaDto);
  }

  @Get('sala/:id')
  @UseGuards(AuthGuard('jwt'))
  findBySala(@Param('id') id: string) {
    return this.perguntasService.findBySala(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perguntasService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updatePerguntaDto: UpdatePerguntaDto,
  ) {
    return this.perguntasService.update(id, updatePerguntaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.perguntasService.remove(id);
  }
}
