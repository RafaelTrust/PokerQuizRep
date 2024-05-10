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
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get('solitario/:cod')
  findPerguntasSalaPublica(@Param('cod') cod: string) {
    return this.salasService.findPerguntasSalaPublica(cod);
  }

  @Get('publicas')
  findSalasPublicas() {
    return this.salasService.findSalasPublicas();
  }

  @Post('cadastro')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salasService.create(createSalaDto);
  }

  @Get('responsavel/:id')
  @UseGuards(AuthGuard('jwt'))
  findSalasByPlayer(@Param('id') id: string) {
    return this.salasService.findByPlayer(id);
  }

  @Get(':cod')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('cod') cod: string) {
    return this.salasService.findOne(cod);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto) {
    return this.salasService.update(id, updateSalaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.salasService.remove(id);
  }
}
