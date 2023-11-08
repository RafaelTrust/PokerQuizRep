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

@Controller('perguntas')
@UseGuards(AuthGuard('jwt'))
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Post()
  create(@Body() createPerguntaDto: CreatePerguntaDto) {
    return this.perguntasService.create(createPerguntaDto);
  }

  @Get('sala/:id')
  findBySala(@Param('id') id: string) {
    return this.perguntasService.findBySala(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perguntasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerguntaDto: UpdatePerguntaDto,
  ) {
    return this.perguntasService.update(id, updatePerguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perguntasService.remove(id);
  }
}
