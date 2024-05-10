import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecordeService } from './recorde.service';
import { RecordeCreateDto } from './dto/recorde-create.dto';
import {
  EstatisticaCompletoCreateDto,
  EstatisticaCreateDto,
} from './dto/estatistica-create.dto';

@Controller('recorde')
export class RecordeController {
  constructor(private readonly recordeService: RecordeService) {}

  @Post('criar')
  createRecorde(@Body() recordeCreateDto: RecordeCreateDto) {
    return this.recordeService.createRecorde(recordeCreateDto);
  }

  @Get('sala/:cod')
  findRecordSala(@Param('cod') cod: string) {
    return this.recordeService.findRecordSala(cod);
  }

  @Post('criarEstatiscas')
  createEstatisticas(
    @Body() estatisticaCreateDto: EstatisticaCompletoCreateDto,
  ) {
    return this.recordeService.createEstatistica(estatisticaCreateDto);
  }

  @Get('estatistica/:cod')
  findSalaEstatisticas(@Param('cod') cod: string) {
    return this.recordeService.getSalaEstatistica(cod);
  }

  @Delete()
  deleteAll() {
    return this.recordeService.deleteAll();
  }

  @Delete('ranking')
  deleteAllRecordes() {
    return this.recordeService.deleteAllRecordes();
  }
}
